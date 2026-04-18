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
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;

#[AsController]
abstract class AbstractBackendController extends ActionController implements BackendControllerInterface
{
    public function __construct(
        protected readonly ModuleTemplateFactory $moduleTemplateFactory,
        protected readonly IconFactory $iconFactory,
    ) {
    }

    /**
     * Creates a fresh ModuleTemplate for the current request.
     * Call this at the start of each action that renders a response.
     */
    protected function createModuleTemplate(): ModuleTemplate
    {
        return $this->moduleTemplateFactory->create($this->request);
    }

    /**
     * Adds a shortcut button to the docheader button bar.
     *
     * @param array<string, mixed> $arguments
     */
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

    /**
     * Adds a link button to the docheader.
     */
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

    /**
     * Assigns multiple variables to a ModuleTemplate at once.
     *
     * @param array<string, mixed> $variables
     */
    protected function assignMultiple(ModuleTemplate $moduleTemplate, array $variables): void
    {
        foreach ($variables as $key => $value) {
            $moduleTemplate->assign($key, $value);
        }
    }

    /**
     * Renders the ModuleTemplate response for the given template path.
     * The template path follows the Extbase convention: ControllerName/ActionName.
     */
    protected function renderModuleResponse(ModuleTemplate $moduleTemplate, string $templatePath): ResponseInterface
    {
        return $moduleTemplate->renderResponse($templatePath);
    }
}
