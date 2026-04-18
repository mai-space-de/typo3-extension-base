<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

use TYPO3\CMS\Core\MetaTag\MetaTagManagerRegistry;
use TYPO3\CMS\Core\Page\AssetCollector;
use TYPO3\CMS\Core\Page\PageRenderer;

trait PageRendererTrait
{
    protected PageRenderer $pageRenderer;
    protected AssetCollector $assetCollector;
    protected MetaTagManagerRegistry $metaTagManagerRegistry;

    public function injectPageRenderer(PageRenderer $pageRenderer): void
    {
        $this->pageRenderer = $pageRenderer;
    }

    public function injectAssetCollector(AssetCollector $assetCollector): void
    {
        $this->assetCollector = $assetCollector;
    }

    public function injectMetaTagManagerRegistry(MetaTagManagerRegistry $metaTagManagerRegistry): void
    {
        $this->metaTagManagerRegistry = $metaTagManagerRegistry;
    }

    protected function setMetaTag(string $type, string $name, string $content, bool $replace = true): void
    {
        $manager = $this->metaTagManagerRegistry->getManagerForProperty($name);
        $manager->addProperty($name, $content, [], $replace, $type);
    }

    protected function setPageTitle(string $title): void
    {
        $this->pageRenderer->setTitle($title);
    }

    protected function addInlineCss(string $identifier, string $css, bool $forceOnTop = false): void
    {
        $this->pageRenderer->addCssInlineBlock($identifier, $css, forceOnTop: $forceOnTop);
    }

    protected function addInlineJs(string $identifier, string $js, bool $forceOnTop = false): void
    {
        $this->pageRenderer->addJsFooterInlineCode($identifier, $js, forceOnTop: $forceOnTop);
    }

    protected function addCssFile(string $identifier, string $path, bool $priority = false): void
    {
        $this->assetCollector->addStyleSheet($identifier, $path, options: ['priority' => $priority]);
    }

    protected function addJsFile(string $identifier, string $path, bool $priority = false): void
    {
        $this->assetCollector->addJavaScript($identifier, $path, options: ['priority' => $priority]);
    }

    protected function loadJavaScriptModule(string $specifier): void
    {
        $this->pageRenderer->loadJavaScriptModule($specifier);
    }

    protected function addHeaderData(string $html): void
    {
        $this->pageRenderer->addHeaderData($html);
    }

    protected function addFooterData(string $html): void
    {
        $this->pageRenderer->addFooterData($html);
    }
}
