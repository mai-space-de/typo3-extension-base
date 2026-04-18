<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Controller;

use Maispace\MaiBase\Controller\AbstractActionController;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;

final class AbstractActionControllerTest extends TestCase
{
    #[Test]
    public function getContentObjectDataReturnsEmptyArrayWhenAttributeIsAbsent(): void
    {
        $request = $this->createMock(ServerRequestInterface::class);
        $request->method('getAttribute')->with('currentContentObject')->willReturn(null);

        $controller = $this->createConcreteController();
        $this->injectRequest($controller, $request);

        self::assertSame([], $controller->callGetContentObjectData());
    }

    #[Test]
    public function getContentObjectDataReturnsDataWhenAttributeIsPresent(): void
    {
        $expectedData = ['uid' => 42, 'pid' => 1, 'CType' => 'text'];

        $contentObject = $this->createMock(ContentObjectRenderer::class);
        $contentObject->data = $expectedData;

        $request = $this->createMock(ServerRequestInterface::class);
        $request->method('getAttribute')->with('currentContentObject')->willReturn($contentObject);

        $controller = $this->createConcreteController();
        $this->injectRequest($controller, $request);

        self::assertSame($expectedData, $controller->callGetContentObjectData());
    }

    #[Test]
    public function getSettingsReturnsSettingsArray(): void
    {
        $settings = ['display' => 'list', 'limit' => '10'];

        $controller = $this->createConcreteController();
        $reflection = new \ReflectionProperty($controller, 'settings');
        $reflection->setValue($controller, $settings);

        self::assertSame($settings, $controller->callGetSettings());
    }

    private function createConcreteController(): object
    {
        return new class () extends AbstractActionController {
            public function callGetContentObjectData(): array
            {
                return $this->getContentObjectData();
            }

            public function callGetSettings(): array
            {
                return $this->getSettings();
            }
        };
    }

    private function injectRequest(object $controller, ServerRequestInterface $request): void
    {
        $reflection = new \ReflectionProperty($controller, 'request');
        $reflection->setValue($controller, $request);
    }
}
