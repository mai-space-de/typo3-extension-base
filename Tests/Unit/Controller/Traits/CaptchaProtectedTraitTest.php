<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Controller\Traits;

use Maispace\MaiBase\Captcha\CaptchaVerifier;
use Maispace\MaiBase\Controller\Traits\CaptchaProtectedTrait;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Http\ServerRequest;

final class CaptchaProtectedTraitTest extends TestCase
{
    private function controller(): object
    {
        return new class (new ServerRequest('https://example.test/', 'POST')) {
            use CaptchaProtectedTrait;

            public function __construct(protected ServerRequestInterface $request) {}

            public function check(): bool
            {
                return $this->isCaptchaValid();
            }
        };
    }

    #[Test]
    public function withoutInjectedVerifierTheCheckFailsTest(): void
    {
        self::assertFalse($this->controller()->check());
    }

    #[Test]
    public function verifierDecidesTest(): void
    {
        foreach ([true, false] as $result) {
            $verifier = $this->createMock(CaptchaVerifier::class);
            $verifier->expects(self::once())->method('verifyRequest')->willReturn($result);
            $controller = $this->controller();
            $controller->injectCaptchaVerifier($verifier);

            self::assertSame($result, $controller->check());
        }
    }
}
