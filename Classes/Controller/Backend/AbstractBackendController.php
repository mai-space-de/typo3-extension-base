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
    ) {}

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
        $resolvedPath = $this->resolveModuleTemplatePath($templatePath);
        $controllerName = $this->request?->getControllerName() ?? 'NULL';
        $requestClass = $this->request ? get_class($this->request) : 'NO_REQUEST';
        error_log(sprintf(
            'MAI_DEBUG: renderModuleResponse input=%s resolved=%s controllerName=%s requestClass=%s',
            $templatePath,
            $resolvedPath,
            $controllerName,
            $requestClass
        ));
        return $moduleTemplate->renderResponse($resolvedPath);
    }

    /**
     * Builds the full template path for ModuleTemplate rendering.
     *
     * TYPO3's ModuleTemplate::renderResponse() uses a standalone Fluid view whose rendering
     * context has controllerName='Default'. Template resolution therefore looks for
     * "{root}/Default/{action}.html" unless the full path is given explicitly.
     *
     * Extbase derives a controller alias such as "Backend\ConsentStatisticsBackend" from the
     * FQCN. Converting the backslash to "/" yields "Backend/ConsentStatisticsBackend", which
     * is used as the template sub-directory. Passing the composite path
     * "Backend/ConsentStatisticsBackend/Index" makes Fluid fall back to the raw template root
     * and resolve "Backend/ConsentStatisticsBackend/Index.html" — exactly where the template
     * files live in this project.
     */
    protected function resolveModuleTemplatePath(string $templatePath): string
    {
        $controllerPath = str_replace('\\', '/', $this->request->getControllerName());
        return $controllerPath . '/' . $templatePath;
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
