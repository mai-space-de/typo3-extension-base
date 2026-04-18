# ControllerApiPlan.md

Controller base-class and trait layer for `typo3-extension-base`.
Complements the existing `AbstractBackendController` and adds a frontend abstract base
plus a reusable trait for content-element–aware plugins.

---

## Overview

| Deliverable | Status | Location |
|---|---|---|
| `AbstractBackendController` | **EXISTS** – extend per plan | `Classes/Controller/Backend/AbstractBackendController.php` |
| `BackendControllerInterface` | **EXISTS** – no change | `Classes/Controller/Backend/BackendControllerInterface.php` |
| `AbstractActionController` | **NEW** | `Classes/Controller/AbstractActionController.php` |
| `AppendDataToPluginVariablesTrait` | **NEW** | `Classes/Controller/Traits/AppendDataToPluginVariablesTrait.php` |
| `ResponseHelpersTrait` | **NEW** | `Classes/Controller/Traits/ResponseHelpersTrait.php` |
| `PageRendererTrait` | **NEW** | `Classes/Controller/Traits/PageRendererTrait.php` |

---

## 1. `AbstractActionController` (NEW)

### Purpose

A thin, opinionated base for all frontend Extbase controllers in this project.
Does **not** override framework internals — it only adds helper surface and enforces the
namespace convention `Maispace\Mai{Ext}\Controller\`.

### File

```
Classes/Controller/AbstractActionController.php
```

### Namespace / inheritance

```php
namespace Maispace\MaiBase\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;

abstract class AbstractActionController extends ActionController
```

### What it adds

#### 1.1 `initializeAction()` hook

```php
protected function initializeAction(): void
```

Override in concrete controllers to run code before every action.
The base implementation is intentionally **empty** — concrete classes call
`parent::initializeAction()` at the top of their override so the chain is safe.

#### 1.2 `errorAction()` hook

Not overridden here; the TYPO3 default behaviour (adds error flash message, returns
HTTP 400, forwards to referring request) is correct for most cases.
Document this in the class docblock so consumers know they *can* override it.

#### 1.3 Protected response helpers (thin wrappers)

The parent's `htmlResponse()` / `jsonResponse()` / `redirect()` / `redirectToUri()` /
`forward()` are already `protected` and accessible. **Do not re-expose them** with new
public method names — that would duplicate the API. Instead, add doc-only annotations on
the class that surface the most important ones via `@method` tags so IDEs can see them.

Rationale: the TYPO3 core API is stable since TYPO3 11; wrapping every method is noise.

#### 1.4 `getContentObjectData(): array`

```php
protected function getContentObjectData(): array
{
    return $this->request->getAttribute('currentContentObject')?->data ?? [];
}
```

Fetches the content element's `tt_content` row from the current PSR-7 request attribute.
Used internally by `AppendDataToPluginVariablesTrait`; also useful standalone.

#### 1.5 `getSettings(): array`

```php
protected function getSettings(): array
{
    return $this->settings;
}
```

Typed accessor so concrete controllers avoid raw `$this->settings` references in method
signatures they pass as arguments.

### What it does NOT do

- Does **not** inject any additional dependencies in the constructor (keeps DI simple for subclasses).
- Does **not** wrap `$this->view` — TYPO3 14 guarantees `ViewInterface $view` is non-null.
- Does **not** re-declare `$request`, `$settings`, `$uriBuilder` — already accessible via parent.

### Full class skeleton

```php
<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller;

use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;

/**
 * Abstract base for frontend Extbase controllers.
 *
 * Inherits from ActionController and adds project-specific convenience helpers.
 *
 * Available (inherited) response methods:
 *   - htmlResponse(?string $html = null): ResponseInterface
 *   - jsonResponse(?string $json = null): ResponseInterface
 *   - redirect(?string $actionName, ...): ResponseInterface
 *   - redirectToUri(string $uri, ...): ResponseInterface
 *   - forward(string $actionName, ...): ResponseInterface
 *
 * Override initializeAction() to run code before every action.
 * Override errorAction() to customise validation-error behaviour (default: 400 + flash message).
 */
abstract class AbstractActionController extends ActionController
{
    protected function initializeAction(): void
    {
    }

    protected function getContentObjectData(): array
    {
        return $this->request->getAttribute('currentContentObject')?->data ?? [];
    }

