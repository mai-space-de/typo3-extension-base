<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Controller\Traits;

use Maispace\MaiBase\Controller\Traits\PageRendererTrait;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Core\Page\AssetCollector;
use TYPO3\CMS\Core\Page\PageRenderer;

final class PageRendererTraitTest extends TestCase
{
    #[Test]
    public function setPageTitleDelegatesToPageRenderer(): void
    {
        $pageRenderer = $this->createMock(PageRenderer::class);
        $pageRenderer->expects(self::once())->method('setTitle')->with('My Title');

        $subject = $this->createTraitUser($pageRenderer);
        $subject->callSetPageTitle('My Title');
    }

    #[Test]
    public function addInlineCssDelegatesToPageRenderer(): void
    {
        $pageRenderer = $this->createMock(PageRenderer::class);
        $pageRenderer->expects(self::once())
            ->method('addCssInlineBlock')
            ->with('test_css', 'body { color: red; }', forceOnTop: false);

        $subject = $this->createTraitUser($pageRenderer);
        $subject->callAddInlineCss('test_css', 'body { color: red; }');
    }

    #[Test]
    public function addInlineJsDelegatesToPageRenderer(): void
    {
        $pageRenderer = $this->createMock(PageRenderer::class);
        $pageRenderer->expects(self::once())
            ->method('addJsFooterInlineCode')
            ->with('test_js', 'console.log("hello")', forceOnTop: false);

        $subject = $this->createTraitUser($pageRenderer);
        $subject->callAddInlineJs('test_js', 'console.log("hello")');
    }

    #[Test]
    public function addCssFileDelegatesToAssetCollector(): void
    {
        $assetCollector = $this->createMock(AssetCollector::class);
        $assetCollector->expects(self::once())
            ->method('addStyleSheet')
            ->with('my_css', 'EXT:my_ext/Resources/Public/Css/style.css', options: ['priority' => false]);

        $subject = $this->createTraitUser(assetCollector: $assetCollector);
        $subject->callAddCssFile('my_css', 'EXT:my_ext/Resources/Public/Css/style.css');
    }

    #[Test]
    public function addJsFileDelegatesToAssetCollector(): void
    {
        $assetCollector = $this->createMock(AssetCollector::class);
        $assetCollector->expects(self::once())
            ->method('addJavaScript')
            ->with('my_js', 'EXT:my_ext/Resources/Public/Js/app.js', options: ['priority' => true]);

        $subject = $this->createTraitUser(assetCollector: $assetCollector);
        $subject->callAddJsFile('my_js', 'EXT:my_ext/Resources/Public/Js/app.js', true);
    }

    #[Test]
    public function loadJavaScriptModuleDelegatesToPageRenderer(): void
    {
        $pageRenderer = $this->createMock(PageRenderer::class);
        $pageRenderer->expects(self::once())
            ->method('loadJavaScriptModule')
            ->with('@my-vendor/my-package/main.js');

        $subject = $this->createTraitUser($pageRenderer);
        $subject->callLoadJavaScriptModule('@my-vendor/my-package/main.js');
    }

    #[Test]
    public function addHeaderDataDelegatesToPageRenderer(): void
    {
        $pageRenderer = $this->createMock(PageRenderer::class);
        $pageRenderer->expects(self::once())->method('addHeaderData')->with('<link rel="canonical" href="/">');

        $subject = $this->createTraitUser($pageRenderer);
        $subject->callAddHeaderData('<link rel="canonical" href="/">');
    }

    #[Test]
    public function addFooterDataDelegatesToPageRenderer(): void
    {
        $pageRenderer = $this->createMock(PageRenderer::class);
        $pageRenderer->expects(self::once())->method('addFooterData')->with('<script>alert(1)</script>');

        $subject = $this->createTraitUser($pageRenderer);
        $subject->callAddFooterData('<script>alert(1)</script>');
    }

    private function createTraitUser(
        ?PageRenderer $pageRenderer = null,
        ?AssetCollector $assetCollector = null,
    ): object {
        $pageRenderer ??= $this->createMock(PageRenderer::class);
        $assetCollector ??= $this->createMock(AssetCollector::class);

        return new class ($pageRenderer, $assetCollector) {
            use PageRendererTrait;

            public function __construct(PageRenderer $pageRenderer, AssetCollector $assetCollector)
            {
                $this->pageRenderer = $pageRenderer;
                $this->assetCollector = $assetCollector;
            }

            public function callSetPageTitle(string $title): void { $this->setPageTitle($title); }

            public function callAddInlineCss(string $id, string $css): void { $this->addInlineCss($id, $css); }

            public function callAddInlineJs(string $id, string $js): void { $this->addInlineJs($id, $js); }

            public function callAddCssFile(string $id, string $path, bool $priority = false): void { $this->addCssFile($id, $path, $priority); }

            public function callAddJsFile(string $id, string $path, bool $priority = false): void { $this->addJsFile($id, $path, $priority); }

            public function callLoadJavaScriptModule(string $specifier): void { $this->loadJavaScriptModule($specifier); }

            public function callAddHeaderData(string $html): void { $this->addHeaderData($html); }

            public function callAddFooterData(string $html): void { $this->addFooterData($html); }
        };
    }
}
