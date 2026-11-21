<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\HttpBasicAuth;

use Maispace\MaiBase\HttpBasicAuth\BasicAuthGuard;
use Maispace\MaiBase\HttpBasicAuth\Credential;
use Maispace\MaiBase\HttpBasicAuth\Protection;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Context\Context;
use TYPO3\CMS\Core\Context\UserAspect;
use TYPO3\CMS\Core\Http\Response;
use TYPO3\CMS\Core\Http\ResponseFactory;
use TYPO3\CMS\Core\Http\ServerRequest;
use TYPO3\CMS\Core\Http\StreamFactory;

final class BasicAuthGuardTest extends TestCase
{
    private Context $context;

    protected function setUp(): void
    {
        $this->context = new Context();
    }

    private function guard(): BasicAuthGuard
    {
        return new BasicAuthGuard(new ResponseFactory(), new StreamFactory(), $this->context);
    }

    private function protection(string $realm = 'Staging'): Protection
    {
        return new Protection($realm, [new Credential('agency', 'one'), new Credential('customer', 'two')]);
    }

    /**
     * @param array<string, mixed> $serverParams
     */
    private function request(?string $authorization = null, array $serverParams = []): ServerRequest
    {
        $request = new ServerRequest('https://example.test/', 'GET', 'php://input', [], $serverParams);

        return $authorization === null ? $request : $request->withHeader('Authorization', $authorization);
    }

    #[Test]
    public function requestWithoutCredentialsGetsChallengeTest(): void
    {
        $response = $this->guard()->check($this->request(), $this->protection());

        self::assertNotNull($response);
        self::assertSame(401, $response->getStatusCode());
        self::assertSame('Basic realm="Staging", charset="UTF-8"', $response->getHeaderLine('WWW-Authenticate'));
        self::assertStringContainsString('no-store', $response->getHeaderLine('Cache-Control'));
    }

    #[Test]
    public function validCredentialsPassTest(): void
    {
        $guard = $this->guard();

        self::assertNull($guard->check($this->request('Basic ' . base64_encode('agency:one')), $this->protection()));
        self::assertNull($guard->check($this->request('basic ' . base64_encode('customer:two')), $this->protection()));
    }

    #[Test]
    public function wrongCredentialsGetChallengeTest(): void
    {
        $response = $this->guard()->check($this->request('Basic ' . base64_encode('agency:two')), $this->protection());

        self::assertSame(401, $response?->getStatusCode());
    }

    #[Test]
    public function malformedHeaderGetsChallengeTest(): void
    {
        $guard = $this->guard();

        self::assertNotNull($guard->check($this->request('Basic !!!'), $this->protection()));
        self::assertNotNull($guard->check($this->request('Basic ' . base64_encode('nocolon')), $this->protection()));
        self::assertNotNull($guard->check($this->request('Bearer ' . base64_encode('agency:one')), $this->protection()));
    }

    #[Test]
    public function credentialsFromCgiEnvironmentAreReadTest(): void
    {
        $guard = $this->guard();
        $header = 'Basic ' . base64_encode('agency:one');

        self::assertNull($guard->check($this->request(null, ['REDIRECT_HTTP_AUTHORIZATION' => $header]), $this->protection()));
        self::assertNull($guard->check($this->request(null, ['HTTP_AUTHORIZATION' => $header]), $this->protection()));
    }

    #[Test]
    public function credentialsParsedByModPhpAreReadTest(): void
    {
        $request = $this->request(null, ['PHP_AUTH_USER' => 'customer', 'PHP_AUTH_PW' => 'two']);

        self::assertNull($this->guard()->check($request, $this->protection()));
    }

    #[Test]
    public function realmIsQuotedAndDefaultedTest(): void
    {
        $guard = $this->guard();

        self::assertSame('Basic realm="Say \"hi\"", charset="UTF-8"', $guard->challenge('Say "hi"')->getHeaderLine('WWW-Authenticate'));
        self::assertSame('Basic realm="' . Protection::DEFAULT_REALM . '", charset="UTF-8"', $guard->challenge('')->getHeaderLine('WWW-Authenticate'));
    }

    #[Test]
    public function markPrivateSetsCacheControlTest(): void
    {
        $response = $this->guard()->markPrivate((new Response())->withHeader('Cache-Control', 'public, max-age=3600'));

        self::assertSame('private, no-store', $response->getHeaderLine('Cache-Control'));
    }

    #[Test]
    public function detectsLoggedInBackendUserTest(): void
    {
        self::assertFalse($this->guard()->isBackendUserLoggedIn());

        $this->context->setAspect('backend.user', new UserAspect(null));
        self::assertFalse($this->guard()->isBackendUserLoggedIn());

        $backendUser = $this->createMock(BackendUserAuthentication::class);
        $backendUser->user = ['uid' => 1, 'username' => 'editor'];
        $this->context->setAspect('backend.user', new UserAspect($backendUser));
        self::assertTrue($this->guard()->isBackendUserLoggedIn());
    }
}