    protected function getSettings(): array
    {
        return $this->settings;
    }
}
```

---

## 2. `AbstractBackendController` (EXTEND existing)

### Current state

The class already exists at
`Classes/Controller/Backend/AbstractBackendController.php` and provides:

- Constructor DI: `ModuleTemplateFactory $moduleTemplateFactory`
- `createModuleTemplate(): ModuleTemplate`
- `addShortcutButton(ModuleTemplate, string, string, array): void`
- `renderModuleResponse(ModuleTemplate, string): ResponseInterface`

### Additions

#### 2.1 `addButtonToDocHeader()`

```php
use TYPO3\CMS\Backend\Template\Components\ButtonBar;
use TYPO3\CMS\Core\Imaging\IconSize;

protected function addButtonToDocHeader(
    ModuleTemplate $moduleTemplate,
    string $href,
    string $iconIdentifier,
    string $title,
    string $position = ButtonBar::BUTTON_POSITION_LEFT,
    int $group = 1,
): void
```

Adds a generic link button (not a shortcut) to the doc header.
Useful for "Create new record" or "Back" buttons in `indexAction`.

#### 2.2 `assignMultiple()`

```php
protected function assignMultiple(ModuleTemplate $moduleTemplate, array $variables): void
{
    foreach ($variables as $key => $value) {
        $moduleTemplate->assign($key, $value);
    }
}
```

Mirrors the Fluid StandaloneView `assignMultiple()` API so backend action code reads
consistently with frontend.

#### 2.3 Nothing else

`indexAction(): ResponseInterface` is already mandated by `BackendControllerInterface`.
Backend controllers must not share logic with frontend controllers — keep the class trees
separate.

### Updated class skeleton (full)

```php
<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Backend;

use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Backend\Attribute\AsController;
use TYPO3\CMS\Backend\Template\Components\ButtonBar;
use TYPO3\CMS\Backend\Template\ModuleTemplate;
use TYPO3\CMS\Backend\Template\ModuleTemplateFactory;
use TYPO3\CMS\Core\Imaging\Icon;
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
```

**Note on constructor change:** `IconFactory` is added as a second constructor parameter.
Concrete backend controllers that call `parent::__construct()` must pass both.
If this is disruptive (only one concrete backend controller exists and it extends directly),
alternatively inject `IconFactory` via a setter method tagged `#[\TYPO3\CMS\Core\Attribute\Autoconfigure]`.
The constructor approach is preferred here for explicitness.

---

## 3. `AppendDataToPluginVariablesTrait` (NEW)

### Purpose

Automatically assigns the current content element's `tt_content` row as a `data` variable
to every Fluid template rendered by the consuming controller.
This mirrors the pattern documented in the TYPO3 core API
(`$request->getAttribute('currentContentObject')->data`).

### File

```
Classes/Controller/Traits/AppendDataToPluginVariablesTrait.php
```

### Namespace

```php
namespace Maispace\MaiBase\Controller\Traits;
```

### Constraint

This trait is only valid in classes that extend `ActionController` (i.e., frontend plugins).
It accesses `$this->request` and `$this->view` from the parent class.
Add a `@require-extends` annotation (or an `assert` in `initializeAction`) to document this.

### How it works

The trait overrides `initializeAction()` to assign the content element data to the view.
Because multiple traits and the concrete controller may all define `initializeAction()`,
**the trait's implementation must call the conflicting method** via an alias or the
consuming class must manage the call order explicitly.

**Recommended approach:** the trait defines `initializeAppendDataToPluginVariables()`
(not `initializeAction()`) and the concrete controller calls it from its own
`initializeAction()`. This avoids PHP trait conflict errors entirely.

Alternative: define `initializeAction()` in the trait and document that the consuming
controller must use:

```php
use AppendDataToPluginVariablesTrait {
    AppendDataToPluginVariablesTrait::initializeAction as initializeAppendData;
}

protected function initializeAction(): void
{
    parent::initializeAction();
    $this->initializeAppendData();
    // further controller-specific init ...
}
```

Both patterns are valid. **The aliased approach is preferred** because it is explicit
about call order and does not risk silent shadowing.

### Full trait skeleton

