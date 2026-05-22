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
use TYPO3\CMS\Core\View\ViewInterface;

/**
 * ModuleTemplate and ModuleTemplateFactory are both final in TYPO3 14.x and
 * therefore cannot be doubled with PHPUnit's standard mock builder.
 *
 * Strategy used here:
 * - ModuleTemplateFactory: created via ReflectionClass::newInstanceWithoutConstructor()
 *   whenever it must be passed to the controller constructor but is never called.
 * - ModuleTemplate: also created via newInstanceWithoutConstructor(); its internal
 *   $view (ViewInterface) and $docHeaderComponent properties are injected through
 *   ReflectionProperty so the production methods under test have a working surface
 *   to delegate to.
 */
final class AbstractBackendControllerTest extends TestCase
{
    #[Test]
    public function assignMultipleAssignsAllVariablesToModuleTemplate(): void
    {
        $view = $this->createMock(ViewInterface::class);
        $view->expects(self::exactly(2))
            ->method('assign')
            ->willReturnCallback(static function (string $key, mixed $value) use (&$assigned): ViewInterface {
                $assigned[$key] = $value;
                return new class implements ViewInterface {
                    public function assign(string $key, mixed $value): static
                    {
                        return $this;
                    }
                    public function assignMultiple(array $values): static
                    {
                        return $this;
                    }
                    public function render(string $templateFileName = ''): string
                    {
                        return '';
                    }
                };
            });

        $moduleTemplate = $this->makeModuleTemplate(view: $view);
        $controller = $this->createConcreteController();
        $controller->callAssignMultiple($moduleTemplate, ['foo' => 'bar', 'baz' => 42]);

        self::assertSame(['foo' => 'bar', 'baz' => 42], $assigned ?? []);
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

        $moduleTemplate = $this->makeModuleTemplate(docHeaderComponent: $docHeader);

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
            $controller->getFlashMessages(),
        );
    }

    #[Test]
    public function flashErrorCallsAddFlashMessageWithErrorSeverity(): void
    {
        $controller = $this->createConcreteController();
        $controller->callFlashError('Something failed.', 'Error');

        self::assertSame(
            [['Something failed.', 'Error', ContextualFeedbackSeverity::ERROR]],
            $controller->getFlashMessages(),
        );
    }

    #[Test]
    public function flashInfoCallsAddFlashMessageWithInfoSeverity(): void
    {
        $controller = $this->createConcreteController();
        $controller->callFlashInfo('FYI.', 'Info');

        self::assertSame(
            [['FYI.', 'Info', ContextualFeedbackSeverity::INFO]],
            $controller->getFlashMessages(),
        );
    }

    /**
     * Creates a ModuleTemplate without calling its constructor.
     *
     * The $view and $docHeaderComponent properties are injected via reflection
     * so the methods under test (assign, getDocHeaderComponent) work correctly.
     */
    private function makeModuleTemplate(
        ?ViewInterface $view = null,
        ?DocHeaderComponent $docHeaderComponent = null,
    ): ModuleTemplate {
        /** @var ModuleTemplate $moduleTemplate */
        $moduleTemplate = (new \ReflectionClass(ModuleTemplate::class))
            ->newInstanceWithoutConstructor();

        if ($view !== null) {
            $viewProp = new \ReflectionProperty(ModuleTemplate::class, 'view');
            $viewProp->setAccessible(true);
            $viewProp->setValue($moduleTemplate, $view);
        }

        if ($docHeaderComponent !== null) {
            $docProp = new \ReflectionProperty(ModuleTemplate::class, 'docHeaderComponent');
            $docProp->setAccessible(true);
            $docProp->setValue($moduleTemplate, $docHeaderComponent);
        }

        return $moduleTemplate;
    }

    private function createConcreteController(?IconFactory $iconFactory = null): object
    {
        // ModuleTemplateFactory is final readonly — bypass its constructor so we can
        // satisfy the parent constructor's type constraint without mocking a final class.
        /** @var ModuleTemplateFactory $moduleTemplateFactory */
        $moduleTemplateFactory = (new \ReflectionClass(ModuleTemplateFactory::class))
            ->newInstanceWithoutConstructor();

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
