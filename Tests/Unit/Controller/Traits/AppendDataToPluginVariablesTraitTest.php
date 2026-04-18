<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Controller\Traits;

use Maispace\MaiBase\Controller\Traits\AppendDataToPluginVariablesTrait;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3Fluid\Fluid\View\ViewInterface;

final class AppendDataToPluginVariablesTraitTest extends TestCase
{
    #[Test]
    public function initializeActionAssignsContentObjectDataToView(): void
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

        $subject = $this->createTraitUser($request, $view);
        $subject->callInitializeAction();
    }

    #[Test]
    public function initializeActionAssignsEmptyArrayWhenContentObjectIsAbsent(): void
    {
        $request = $this->createMock(ServerRequestInterface::class);
        $request->method('getAttribute')->with('currentContentObject')->willReturn(null);

        $view = $this->createMock(ViewInterface::class);
        $view->expects(self::once())
            ->method('assign')
            ->with('data', []);

        $subject = $this->createTraitUser($request, $view);
        $subject->callInitializeAction();
    }

    private function createTraitUser(ServerRequestInterface $request, ViewInterface $view): object
    {
        return new class ($request, $view) {
            use AppendDataToPluginVariablesTrait {
                initializeAction as public callInitializeAction;
            }

            protected ServerRequestInterface $request;
            protected ViewInterface $view;

            public function __construct(ServerRequestInterface $request, ViewInterface $view)
            {
                $this->request = $request;
                $this->view = $view;
            }
        };
    }
}