```php
<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

/**
 * Appends the current content element's tt_content row as `data` to every
 * Fluid template rendered by the consuming controller.
 *
 * Usage in a frontend ActionController:
 *
 *   use AppendDataToPluginVariablesTrait {
 *       AppendDataToPluginVariablesTrait::initializeAction as initializeAppendData;
 *   }
 *
 *   protected function initializeAction(): void
 *   {
 *       parent::initializeAction();
 *       $this->initializeAppendData();
 *   }
 *
 * @require-extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
 */
trait AppendDataToPluginVariablesTrait
{
    protected function initializeAction(): void
    {
        /** @var \TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer|null $contentObject */
        $contentObject = $this->request->getAttribute('currentContentObject');
        $this->view->assign('data', $contentObject?->data ?? []);
    }
}
```

### Usage example in a concrete plugin controller

```php
namespace Maispace\MaiEvents\Controller;

use Maispace\MaiBase\Controller\AbstractActionController;
use Maispace\MaiBase\Controller\Traits\AppendDataToPluginVariablesTrait;
use Psr\Http\Message\ResponseInterface;

class EventsController extends AbstractActionController
{
    use AppendDataToPluginVariablesTrait {
        AppendDataToPluginVariablesTrait::initializeAction as initializeAppendData;
    }

    protected function initializeAction(): void
    {
        parent::initializeAction();
        $this->initializeAppendData();
    }

    public function listAction(): ResponseInterface
    {
        // $data (tt_content row) is available in the Fluid template automatically
        return $this->htmlResponse();
    }
}
```

---

## 4. Unit Tests

### `Tests/Unit/Controller/AbstractActionControllerTest.php`

Cover:
- `getContentObjectData()` returns `[]` when attribute is absent
- `getContentObjectData()` returns `$contentObject->data` when attribute is present (mock `ContentObjectRenderer`)
- `getSettings()` returns the value of `$this->settings`

### `Tests/Unit/Controller/Traits/AppendDataToPluginVariablesTrait.php`

Cover:
- `initializeAction()` calls `$this->view->assign('data', ...)` with the correct value
- `initializeAction()` assigns empty array when `currentContentObject` is not in request

Mock strategy: use anonymous class that extends a stub `ActionController` and uses the trait.

---

---

## 4. `ResponseHelpersTrait` (NEW)

### Purpose

Provides type-safe, named response factories for non-HTML content types inside an
Extbase ActionController: structured JSON (data → encode), XML, and PDF.

`ActionController` already exposes `jsonResponse(?string $json)` (renders the JsonView)
and `htmlResponse(?string $html)`. This trait adds the complementary variants that are
missing from the framework for raw-data responses.

### File

```
Classes/Controller/Traits/ResponseHelpersTrait.php
```

### Namespace

```php
namespace Maispace\MaiBase\Controller\Traits;
```

### Dependency on ActionController properties

`ActionController` (TYPO3 14) exposes `$this->responseFactory` and
`$this->streamFactory` as `protected readonly` injected services. The trait uses them
directly — **no additional constructor DI is needed in the consuming class**.

```
@require-extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
```

### Methods

#### `dataAsJsonResponse(array $data, int $status = 200): ResponseInterface`

Encodes `$data` to JSON and returns a PSR-7 response.

```php
protected function dataAsJsonResponse(array $data, int $status = 200): ResponseInterface
{
    $json = json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    return $this->responseFactory
        ->createResponse($status)
        ->withHeader('Content-Type', 'application/json; charset=utf-8')
        ->withBody($this->streamFactory->createStream($json));
}
```

**Why not name it `jsonResponse()`?**
`ActionController::jsonResponse(?string $json)` already exists (protected) and renders
the current `JsonView`. Reusing the name would shadow a framework method. The distinct
name `dataAsJsonResponse` makes the difference explicit: this method encodes a PHP array,
the parent's method renders the view.

#### `xmlResponse(string $xml, int $status = 200): ResponseInterface`

Returns an `application/xml` response from a pre-built XML string.

```php
protected function xmlResponse(string $xml, int $status = 200): ResponseInterface
{
    return $this->responseFactory
        ->createResponse($status)
        ->withHeader('Content-Type', 'application/xml; charset=utf-8')
        ->withBody($this->streamFactory->createStream($xml));
}
```

Typical use: sitemap plugins, iCal-like XML feeds, REST endpoints returning XML.

#### `pdfResponse(string $content, string $filename, int $status = 200): ResponseInterface`

Returns an `application/pdf` response that triggers a browser download.

