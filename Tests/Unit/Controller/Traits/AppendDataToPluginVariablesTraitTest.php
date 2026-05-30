<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Controller\Traits;

use Maispace\MaiBase\Controller\Traits\AppendDataToPluginVariablesTrait;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\View\ViewInterface;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;

final class AppendDataToPluginVariablesTraitTest extends TestCase
{
    #[Test]
    public function initializeViewAssignsContentObjectDataToView(): void
    {
        $expectedData = ['uid' => 7, 'pid' => 3, 'CType' => 'list'];

        $contentObject = $this->createMock(ContentObjectRenderer::class);
        $contentObject->data = $expectedData;

        $request = $this->createMock(ServerRequestInterface::class);
        $request->method('getAttribute')->with('currentContentObject')->willReturn($contentObject);

        $view = $this->createMock(ViewInterface::class);
        $view->expects(self::once())
            ->method('assign')
            ->with('data', $expectedData);

        $subject = $this->createTraitUser($request);
        $subject->callInitializeView($view);
    }

    #[Test]
    public function initializeViewAssignsEmptyArrayWhenContentObjectIsAbsent(): void
    {
        $request = $this->createMock(ServerRequestInterface::class);
        $request->method('getAttribute')->with('currentContentObject')->willReturn(null);

        $view = $this->createMock(ViewInterface::class);
        $view->expects(self::once())
            ->method('assign')
            ->with('data', []);

        $subject = $this->createTraitUser($request);
        $subject->callInitializeView($view);
    }

    private function createTraitUser(ServerRequestInterface $request): object
    {
        return new class ($request) {
            use AppendDataToPluginVariablesTrait {
                initializeView as public callInitializeView;
            }

            protected ServerRequestInterface $request;

            public function __construct(ServerRequestInterface $request)
            {
                $this->request = $request;
            }
        };
    }
}
