<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Middleware\HttpBasicAuth;

use Maispace\MaiBase\HttpBasicAuth\BasicAuthGuard;
use Maispace\MaiBase\HttpBasicAuth\SiteProtectionResolver;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use TYPO3\CMS\Core\Site\Entity\Site;
use TYPO3\CMS\Core\Site\Entity\SiteLanguage;

/**
 * Locks a whole site or a single site language behind HTTP Basic Auth.
 *
 * Runs right after the site and backend user are known and before any routing,
 * so 404 pages, redirects and `/api/…` middlewares are covered as well.
 */
final readonly class SiteBasicAuthMiddleware implements MiddlewareInterface
{
    public function __construct(
        private BasicAuthGuard $guard,
        private SiteProtectionResolver $resolver,
    ) {}

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $site = $request->getAttribute('site');
        if (!$site instanceof Site) {
            return $handler->handle($request);
        }
        $language = $request->getAttribute('language');
        $protection = $this->resolver->resolve($site, $language instanceof SiteLanguage ? $language : null);
        if ($protection === null) {
            return $handler->handle($request);
        }
        if ($this->resolver->allowsBackendUsers($site) && $this->guard->isBackendUserLoggedIn()) {
            return $this->guard->markPrivate($handler->handle($request));
        }

        return $this->guard->check($request, $protection)
            ?? $this->guard->markPrivate($handler->handle($request));
    }
}