```php
protected function pdfResponse(string $content, string $filename, int $status = 200): ResponseInterface
{
    return $this->responseFactory
        ->createResponse($status)
        ->withHeader('Content-Type', 'application/pdf')
        ->withHeader('Content-Disposition', 'attachment; filename="' . $filename . '"')
        ->withHeader('Content-Length', (string) strlen($content))
        ->withBody($this->streamFactory->createStream($content));
}
```

`$filename` is the suggested download name (e.g. `"invoice-2024.pdf"`).

### Full trait skeleton

```php
<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

use Psr\Http\Message\ResponseInterface;

/**
 * Provides raw-data response helpers for Extbase ActionControllers.
 *
 * Uses $this->responseFactory and $this->streamFactory which are injected
 * by ActionController automatically in TYPO3 14.
 *
 * @require-extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
 */
trait ResponseHelpersTrait
{
    /**
     * Encodes $data to JSON and returns an application/json response.
     *
     * @param array<string, mixed> $data
     */
    protected function dataAsJsonResponse(array $data, int $status = 200): ResponseInterface
    {
        $json = json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        return $this->responseFactory
            ->createResponse($status)
            ->withHeader('Content-Type', 'application/json; charset=utf-8')
            ->withBody($this->streamFactory->createStream($json));
    }

    /**
     * Returns an application/xml response from a pre-built XML string.
     */
    protected function xmlResponse(string $xml, int $status = 200): ResponseInterface
    {
        return $this->responseFactory
            ->createResponse($status)
            ->withHeader('Content-Type', 'application/xml; charset=utf-8')
            ->withBody($this->streamFactory->createStream($xml));
    }

    /**
     * Returns an application/pdf download response.
     *
     * $filename is the suggested browser download name, e.g. "report-2024.pdf".
     */
    protected function pdfResponse(string $content, string $filename, int $status = 200): ResponseInterface
    {
        return $this->responseFactory
            ->createResponse($status)
            ->withHeader('Content-Type', 'application/pdf')
            ->withHeader('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->withHeader('Content-Length', (string) strlen($content))
            ->withBody($this->streamFactory->createStream($content));
    }
}
```

### Usage example

```php
use Maispace\MaiBase\Controller\AbstractActionController;
use Maispace\MaiBase\Controller\Traits\ResponseHelpersTrait;

class ReportController extends AbstractActionController
{
    use ResponseHelpersTrait;

    public function downloadPdfAction(): ResponseInterface
    {
        $pdf = $this->reportService->generate();
        return $this->pdfResponse($pdf, 'report.pdf');
    }

    public function apiDataAction(): ResponseInterface
    {
        return $this->dataAsJsonResponse(['items' => $this->items]);
    }
}
```

---

## 5. `PageRendererTrait` (NEW)

### Purpose

Provides grouped helper methods for the most common `PageRenderer` operations in a
frontend Extbase controller: meta tags, page title, inline CSS/JS, and the AssetCollector
(preferred API in TYPO3 14).

### File

```
Classes/Controller/Traits/PageRendererTrait.php
```

### Namespace

```php
namespace Maispace\MaiBase\Controller\Traits;
```

### Dependency injection

`PageRenderer` is a `SingletonInterface` and is available via constructor DI.
Traits cannot add constructor parameters. The standard TYPO3 pattern for optional,
trait-provided services is **setter injection** via a named `inject*` method — TYPO3's
DI container calls these automatically on tagged services.

The trait declares:

```php
protected PageRenderer $pageRenderer;

public function injectPageRenderer(PageRenderer $pageRenderer): void
{
    $this->pageRenderer = $pageRenderer;
}
```

The consuming controller does not need to add anything to its constructor. TYPO3 DI
will call `injectPageRenderer()` before the first action method runs.

Similarly for `AssetCollector` (preferred for CSS/JS assets in TYPO3 14):

```php
protected AssetCollector $assetCollector;

public function injectAssetCollector(AssetCollector $assetCollector): void
{
    $this->assetCollector = $assetCollector;
}
```

```
@require-extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
```

### Methods

#### Meta tags via `MetaTagManagerRegistry` (correct TYPO3 14 API)

`PageRenderer::setMetaTag()` is **deprecated since TYPO3 14** (removed in v15). The
correct approach uses `MetaTagManagerRegistry` directly (as done in the core
`MetaTagViewHelper`).

```php
protected function setMetaTag(string $type, string $name, string $content, bool $replace = true): void
```

