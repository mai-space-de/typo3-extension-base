<?php

declare(strict_types=1);

namespace Maispace\MaiBase\HttpBasicAuth;

use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\StreamFactoryInterface;
use TYPO3\CMS\Core\Context\Context;

/**
 * The one HTTP Basic Auth lock shared by the site, language and page protections.
 *
 * Callers resolve a {@see Protection} for the request and ask the guard whether the
 * request may pass: null means "go on", otherwise the 401 challenge to return.
 */
class BasicAuthGuard
{
    public function __construct(
        private readonly ResponseFactoryInterface $responseFactory,
        private readonly StreamFactoryInterface $streamFactory,
        private readonly Context $context,
    ) {}

    public function check(ServerRequestInterface $request, Protection $protection): ?ResponseInterface
    {
        $given = $this->extractCredentials($request);
        if ($given !== null && $protection->accepts($given[0], $given[1])) {
            return null;
        }

        return $this->challenge($protection->realm);
    }

    public function challenge(string $realm): ResponseInterface
    {
        $realm = str_replace(['\\', '"'], ['\\\\', '\\"'], $realm !== '' ? $realm : Protection::DEFAULT_REALM);

        return $this->responseFactory->createResponse(401)
            ->withHeader('WWW-Authenticate', 'Basic realm="' . $realm . '", charset="UTF-8"')
            ->withHeader('Cache-Control', 'no-store, private')
            ->withHeader('Content-Type', 'text/plain; charset=utf-8')
            ->withBody($this->streamFactory->createStream('401 Unauthorized'));
    }

    /**
     * Marks a response that was only delivered after a successful login as private, so
     * shared caches (reverse proxies, CDNs) never hand it to someone without the password.
     */
    public function markPrivate(ResponseInterface $response): ResponseInterface
    {
        return $response->withHeader('Cache-Control', 'private, no-store');
    }

    /**
     * Logged-in backend users (editors previewing the site) may skip the lock.
     */
    public function isBackendUserLoggedIn(): bool
    {
        return $this->context->getPropertyFromAspect('backend.user', 'isLoggedIn', false) === true;
    }

    /**
     * @return array{0: string, 1: string}|null
     */
    public function extractCredentials(ServerRequestInterface $request): ?array
    {
        $server = $request->getServerParams();
        $header = $request->getHeaderLine('Authorization');
        if ($header === '') {
            // Apache with CGI/FPM drops the header unless it is rewritten into the environment.
            foreach (['HTTP_AUTHORIZATION', 'REDIRECT_HTTP_AUTHORIZATION'] as $key) {
                if (is_string($server[$key] ?? null) && $server[$key] !== '') {
                    $header = $server[$key];
                    break;
                }
            }
        }

        if ($header !== '' && preg_match('/^Basic\s+(\S+)$/i', trim($header), $matches) === 1) {
            $decoded = base64_decode($matches[1], true);
            if ($decoded === false || !str_contains($decoded, ':')) {
                return null;
            }
            [$username, $password] = explode(':', $decoded, 2);

            return [$username, $password];
        }

        // mod_php parses the header itself and only exposes the result.
        if (is_string($server['PHP_AUTH_USER'] ?? null)) {
            return [$server['PHP_AUTH_USER'], is_string($server['PHP_AUTH_PW'] ?? null) ? $server['PHP_AUTH_PW'] : ''];
        }

        return null;
    }
}
