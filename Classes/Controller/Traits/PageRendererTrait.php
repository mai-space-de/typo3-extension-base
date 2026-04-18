<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

use TYPO3\CMS\Core\MetaTag\MetaTagManagerRegistry;
use TYPO3\CMS\Core\Page\AssetCollector;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;

/**
 * Provides PageRenderer and AssetCollector helpers for frontend ActionControllers.
 *
 * Dependencies are injected via setter injection — TYPO3 DI calls injectPageRenderer()
 * and injectAssetCollector() automatically. No constructor changes needed.
 *
 * Meta tags use MetaTagManagerRegistry (correct TYPO3 14 API).
 * CSS/JS files use AssetCollector (preferred over PageRenderer file methods in TYPO3 14).
 *
 * @require-extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
 */
trait PageRendererTrait
{
    protected PageRenderer $pageRenderer;
    protected AssetCollector $assetCollector;

    public function injectPageRenderer(PageRenderer $pageRenderer): void
    {
        $this->pageRenderer = $pageRenderer;
    }

    public function injectAssetCollector(AssetCollector $assetCollector): void
    {
        $this->assetCollector = $assetCollector;
    }

    // -------------------------------------------------------------------------
    // Meta tags (MetaTagManagerRegistry — TYPO3 14 correct API)
    // -------------------------------------------------------------------------

    /**
     * Sets a meta tag via MetaTagManagerRegistry.
     *
     * $type: 'name' | 'property'
     * Examples:
     *   setMetaTag('name', 'description', 'My description')
     *   setMetaTag('property', 'og:image', 'https://...')
     */
    protected function setMetaTag(string $type, string $name, string $content, bool $replace = true): void
    {
        $registry = GeneralUtility::makeInstance(MetaTagManagerRegistry::class);
        $manager = $registry->getManagerForProperty($name);
        $manager->addProperty($name, $content, [], $replace, $type);
    }

    // -------------------------------------------------------------------------
    // Page title
    // -------------------------------------------------------------------------

    protected function setPageTitle(string $title): void
    {
        $this->pageRenderer->setTitle($title);
    }

    // -------------------------------------------------------------------------
    // Inline CSS / JS (via PageRenderer)
    // -------------------------------------------------------------------------

    protected function addInlineCss(string $identifier, string $css, bool $forceOnTop = false): void
    {
        $this->pageRenderer->addCssInlineBlock($identifier, $css, forceOnTop: $forceOnTop);
    }

    /**
     * Adds inline JavaScript to the footer (correct default placement for non-critical code).
     */
    protected function addInlineJs(string $identifier, string $js, bool $forceOnTop = false): void
    {
        $this->pageRenderer->addJsFooterInlineCode($identifier, $js, forceOnTop: $forceOnTop);
    }

    // -------------------------------------------------------------------------
    // CSS / JS files (via AssetCollector — preferred in TYPO3 14)
    // -------------------------------------------------------------------------

    /**
     * Adds a stylesheet via AssetCollector.
     * $path allows EXT: syntax, e.g. 'EXT:my_ext/Resources/Public/Css/style.css'
     * $priority: true = render in <head> before page.includeCSS; false = normal order
     */
    protected function addCssFile(string $identifier, string $path, bool $priority = false): void
    {
        $this->assetCollector->addStyleSheet($identifier, $path, options: ['priority' => $priority]);
    }

    /**
     * Adds a JavaScript file via AssetCollector.
     * $priority: true = render in <head>; false = render before </body>
     */
    protected function addJsFile(string $identifier, string $path, bool $priority = false): void
    {
        $this->assetCollector->addJavaScript($identifier, $path, options: ['priority' => $priority]);
    }

    // -------------------------------------------------------------------------
    // ES6 module (PageRenderer)
    // -------------------------------------------------------------------------

    /**
     * Registers an ES6 module via import map.
     * $specifier: bare module identifier, e.g. '@my-vendor/my-package/main.js'
     */
    protected function loadJavaScriptModule(string $specifier): void
    {
        $this->pageRenderer->loadJavaScriptModule($specifier);
    }

    // -------------------------------------------------------------------------
    // Raw header / footer data
    // -------------------------------------------------------------------------

    protected function addHeaderData(string $html): void
    {
        $this->pageRenderer->addHeaderData($html);
    }

    protected function addFooterData(string $html): void
    {
        $this->pageRenderer->addFooterData($html);
    }
}