`$type` is `'name'` or `'property'`. Examples:
- `setMetaTag('name', 'description', 'Page description')`
- `setMetaTag('property', 'og:title', 'Open Graph title')`

Internal implementation uses `MetaTagManagerRegistry::getManagerForProperty()` and
`addProperty()`.

#### Page title

```php
protected function setPageTitle(string $title): void
{
    $this->pageRenderer->setTitle($title);
}
```

Note: `PageRenderer::setTitle()` is **not deprecated** in TYPO3 14.

#### Inline CSS

```php
protected function addInlineCss(string $identifier, string $css, bool $forceOnTop = false): void
{
    $this->pageRenderer->addCssInlineBlock($identifier, $css, forceOnTop: $forceOnTop);
}
```

#### Inline JavaScript (footer)

```php
protected function addInlineJs(string $identifier, string $js, bool $forceOnTop = false): void
{
    $this->pageRenderer->addJsFooterInlineCode($identifier, $js, forceOnTop: $forceOnTop);
}
```

Footer placement is the correct default for non-critical inline JS.

#### CSS file via AssetCollector (preferred in TYPO3 14)

```php
protected function addCssFile(string $identifier, string $path, bool $priority = false): void
{
    $this->assetCollector->addStyleSheet($identifier, $path, options: ['priority' => $priority]);
}
```

#### JavaScript file via AssetCollector (preferred in TYPO3 14)

```php
protected function addJsFile(string $identifier, string $path, bool $priority = false): void
{
    $this->assetCollector->addJavaScript($identifier, $path, options: ['priority' => $priority]);
}
```

#### ES module via PageRenderer

```php
protected function loadJavaScriptModule(string $specifier): void
{
    $this->pageRenderer->loadJavaScriptModule($specifier);
}
```

`$specifier` is a bare module identifier like `@my-vendor/my-package/main.js`.
This is the TYPO3 14 API for ES6 modules (replaces `RequireJS`).

#### Header / footer data blobs

```php
protected function addHeaderData(string $html): void
{
    $this->pageRenderer->addHeaderData($html);
}

protected function addFooterData(string $html): void
{
    $this->pageRenderer->addFooterData($html);
}
```

For arbitrary raw HTML in `<head>` or before `</body>`.

### What it does NOT wrap

- `addCssFile()` / `addJsFile()` via `PageRenderer` directly — **use AssetCollector
  instead**. The trait deliberately omits the deprecated PageRenderer file-add methods to
  guide consumers toward the correct API.
- `getMetaTag()` / `removeMetaTag()` — deprecated since TYPO3 14. Not exposed.
- `getBodyContent()`, `getDocType()`, and all other deprecated getters.

### Full trait skeleton

```php
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
```

### Usage example

```php
use Maispace\MaiBase\Controller\AbstractActionController;
use Maispace\MaiBase\Controller\Traits\PageRendererTrait;

class ArticleController extends AbstractActionController
{
    use PageRendererTrait;

    public function showAction(Article $article): ResponseInterface
    {
        $this->setPageTitle($article->getTitle());
        $this->setMetaTag('name', 'description', $article->getTeaser());
        $this->setMetaTag('property', 'og:title', $article->getTitle());
        $this->addCssFile('article_styles', 'EXT:mai_articles/Resources/Public/Css/article.css');

        $this->view->assign('article', $article);
        return $this->htmlResponse();
    }
}
```

---

## 5. Implementation Order

1. `AbstractActionController` — no dependencies on new code
2. `AppendDataToPluginVariablesTrait` — no dependencies on new code
3. `ResponseHelpersTrait` — no dependencies on new code
4. `PageRendererTrait` — no dependencies on new code
5. Extend `AbstractBackendController` — additive change, backwards-compatible except for the constructor `IconFactory` addition (assess impact first)
6. Unit tests for all five deliverables
7. Migrate `EventsController` → extend `AbstractActionController` (optional, separate PR)

---

## 6. Out of Scope

- **`#[Authorize]` attribute** — documented by TYPO3 14, but no current controller needs
  authorization logic. Add when a feature requires it.
- **`errorAction()` override** — default TYPO3 behaviour is correct. Override only in
  controllers that need custom validation-error UX.
- **Backend module registration** (`Configuration/Backend/Modules.php`) — controller
  scaffolding only; module config lives in the consuming extension.
- **PSR-14 events** (`BeforeActionCallEvent`, `AfterActionCallEvent`) — no current need.
  Fire from a concrete controller if required.
