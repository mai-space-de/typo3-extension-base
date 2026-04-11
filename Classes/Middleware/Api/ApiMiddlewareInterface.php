<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Middleware\Api;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;

interface ApiMiddlewareInterface extends MiddlewareInterface
{
    /**
     * Decides whether this middleware should handle the given request.
     * Return false to pass the request to the next handler untouched.
     */
    public function shouldHandle(ServerRequestInterface $request): bool;

    /**
     * Handles the API request and returns a JSON response.
     * Only called when shouldHandle() returns true.
     */
    public function handle(ServerRequestInterface $request): ResponseInterface;
}
