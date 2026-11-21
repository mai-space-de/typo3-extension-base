<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Middleware\HttpBasicAuth;

use Maispace\MaiBase\HttpBasicAuth\BasicAuthGuard;
use Maispace\MaiBase\HttpBasicAuth\PageProtectionResolver;
use Maispace\MaiBase\HttpBasicAuth\SiteProtectionResolver;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use TYPO3\CMS\Core\Site\Entity\Site;
use TYPO3\CMS\Frontend\Page\PageInformation;

/**
 * Locks single pages (and optionally their subpages) behind HTTP Basic Auth,
 * configured in the page properties. Runs once the page and its rootline are resolved.
 */
final readonly class PageBasicAuthMiddleware implements MiddlewareInterface
{
    public function __construct(
        private BasicAuthGuard $guard,
        private PageProtectionResolver $resolver,
        private SiteProtectionResolver $siteResolver,
    ) {}

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $pageInformation = $request->getAttribute('frontend.page.information');
        if (!$pageInformation instanceof PageInformation) {
            return $handler->handle($request);
        }
        $site = $request->getAttribute('site');
        $site = $site instanceof Site ? $site : null;

        $protection = $this->resolver->resolve($pageInformation->getId(), $pageInformation->getRootLine(), $site);
        if ($protection === null) {
            return $handler->handle($request);
        }
        $allowBackendUsers = $site === null || $this->siteResolver->allowsBackendUsers($site);
        if ($allowBackendUsers && $this->guard->isBackendUserLoggedIn()) {
            return $this->guard->markPrivate($handler->handle($request));
        }

        return $this->guard->check($request, $protection)
            ?? $this->guard->markPrivate($handler->handle($request));
    }
}
