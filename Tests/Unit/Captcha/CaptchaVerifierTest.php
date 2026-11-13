<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Captcha;

use Maispace\MaiBase\Captcha\CaptchaVerifier;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use TYPO3\CMS\Core\Http\RequestFactory;
use TYPO3\CMS\Core\Http\Response;
use TYPO3\CMS\Core\Http\ServerRequest;

final class CaptchaVerifierTest extends TestCase
{
    private RequestFactory&MockObject $requestFactory;

    private LoggerInterface&MockObject $logger;

    protected function setUp(): void
    {
        $this->requestFactory = $this->createMock(RequestFactory::class);
        $this->logger = $this->createMock(LoggerInterface::class);
    }

    private function verifier(?string $secret = 'secret', bool $enforced = true, ?string $endpoint = 'https://captcha.example.test/key'): CaptchaVerifier
    {
        return new CaptchaVerifier(
            $this->requestFactory,
            $this->logger,
            $endpoint,
            $secret,
            $enforced,
        );
    }

    private function respondWith(string $json): Response
    {
        $response = new Response();
        $response->getBody()->write($json);
        $response->getBody()->rewind();

        return $response;
    }

    #[Test]
    public function endpointAlwaysEndsWithSlashTest(): void
    {
        self::assertSame('https://captcha.example.test/key/', $this->verifier()->getEndpoint());
    }

    #[Test]
    public function validTokenIsAcceptedAndSentToSiteverifyTest(): void
    {
        $this->requestFactory->expects(self::once())
            ->method('request')
            ->with(
                'https://captcha.example.test/key/siteverify',
                'POST',
                self::callback(static fn (array $options): bool => $options['json'] === ['secret' => 'secret', 'response' => 'tok']),
            )
            ->willReturn($this->respondWith('{"success":true}'));

        self::assertTrue($this->verifier()->verifyToken('tok'));
    }

    #[Test]
    public function rejectedTokenFailsTest(): void
    {
        $this->requestFactory->method('request')->willReturn($this->respondWith('{"success":false}'));

        self::assertFalse($this->verifier()->verifyToken('tok'));
    }

    #[Test]
    public function emptyTokenFailsWithoutRequestTest(): void
    {
        $this->requestFactory->expects(self::never())->method('request');

        self::assertFalse($this->verifier()->verifyToken(''));
    }

    #[Test]
    public function transportErrorFailsClosedAndIsLoggedTest(): void
    {
        $this->requestFactory->method('request')->willThrowException(new \RuntimeException('down'));
        $this->logger->expects(self::once())->method('error');

        self::assertFalse($this->verifier()->verifyToken('tok'));
    }

    #[Test]
    public function malformedResponseFailsTest(): void
    {
        $this->requestFactory->method('request')->willReturn($this->respondWith('<html>'));

        self::assertFalse($this->verifier()->verifyToken('tok'));
    }

    #[Test]
    public function missingSecretRejectsWhenEnforcedTest(): void
    {
        $this->logger->expects(self::once())->method('error');
        $this->requestFactory->expects(self::never())->method('request');

        self::assertFalse($this->verifier(null, true)->verifyToken('tok'));
    }

    #[Test]
    public function missingEndpointRejectsWhenEnforcedTest(): void
    {
        $this->logger->expects(self::once())->method('error');
        $this->requestFactory->expects(self::never())->method('request');

        self::assertNull($this->verifier('secret', true, null)->getEndpoint());
        self::assertFalse($this->verifier('secret', true, null)->verifyToken('tok'));
    }

    #[Test]
    public function missingEndpointIsSkippedOutsideProductionTest(): void
    {
        $this->requestFactory->expects(self::never())->method('request');

        self::assertTrue($this->verifier('secret', false, null)->verifyToken(''));
    }

    #[Test]
    public function missingSecretIsSkippedOutsideProductionTest(): void
    {
        $this->requestFactory->expects(self::never())->method('request');

        self::assertTrue($this->verifier(null, false)->verifyToken(''));
    }

    #[Test]
    public function verifyRequestReadsTokenFromParsedBodyTest(): void
    {
        $this->requestFactory->method('request')->willReturn($this->respondWith('{"success":true}'));
        $request = (new ServerRequest('https://example.test/', 'POST'))
            ->withParsedBody([CaptchaVerifier::FIELD_NAME => 'tok']);

        self::assertTrue($this->verifier()->verifyRequest($request));
    }

    #[Test]
    public function verifyRequestWithoutFieldFailsTest(): void
    {
        $request = (new ServerRequest('https://example.test/', 'POST'))->withParsedBody(['other' => 'x']);

        self::assertFalse($this->verifier()->verifyRequest($request));
    }
}
