<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Middleware\HttpBasicAuth;

use Maispace\MaiBase\HttpBasicAuth\BasicAuthGuard;
use Maispace\MaiBase\HttpBasicAuth\PageProtectionResolver;
use Maispace\MaiBase\HttpBasicAuth\SiteProtectionResolver;
use Maispace\MaiBase\Middleware\HttpBasicAuth\PageBasicAuthMiddleware;
use Maispace\MaiBase\Middleware\HttpBasicAuth\SiteBasicAuthMiddleware;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Context\Context;
use TYPO3\CMS\Core\Context\UserAspect;
use TYPO3\CMS\Core\Http\Response;
use TYPO3\CMS\Core\Http\ResponseFactory;
use TYPO3\CMS\Core\Http\ServerRequest;
use TYPO3\CMS\Core\Http\StreamFactory;
use TYPO3\CMS\Core\Settings\Settings;
use TYPO3\CMS\Core\Site\Entity\Site;
use TYPO3\CMS\Core\Site\Entity\SiteSettings;
use TYPO3\CMS\Frontend\Page\PageInformation;

final class BasicAuthMiddlewareTest extends TestCase
{
    private Context $context;

    private RequestHandlerInterface $handler;

    public int $handled = 0;

    protected function setUp(): void
    {
        $this->context = new Context();
        $this->handled = 0;
        $test = $this;
        $this->handler = new class ($test) implements RequestHandlerInterface {
            public function __construct(private readonly BasicAuthMiddlewareTest $test) {}

            public function handle(ServerRequestInterface $request): ResponseInterface
            {
                $this->test->handled++;

                return (new Response())->withHeader('Cache-Control', 'public, max-age=60');
            }
        };
    }

    private function guard(): BasicAuthGuard
    {
        return new BasicAuthGuard(new ResponseFactory(), new StreamFactory(), $this->context);
    }

    /**
     * @param array<string, mixed> $settings
     */
    private function site(array $settings): Site
    {
        return new Site(
            'main',
            1,
            ['base' => 'https://example.test/', 'languages' => [['languageId' => 0, 'title' => 'English', 'locale' => 'en_US.UTF-8', 'base' => '/']]],
            SiteSettings::create(new Settings($settings)),
        );
    }

    private function request(Site $site, ?string $login = null): ServerRequestInterface
    {
        $request = (new ServerRequest('https://example.test/', 'GET'))
            ->withAttribute('site', $site)
            ->withAttribute('language', $site->getDefaultLanguage());

        return $login === null ? $request : $request->withHeader('Authorization', 'Basic ' . base64_encode($login));
    }

    private function siteMiddleware(): SiteBasicAuthMiddleware
    {
        return new SiteBasicAuthMiddleware($this->guard(), new SiteProtectionResolver());
    }

    private function pageMiddleware(): PageBasicAuthMiddleware
    {
        $siteResolver = new SiteProtectionResolver();

        return new PageBasicAuthMiddleware($this->guard(), new PageProtectionResolver($siteResolver), $siteResolver);
    }

    private function logInBackendUser(): void
    {
        $backendUser = $this->createMock(BackendUserAuthentication::class);
        $backendUser->user = ['uid' => 3];
        $this->context->setAspect('backend.user', new UserAspect($backendUser));
    }

    #[Test]
    public function openSitePassesUntouchedTest(): void
    {
        $response = $this->siteMiddleware()->process($this->request($this->site([])), $this->handler);

        self::assertSame(1, $this->handled);
        self::assertSame('public, max-age=60', $response->getHeaderLine('Cache-Control'));
    }

    #[Test]
    public function lockedSiteChallengesAndDoesNotRenderTest(): void
    {
        $site = $this->site(['basicAuth.enabled' => true, 'basicAuth.credentials' => ['agency:one']]);

        $response = $this->siteMiddleware()->process($this->request($site, 'agency:wrong'), $this->handler);

        self::assertSame(401, $response->getStatusCode());
        self::assertSame(0, $this->handled);
    }

    #[Test]
    public function lockedSiteWithLoginRendersPrivatelyTest(): void
    {
        $site = $this->site(['basicAuth.enabled' => true, 'basicAuth.credentials' => ['agency:one']]);

        $response = $this->siteMiddleware()->process($this->request($site, 'agency:one'), $this->handler);

        self::assertSame(200, $response->getStatusCode());
        self::assertSame('private, no-store', $response->getHeaderLine('Cache-Control'));
    }

    #[Test]
    public function backendUserSkipsTheSiteLockUnlessDisabledTest(): void
    {
        $this->logInBackendUser();

        $allowed = $this->site(['basicAuth.enabled' => true, 'basicAuth.credentials' => ['agency:one']]);
        self::assertSame(200, $this->siteMiddleware()->process($this->request($allowed), $this->handler)->getStatusCode());

        $strict = $this->site(['basicAuth.enabled' => true, 'basicAuth.credentials' => ['agency:one'], 'basicAuth.allowBackendUsers' => false]);
        self::assertSame(401, $this->siteMiddleware()->process($this->request($strict), $this->handler)->getStatusCode());
    }

    #[Test]
    public function requestWithoutSitePassesTest(): void
    {
        $this->siteMiddleware()->process(new ServerRequest('https://example.test/'), $this->handler);
        $this->pageMiddleware()->process(new ServerRequest('https://example.test/'), $this->handler);

        self::assertSame(2, $this->handled);
    }

    #[Test]
    public function protectedPageChallengesUntilLoginTest(): void
    {
        $site = $this->site(['basicAuth.credentials' => ['agency:one']]);
        $pageInformation = new PageInformation();
        $pageInformation->setId(20);
        $pageInformation->setRootLine([
            ['uid' => 20, 'pid' => 10],
            ['uid' => 10, 'pid' => 1, 'tx_maibase_basic_auth' => 2, 'tx_maibase_basic_auth_username' => 'guest', 'tx_maibase_basic_auth_password' => 'secret'],
            ['uid' => 1, 'pid' => 0],
        ]);
        $request = fn(?string $login) => $this->request($site, $login)->withAttribute('frontend.page.information', $pageInformation);

        self::assertSame(401, $this->pageMiddleware()->process($request(null), $this->handler)->getStatusCode());
        self::assertSame(200, $this->pageMiddleware()->process($request('guest:secret'), $this->handler)->getStatusCode());
        self::assertSame(200, $this->pageMiddleware()->process($request('agency:one'), $this->handler)->getStatusCode());
        self::assertSame(2, $this->handled);
    }
}
