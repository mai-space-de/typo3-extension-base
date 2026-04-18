<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Controller\Backend;

use Maispace\MaiBase\Controller\Backend\AbstractBackendController;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Backend\Template\Components\Buttons\LinkButton;
use TYPO3\CMS\Backend\Template\Components\ButtonBar;
use TYPO3\CMS\Backend\Template\Components\DocHeaderComponent;
use TYPO3\CMS\Backend\Template\ModuleTemplate;
use TYPO3\CMS\Backend\Template\ModuleTemplateFactory;
use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Imaging\IconSize;
use TYPO3\CMS\Core\Type\ContextualFeedbackSeverity;

final class AbstractBackendControllerTest extends TestCase
{
    #[Test]
    public function assignMultipleAssignsAllVariablesToModuleTemplate(): void
    {
        $moduleTemplate = $this->createMock(ModuleTemplate::class);

        $matcher = self::exactly(2);
        $moduleTemplate->expects($matcher)
            ->method('assign')
            ->willReturnCallback(function (string $key, mixed $value) use ($matcher) {
                match ($matcher->numberOfInvocations()) {
                    1 => self::assertSame('foo', $key) ?: self::assertSame('bar', $value),
                    2 => self::assertSame('baz', $key) ?: self::assertSame(42, $value),
                };
            });

        $controller = $this->createConcreteController();
        $controller->callAssignMultiple($moduleTemplate, ['foo' => 'bar', 'baz' => 42]);
    }

    #[Test]
    public function addButtonToDocHeaderAddsLinkButton(): void
    {
        $linkButton = $this->createMock(LinkButton::class);
        $linkButton->method('setHref')->willReturnSelf();
        $linkButton->method('setTitle')->willReturnSelf();
        $linkButton->method('setIcon')->willReturnSelf();

        $buttonBar = $this->createMock(ButtonBar::class);
        $buttonBar->method('makeLinkButton')->willReturn($linkButton);
        $buttonBar->expects(self::once())
            ->method('addButton')
            ->with($linkButton, ButtonBar::BUTTON_POSITION_LEFT, 1);

        $docHeader = $this->createMock(DocHeaderComponent::class);
        $docHeader->method('getButtonBar')->willReturn($buttonBar);

        $moduleTemplate = $this->createMock(ModuleTemplate::class);
        $moduleTemplate->method('getDocHeaderComponent')->willReturn($docHeader);

        $icon = $this->createMock(Icon::class);
        $iconFactory = $this->createMock(IconFactory::class);
        $iconFactory->method('getIcon')->with('actions-add', IconSize::SMALL)->willReturn($icon);

        $controller = $this->createConcreteController($iconFactory);
        $controller->callAddButtonToDocHeader($moduleTemplate, '/some/url', 'actions-add', 'Create');
    }

    #[Test]
    public function flashSuccessCallsAddFlashMessageWithOkSeverity(): void
    {
        $controller = $this->createConcreteController();
        $controller->callFlashSuccess('Everything worked.', 'Success');

        self::assertSame(
            [['Everything worked.', 'Success', ContextualFeedbackSeverity::OK]],
            $controller->getFlashMessages()
        );
    }

    #[Test]
    public function flashErrorCallsAddFlashMessageWithErrorSeverity(): void
    {
        $controller = $this->createConcreteController();
        $controller->callFlashError('Something failed.', 'Error');

        self::assertSame(
            [['Something failed.', 'Error', ContextualFeedbackSeverity::ERROR]],
            $controller->getFlashMessages()
        );
    }

    #[Test]
    public function flashInfoCallsAddFlashMessageWithInfoSeverity(): void
    {
        $controller = $this->createConcreteController();
        $controller->callFlashInfo('FYI.', 'Info');

        self::assertSame(
            [['FYI.', 'Info', ContextualFeedbackSeverity::INFO]],
            $controller->getFlashMessages()
        );
    }

    private function createConcreteController(?IconFactory $iconFactory = null): object
    {
        $moduleTemplateFactory = $this->createMock(ModuleTemplateFactory::class);
        $iconFactory ??= $this->createMock(IconFactory::class);

        return new class ($moduleTemplateFactory, $iconFactory) extends AbstractBackendController {
            private array $capturedFlashMessages = [];

            public function indexAction(): ResponseInterface
            {
                return $this->htmlResponse('');
            }

            public function addFlashMessage(
                string $messageBody,
                string $messageTitle = '',
                ContextualFeedbackSeverity $severity = ContextualFeedbackSeverity::OK,
                bool $storeInSession = true,
            ): void {
                $this->capturedFlashMessages[] = [$messageBody, $messageTitle, $severity];
            }

            public function getFlashMessages(): array
            {
                return $this->capturedFlashMessages;
            }

            public function callAssignMultiple(ModuleTemplate $moduleTemplate, array $variables): void
            {
                $this->assignMultiple($moduleTemplate, $variables);
            }

            public function callAddButtonToDocHeader(
                ModuleTemplate $moduleTemplate,
                string $href,
                string $iconIdentifier,
                string $title,
            ): void {
                $this->addButtonToDocHeader($moduleTemplate, $href, $iconIdentifier, $title);
            }

            public function callFlashSuccess(string $message, string $title = ''): void
            {
                $this->flashSuccess($message, $title);
            }

            public function callFlashError(string $message, string $title = ''): void
            {
                $this->flashError($message, $title);
            }

            public function callFlashInfo(string $message, string $title = ''): void
            {
                $this->flashInfo($message, $title);
            }
        };
    }
}
