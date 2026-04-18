<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Backend;

use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Backend\Attribute\AsController;
use TYPO3\CMS\Backend\Template\Components\ButtonBar;
use TYPO3\CMS\Backend\Template\ModuleTemplate;
use TYPO3\CMS\Backend\Template\ModuleTemplateFactory;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Imaging\IconSize;
use TYPO3\CMS\Core\Type\ContextualFeedbackSeverity;
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;

#[AsController]
abstract class AbstractBackendController extends ActionController implements BackendControllerInterface
{
    public function __construct(
        protected readonly ModuleTemplateFactory $moduleTemplateFactory,
        protected readonly IconFactory $iconFactory,
    ) {
    }

    protected function createModuleTemplate(): ModuleTemplate
    {
        return $this->moduleTemplateFactory->create($this->request);
    }

    protected function addShortcutButton(
        ModuleTemplate $moduleTemplate,
        string $routeIdentifier,
        string $displayName,
        array $arguments = [],
    ): void {
        $buttonBar = $moduleTemplate->getDocHeaderComponent()->getButtonBar();
        $shortcutButton = $buttonBar->makeShortcutButton()
            ->setDisplayName($displayName)
            ->setRouteIdentifier($routeIdentifier)
            ->setArguments($arguments);

        $buttonBar->addButton($shortcutButton, ButtonBar::BUTTON_POSITION_RIGHT);
    }

    protected function addButtonToDocHeader(
        ModuleTemplate $moduleTemplate,
        string $href,
        string $iconIdentifier,
        string $title,
        string $position = ButtonBar::BUTTON_POSITION_LEFT,
        int $group = 1,
    ): void {
        $buttonBar = $moduleTemplate->getDocHeaderComponent()->getButtonBar();
        $icon = $this->iconFactory->getIcon($iconIdentifier, IconSize::SMALL);
        $button = $buttonBar->makeLinkButton()
            ->setHref($href)
            ->setTitle($title)
            ->setIcon($icon);

        $buttonBar->addButton($button, $position, $group);
    }

    protected function assignMultiple(ModuleTemplate $moduleTemplate, array $variables): void
    {
        foreach ($variables as $key => $value) {
            $moduleTemplate->assign($key, $value);
        }
    }

    protected function renderModuleResponse(ModuleTemplate $moduleTemplate, string $templatePath): ResponseInterface
    {
        return $moduleTemplate->renderResponse($templatePath);
    }

    protected function flashSuccess(string $message, string $title = ''): void
    {
        $this->addFlashMessage($message, $title, ContextualFeedbackSeverity::OK);
    }

    protected function flashError(string $message, string $title = ''): void
    {
        $this->addFlashMessage($message, $title, ContextualFeedbackSeverity::ERROR);
    }

    protected function flashInfo(string $message, string $title = ''): void
    {
        $this->addFlashMessage($message, $title, ContextualFeedbackSeverity::INFO);
    }
}
