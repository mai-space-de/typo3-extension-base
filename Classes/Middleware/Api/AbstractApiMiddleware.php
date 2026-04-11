<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Middleware\Api;

use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\StreamFactoryInterface;
use Psr\Http\Server\RequestHandlerInterface;

abstract class AbstractApiMiddleware implements ApiMiddlewareInterface
{
    public function __construct(
        protected readonly ResponseFactoryInterface $responseFactory,
        protected readonly StreamFactoryInterface $streamFactory,
    ) {
    }

    /**
     * Intercepts the request when shouldHandle() returns true,
     * delegates to handle(), and wraps any thrown exception into a
     * 500 JSON error response so the middleware stack never breaks.
     */
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        if (!$this->shouldHandle($request)) {
            return $handler->handle($request);
        }

        try {
            return $this->handle($request);
        } catch (\JsonException $e) {
            return $this->errorResponse('Invalid JSON payload.', 400);
        } catch (\Throwable $e) {
            return $this->errorResponse('Internal server error.', 500);
        }
    }

    // -------------------------------------------------------------------------
    // Request helpers
    // -------------------------------------------------------------------------

    /**
     * Returns true when the request carries a JSON body
     * (Content-Type: application/json).
     */
    protected function isJsonRequest(ServerRequestInterface $request): bool
    {
        $contentType = $request->getHeaderLine('Content-Type');

        return str_contains($contentType, 'application/json');
    }

    /**
     * Returns true when the HTTP method matches (case-insensitive).
     */
    protected function isMethod(ServerRequestInterface $request, string $method): bool
    {
        return strtoupper($request->getMethod()) === strtoupper($method);
    }

    /**
     * Decodes the JSON request body into an associative array.
     *
     * @return array<string, mixed>
     * @throws \JsonException when the body is not valid JSON
     */
    protected function decodeJsonBody(ServerRequestInterface $request): array
    {
        $body = (string) $request->getBody();

        if ('' === $body) {
            return [];
        }

        return json_decode($body, true, 512, JSON_THROW_ON_ERROR);
    }

    // -------------------------------------------------------------------------
    // Response helpers
    // -------------------------------------------------------------------------

    /**
     * Builds a JSON response with the given data and HTTP status code.
     *
     * @param array<string, mixed> $data
     */
    protected function jsonResponse(array $data, int $status = 200): ResponseInterface
    {
        $json = json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        return $this->responseFactory
            ->createResponse($status)
            ->withHeader('Content-Type', 'application/json; charset=utf-8')
            ->withBody($this->streamFactory->createStream($json));
    }

    /**
     * Builds a standardised JSON error response.
     *
     * Response shape: { "error": { "message": "...", "code": <status> } }
     */
    protected function errorResponse(string $message, int $status = 400): ResponseInterface
    {
        return $this->jsonResponse(
            ['error' => ['message' => $message, 'code' => $status]],
            $status
        );
    }
}
