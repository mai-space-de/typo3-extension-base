<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\ViewHelpers;

use Maispace\MaiBase\Captcha\CaptchaVerifier;
use Maispace\MaiBase\ViewHelpers\FieldViewHelper;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Log\NullLogger;
use TYPO3\CMS\Core\Http\RequestFactory;
use TYPO3\CMS\Core\Page\AssetCollector;

final class FieldViewHelperTest extends TestCase
{
    #[Test]
    public function rendersHiddenTokenFieldWithPublicEndpointOnlyTest(): void
    {
        $verifier = new CaptchaVerifier(
            $this->createMock(RequestFactory::class),
            new NullLogger(),
            'https://captcha.example.test/key',
            'must-never-appear-in-html',
            true,
        );
        $assetCollector = $this->createMock(AssetCollector::class);
        $assetCollector->expects(self::once())->method('addJavaScript')
            ->with('mai-captcha', self::stringContains('dist/cap.js'), self::arrayHasKey('type'));

        $html = (new class ($verifier, $assetCollector) extends FieldViewHelper {
            protected function publicWebPath(string $resource): string
            {
                return '/_assets/test/' . substr($resource, strlen('EXT:mai_base/Resources/Public/'));
            }
        })->render();

        self::assertStringContainsString('type="hidden"', $html);
        self::assertStringContainsString('name="mai_captcha_token"', $html);
        self::assertStringContainsString('data-endpoint="https://captcha.example.test/key/"', $html);
        self::assertStringContainsString('data-assets="/_assets/test/JavaScript/dist/cap/"', $html);
        self::assertStringNotContainsString('must-never-appear-in-html', $html);
    }

    #[Test]
    public function rendersNothingWithoutEndpointTest(): void
    {
        $verifier = new CaptchaVerifier($this->createMock(RequestFactory::class), new NullLogger(), null, 'secret', true);
        $assetCollector = $this->createMock(AssetCollector::class);
        $assetCollector->expects(self::never())->method('addJavaScript');

        self::assertSame('', (new FieldViewHelper($verifier, $assetCollector))->render());
    }
}
