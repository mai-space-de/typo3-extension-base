# ControllerApiPlanV2.md

Controller base-class and trait layer for `typo3-extension-base` -- V2.
Based on a full audit of all 28 extension FEATURES.md files and existing controller implementations.

---

## Context

The V1 plan (`ControllerApiPlan.md`) was implemented speculatively. This V2 plan is grounded
in what extensions **actually need**: every extension's FEATURES.md was read and the only
existing controller (`EventsController` in `mai_events`) was analyzed. The result is a
focused set of additions that serve 2+ extensions each.

This document was fact-checked against the current filesystem state and corrected. Key
corrections are marked **[CORRECTED]** and known pre-existing debt is marked **[DEBT]**.

---

## Overview

| Deliverable | Status | Location | Consumer count |
|---|---|---|---|
| `AbstractActionController` | **EXISTS** -- no change | `Classes/Controller/AbstractActionController.php` | all frontend |
| `AbstractBackendController` | **EXISTS** -- modify | `Classes/Controller/Backend/AbstractBackendController.php` | 6 backend modules |
| `BackendControllerInterface` | **EXISTS** -- no change | `Classes/Controller/Backend/BackendControllerInterface.php` | -- |
| `AppendDataToPluginVariablesTrait` | **EXISTS** -- no change | `Classes/Controller/Traits/AppendDataToPluginVariablesTrait.php` | all plugins |
| `ResponseHelpersTrait` | **EXISTS** -- modify | `Classes/Controller/Traits/ResponseHelpersTrait.php` | 5+ extensions |
| `PageRendererTrait` | **EXISTS** -- fix + no further additions | `Classes/Controller/Traits/PageRendererTrait.php` | seo, news, events, team |
| `PaginationTrait` | **NEW** | `Classes/Controller/Traits/PaginationTrait.php` | 7-10 extensions |
| `FlashMessageTrait` | **NEW** | `Classes/Controller/Traits/FlashMessageTrait.php` | 4+ extensions |
| `DetailActionTrait` | **NEW** | `Classes/Controller/Traits/DetailActionTrait.php` | 6-7 extensions |
| `BackendCsvExportTrait` | **NEW** | `Classes/Controller/Backend/Traits/BackendCsvExportTrait.php` | 3 extensions |
| `CsvFormatter` | **NEW** | `Classes/Utility/CsvFormatter.php` | internal (shared by traits) |

---

## Code Style Rules (from AGENTS.md, enforced project-wide)

All new and modified files must conform. Pre-existing violations are **[DEBT]**.

- `declare(strict_types=1)` on every PHP file
- `final` classes where class is not designed for extension (utilities, concrete services)
- Constructor DI; no `GeneralUtility::makeInstance()` in services or traits [AGENTS §Architecture §3]
- No docblocks (`/** */`) and no inline comments (`//`) in implementation files
- No `as any`, `@ts-ignore` equivalent patterns

---

## 1. KEEP AS-IS (No Changes)

### 1.1 `AbstractActionController`

**File:** `Classes/Controller/AbstractActionController.php`

Verified content: `initializeAction()` (empty, overrideable), `getContentObjectData()` (reads
`currentContentObject` attribute), `getSettings()` (returns `$this->settings`). Correct.

**[DEBT]:** File contains a large docblock. Remove when touching the file for any other reason.

### 1.2 `BackendControllerInterface`

**File:** `Classes/Controller/Backend/BackendControllerInterface.php`

Verified content: `public function indexAction(): ResponseInterface`. Clean, no changes.

### 1.3 `AppendDataToPluginVariablesTrait`

**File:** `Classes/Controller/Traits/AppendDataToPluginVariablesTrait.php`

Verified content: defines `initializeAction()` which assigns `data` from `currentContentObject`.

**Conflict pattern to document in consuming controllers:**

Because both `AbstractActionController::initializeAction()` and this trait define
`initializeAction()`, consuming controllers must use the trait alias pattern:

```php
use AppendDataToPluginVariablesTrait {
    AppendDataToPluginVariablesTrait::initializeAction as initializeAppendData;
}

protected function initializeAction(): void
{
    parent::initializeAction();
    $this->initializeAppendData();
}
```

This alias pattern is documented in the trait's existing usage comment. No changes needed.

**[DEBT]:** Trait contains a docblock and a usage comment block. Remove when touching the file.

### 1.4 `PageRendererTrait` -- Fix required before "no further additions"

**File:** `Classes/Controller/Traits/PageRendererTrait.php`

**[CORRECTED]:** The V2 plan originally stated "no additions needed" but the current
implementation violates Architecture Constraint §3:

```php
// LINE 52 — VIOLATION: GeneralUtility::makeInstance() in a trait
$registry = GeneralUtility::makeInstance(MetaTagManagerRegistry::class);
```

This must be fixed. `MetaTagManagerRegistry` must be setter-injected instead.

**Required fix:**

1. Add a protected property and setter injector:

```php
protected MetaTagManagerRegistry $metaTagManagerRegistry;

public function injectMetaTagManagerRegistry(MetaTagManagerRegistry $registry): void
{
    $this->metaTagManagerRegistry = $registry;
}
```

2. Replace the `GeneralUtility::makeInstance()` call in `setMetaTag()`:

```php
protected function setMetaTag(string $type, string $name, string $content, bool $replace = true): void
{
    $manager = $this->metaTagManagerRegistry->getManagerForProperty($name);
    $manager->addProperty($name, $content, [], $replace, $type);
}
```

3. Remove the `use TYPO3\CMS\Core\Utility\GeneralUtility;` import.

The TYPO3 DI container calls `injectX()` methods automatically on trait properties when
the consuming class is resolved, identical to the existing `injectPageRenderer()` and
`injectAssetCollector()` injectors already in this trait.

**No other changes** to `PageRendererTrait` are needed after this fix.

**[DEBT]:** File contains docblocks and inline section comments. Remove when touching the file.

---

## 2. MODIFY -- `ResponseHelpersTrait`

**File:** `Classes/Controller/Traits/ResponseHelpersTrait.php`

### Current methods (keep, verified)

- `dataAsJsonResponse(array $data, int $status = 200): ResponseInterface`
- `xmlResponse(string $xml, int $status = 200): ResponseInterface`
- `pdfResponse(string $content, string $filename, int $status = 200): ResponseInterface`

All three use `$this->responseFactory` and `$this->streamFactory` (injected by
`ActionController` automatically in TYPO3 14). Pattern is correct.

**[DEBT]:** File contains docblocks. Remove when touching the file for the additions below.

### Add: `fileDownloadResponse()`

Covers any MIME type not already served by a dedicated method: iCal, vCard, RSS, arbitrary
binary downloads.

```php
protected function fileDownloadResponse(
    string $content,
    string $filename,
    string $contentType,
    bool $inline = false,
    int $status = 200,
): ResponseInterface {
    $disposition = ($inline ? 'inline' : 'attachment') . '; filename="' . $filename . '"';

    return $this->responseFactory
        ->createResponse($status)
        ->withHeader('Content-Type', $contentType)
        ->withHeader('Content-Disposition', $disposition)
        ->withHeader('Content-Length', (string) strlen($content))
        ->withBody($this->streamFactory->createStream($content));
}
```

**Extensions that need this:**
- events: iCal export (`text/calendar; charset=utf-8`)
- team: vCard export (`text/vcard`)
- news: RSS feed (`application/rss+xml`)
- resource: arbitrary file downloads

### Add: `csvResponse()`

Frontend CSV download (e.g. user-initiated export). Delegates serialization to `CsvFormatter`
(Section 8) so the encoding logic is not duplicated with `BackendCsvExportTrait`.

```php
protected function csvResponse(
    array $rows,
    string $filename,
    string $separator = ';',
    bool $includeUtf8Bom = true,
    int $status = 200,
): ResponseInterface {
    $csv = CsvFormatter::format($rows, $separator, $includeUtf8Bom);

    return $this->responseFactory
        ->createResponse($status)
        ->withHeader('Content-Type', 'text/csv; charset=utf-8')
        ->withHeader('Content-Disposition', 'attachment; filename="' . $filename . '"')
        ->withHeader('Content-Length', (string) strlen($csv))
        ->withBody($this->streamFactory->createStream($csv));
}
```

Add `use Maispace\MaiBase\Utility\CsvFormatter;` import.

Semicolon default: this is a German-language project; European Excel opens CSV with `;`.

**Extensions that need this:**
- events: attendee CSV export
- survey: submission CSV export

---

## 3. MODIFY -- `AbstractBackendController`

**File:** `Classes/Controller/Backend/AbstractBackendController.php`

### Current methods (keep, verified)

`createModuleTemplate()`, `addShortcutButton()`, `addButtonToDocHeader()`,
`assignMultiple()`, `renderModuleResponse()` -- all confirmed present.

`__construct(ModuleTemplateFactory $moduleTemplateFactory, IconFactory $iconFactory)` --
confirmed. New flash wrappers are pure method delegation; no constructor changes needed.

**[DEBT]:** File contains docblocks. Remove when touching the file for the additions below.

### Add: flash message convenience wrappers

`addFlashMessage()` is inherited from `ActionController`. These wrappers just apply the
correct `ContextualFeedbackSeverity` constant so consuming controllers don't import it.

```php
use TYPO3\CMS\Core\Type\ContextualFeedbackSeverity;

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
```

**Extensions that need this:** mail (resend/delete feedback), member (status changes),
search (re-index result), survey (export confirmation), consent (statistics), seo (score
updates) -- 6 backend modules.

---

## 4. NEW -- `PaginationTrait`

**File:** `Classes/Controller/Traits/PaginationTrait.php`

### Purpose

Wraps TYPO3 14's `PaginatorInterface` / `SimplePagination` boilerplate into a single call.
Every list-oriented extension repeats the same 8-10 lines for pagination.

### Extensions that need it

news (listing), gallery (grid), events (list view), search (results), timeline (listing),
jobs (listings), testimonials (grid), canteen (archive), member (frontend listing),
locations (listing) -- **7-10 extensions**.

### Implementation

```php
<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

use TYPO3\CMS\Core\Pagination\ArrayPaginator;
use TYPO3\CMS\Core\Pagination\SimplePagination;
use TYPO3\CMS\Extbase\Pagination\QueryResultPaginator;
use TYPO3\CMS\Extbase\Persistence\QueryResultInterface;

trait PaginationTrait
{
    protected function paginateQueryResult(
        QueryResultInterface $queryResult,
        int $defaultItemsPerPage = 10,
    ): array {
        $currentPage = max(1, (int)($this->request->hasArgument('currentPage')
            ? $this->request->getArgument('currentPage')
            : 1));
        $itemsPerPage = (int)($this->settings['itemsPerPage'] ?? $defaultItemsPerPage);

        $paginator = new QueryResultPaginator($queryResult, $currentPage, $itemsPerPage);
        $pagination = new SimplePagination($paginator);

        return ['paginator' => $paginator, 'pagination' => $pagination];
    }

    protected function paginateArray(
        array $items,
        int $defaultItemsPerPage = 10,
    ): array {
        $currentPage = max(1, (int)($this->request->hasArgument('currentPage')
            ? $this->request->getArgument('currentPage')
            : 1));
        $itemsPerPage = (int)($this->settings['itemsPerPage'] ?? $defaultItemsPerPage);

        $paginator = new ArrayPaginator($items, $currentPage, $itemsPerPage);
        $pagination = new SimplePagination($paginator);

        return ['paginator' => $paginator, 'pagination' => $pagination];
    }
}
```

No `@require-extends` attribute is needed as a comment, but annotate with PHPStan:

```php
 * @require-extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
```

Wait -- per project style: no docblocks. Use the native PHP 8.2 trait requirement attribute
instead. However, `@require-extends` is a PHPStan-only annotation and cannot currently be
expressed without a docblock. **Do not add the docblock.** PHPStan will enforce this only
if the project's `phpstan.neon` includes `requireParentExtension: true` under the Extbase
extension rules. Accept the missing annotation for now.

### Usage example

```php
class NewsController extends AbstractActionController
{
    use PaginationTrait;

    public function listAction(): ResponseInterface
    {
        $news = $this->newsRepository->findAll();
        $paginationData = $this->paginateQueryResult($news);
        $this->view->assignMultiple($paginationData);
        return $this->htmlResponse();
    }
}
```

### Design decisions

- Returns array, not assigns to view -- keeps the controller in control of variable names.
- Uses `SimplePagination` (TYPO3 core). Extensions wanting `NumberedPagination` can
  construct it from the returned paginator.
- `currentPage` argument name matches the Extbase/Fluid pagination widget convention.
- `itemsPerPage` reads from `$this->settings` (standard TypoScript/FlexForm path). Falls
  back to the `$defaultItemsPerPage` parameter.

---

## 5. NEW -- `FlashMessageTrait`

**File:** `Classes/Controller/Traits/FlashMessageTrait.php`

### Purpose

Typed flash message wrappers for frontend controllers. Same API surface as the backend
wrappers (Section 3) so developers have a consistent experience across frontend and backend.

### Extensions that need it

account (login/registration/profile feedback), newsletter (opt-in/unsubscribe),
jobs (application submitted), events (registration confirmation) -- **4+ extensions**,
all with form submission flows.

### Why a separate trait (not on `AbstractActionController`)

Not every frontend controller uses flash messages. Keeping it opt-in avoids polluting
controllers that only render read-only views (gallery, timeline, faq, testimonials).

### Implementation

```php
<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

use TYPO3\CMS\Core\Type\ContextualFeedbackSeverity;

trait FlashMessageTrait
{
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

    protected function flashWarning(string $message, string $title = ''): void
    {
        $this->addFlashMessage($message, $title, ContextualFeedbackSeverity::WARNING);
    }
}
```

`addFlashMessage()` is inherited from `ActionController`. No DI changes needed.

---

## 6. NEW -- `DetailActionTrait`

**File:** `Classes/Controller/Traits/DetailActionTrait.php`

### Purpose

Resolves a domain object by UID from a request argument and throws a 404 if not found.
Every detail view repeats this lookup-or-404 pattern.

### Extensions that need it

news (detail), events (detail), team (detail), timeline (detail), jobs (detail),
locations (detail), gallery (detail) -- **6-7 extensions**.

### Implementation

```php
<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

use TYPO3\CMS\Core\Error\Http\PageNotFoundException;
use TYPO3\CMS\Extbase\Persistence\RepositoryInterface;

trait DetailActionTrait
{
    protected function resolveDetailOrNotFound(
        RepositoryInterface $repository,
        string $argumentName = 'uid',
    ): object {
        if (!$this->request->hasArgument($argumentName)) {
            throw new PageNotFoundException('No record identifier provided.', 1745000001);
        }

        $uid = (int)$this->request->getArgument($argumentName);
        $object = $repository->findByUid($uid);

        if ($object === null) {
            throw new PageNotFoundException(
                sprintf('Record with UID %d not found.', $uid),
                1745000002,
            );
        }

        return $object;
    }
}
```

**Note on `RepositoryInterface`:** `TYPO3\CMS\Extbase\Persistence\RepositoryInterface`
declares `findByUid($uid)` in TYPO3 14. This is valid. The method is not defined on the
interface in all TYPO3 versions; if the project ever supports an older LTS, switch the
type hint to the concrete `Repository` base class or add a custom interface.

**Note on `PageNotFoundException`:** In TYPO3 14 the `PageNotFoundException` is caught by
the frontend middleware stack and served as the configured 404 error page. No manual
response building is needed.

### Usage example

```php
class NewsController extends AbstractActionController
{
    use DetailActionTrait;

    public function showAction(): ResponseInterface
    {
        $article = $this->resolveDetailOrNotFound($this->newsRepository);
        $this->view->assign('article', $article);
        return $this->htmlResponse();
    }
}
```

---

## 7. NEW -- `BackendCsvExportTrait`

**File:** `Classes/Controller/Backend/Traits/BackendCsvExportTrait.php`

### Purpose

CSV download response for backend module controllers. `AbstractBackendController` uses
`ModuleTemplate` for HTML responses but needs raw PSR-7 responses for file exports.
This trait provides that without requiring `ResponseHelpersTrait` (which targets frontend
`ActionController` consumers).

### Extensions that need it

events (attendee CSV), survey (submission CSV), member (member list export) -- **3 extensions**.

### Implementation

```php
<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Backend\Traits;

use Maispace\MaiBase\Utility\CsvFormatter;
use Psr\Http\Message\ResponseInterface;

trait BackendCsvExportTrait
{
    protected function csvDownloadResponse(
        array $rows,
        string $filename,
        string $separator = ';',
        bool $includeUtf8Bom = true,
    ): ResponseInterface {
        $csv = CsvFormatter::format($rows, $separator, $includeUtf8Bom);

        return $this->responseFactory
            ->createResponse(200)
            ->withHeader('Content-Type', 'text/csv; charset=utf-8')
            ->withHeader('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->withHeader('Content-Length', (string) strlen($csv))
            ->withBody($this->streamFactory->createStream($csv));
    }
}
```

`$this->responseFactory` and `$this->streamFactory` are inherited from `ActionController`,
which `AbstractBackendController` extends. No DI changes needed in the trait.

---

## 8. NEW -- `CsvFormatter` utility

**File:** `Classes/Utility/CsvFormatter.php`

### Purpose

Shared CSV serialization used by both `ResponseHelpersTrait::csvResponse()` (frontend)
and `BackendCsvExportTrait::csvDownloadResponse()` (backend). Eliminates duplication.

### Implementation

```php
<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Utility;

final class CsvFormatter
{
    public static function format(
        array $rows,
        string $separator = ';',
        bool $includeUtf8Bom = true,
    ): string {
        $handle = fopen('php://temp', 'r+');
        foreach ($rows as $row) {
            fputcsv($handle, $row, $separator);
        }
        rewind($handle);
        $csv = stream_get_contents($handle);
        fclose($handle);

        if ($includeUtf8Bom) {
            $csv = "\xEF\xBB\xBF" . $csv;
        }

        return $csv;
    }
}
```

### Design decisions

- Uses `fputcsv()` for correct quoting/escaping of values containing the separator,
  quotes, or newlines.
- UTF-8 BOM default `true`: German Excel requires BOM to detect UTF-8 encoding.
- Static method: pure function (no state), easily unit-testable without mocking.
- `final` class: not designed for extension; no constructor needed.

---

## 9. EXPLICITLY EXCLUDED

Features considered but deliberately excluded because they serve fewer than 2 extensions
or would create unnecessary abstraction:

| Feature | Reason excluded |
|---|---|
| Category/filter trait | Each extension filters via its own repository methods; a generic trait would be too vague or too rigid |
| Backend CRUD scaffolding | Only 3 backend modules need CRUD; each has different models and authorization |
| RSS response helper | Only news needs RSS; `fileDownloadResponse($content, 'feed.rss', 'application/rss+xml')` covers it |
| Multi-step wizard trait | Only survey uses this pattern |
| Form CSRF helpers | TYPO3 Extbase handles CSRF natively |
| `#[Authorize]` attribute | No current controller needs custom authorization logic |
| `errorAction()` override | Default TYPO3 behaviour is correct; override only in specific controllers |

---

## 10. Migration: `EventsController`

**File:** `packages/typo3-extension-events/Classes/Controller/EventsController.php`

### Current problems (verified against filesystem)

1. Extends `ActionController` directly (line 17), not `AbstractActionController`
2. Uses `new Response()` at line 48 instead of `$this->responseFactory`
3. Does not use any base traits
4. Has docblocks (violates code style)

### Migration steps

1. Change `extends ActionController` to `extends AbstractActionController`
2. Update import: replace `use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;`
   with `use Maispace\MaiBase\Controller\AbstractActionController;`
3. Add `use ResponseHelpersTrait;` and the import
   `use Maispace\MaiBase\Controller\Traits\ResponseHelpersTrait;`
4. Replace manual response in `icalExportAction()`:

```php
// BEFORE (lines 48-53):
$response = new Response();
$response->getBody()->write($icalContent);
return $response
    ->withHeader('Content-Type', 'text/calendar; charset=utf-8')
    ->withHeader('Content-Disposition', 'attachment; filename="events.ics"');

// AFTER:
return $this->fileDownloadResponse(
    $icalContent,
    'events.ics',
    'text/calendar; charset=utf-8',
);
```

5. Remove `use TYPO3\CMS\Core\Http\Response;` import
6. Remove all docblocks from the file
7. Constructor stays as-is: `AbstractActionController` has no constructor, so the
   existing `__construct(iterable $eventProviders, ICalExportService $iCalExportService)`
   passes through cleanly.

**Note:** `EventsController` has no list or detail actions today -- only `icalExportAction()`.
`PaginationTrait` and `DetailActionTrait` are not needed here.

---

## 11. Implementation Order

### Phase 1 -- No inter-dependencies (can be done in parallel)

1. `CsvFormatter` utility
2. `PaginationTrait`
3. `FlashMessageTrait`
4. `DetailActionTrait`

### Phase 2 -- Depends on Phase 1

5. Fix `PageRendererTrait` (`GeneralUtility::makeInstance()` → setter injection)
6. Modify `ResponseHelpersTrait` -- add `fileDownloadResponse()` + `csvResponse()`
7. `BackendCsvExportTrait`
8. Modify `AbstractBackendController` -- add flash message wrappers

### Phase 3 -- Consumer migration (separate PR, different submodule)

9. Migrate `EventsController` to use `AbstractActionController` + `ResponseHelpersTrait`

---

## 12. Unit Tests

Existing test files (confirmed on filesystem):

| Existing test file | Status |
|---|---|
| `Tests/Unit/Controller/AbstractActionControllerTest.php` | No changes needed |
| `Tests/Unit/Controller/Traits/ResponseHelpersTraitTest.php` | **MODIFY** -- add `fileDownloadResponse`, `csvResponse` cases |
| `Tests/Unit/Controller/Traits/PageRendererTraitTest.php` | **MODIFY** -- add `setMetaTag` case once `makeInstance` is fixed |
| `Tests/Unit/Controller/Traits/AppendDataToPluginVariablesTraitTest.php` | No changes needed |
| `Tests/Unit/Controller/Backend/AbstractBackendControllerTest.php` | **MODIFY** -- add `flashSuccess`, `flashError`, `flashInfo` cases |

New test files to create:

| New test file | Covers |
|---|---|
| `Tests/Unit/Utility/CsvFormatterTest.php` | default separator, custom separator, UTF-8 BOM, no BOM, values with quotes/newlines |
| `Tests/Unit/Controller/Traits/PaginationTraitTest.php` | `paginateQueryResult`, `paginateArray`, default page, custom page from request, `itemsPerPage` from settings |
| `Tests/Unit/Controller/Traits/FlashMessageTraitTest.php` | `flashSuccess/Error/Info/Warning` delegate correctly to `addFlashMessage` with correct severity |
| `Tests/Unit/Controller/Traits/DetailActionTraitTest.php` | returns object on hit, throws `PageNotFoundException` on missing argument, throws on null result |
| `Tests/Unit/Controller/Backend/Traits/BackendCsvExportTraitTest.php` | response headers (`Content-Type`, `Content-Disposition`, `Content-Length`) and body content |

---

## 13. File Tree Summary

```
Classes/
  Controller/
    AbstractActionController.php              (no change)
    Backend/
      AbstractBackendController.php           (MODIFY -- add flash wrappers, remove docblocks)
      BackendControllerInterface.php          (no change)
      Traits/
        BackendCsvExportTrait.php             (NEW)
    Traits/
      AppendDataToPluginVariablesTrait.php    (no change)
      ResponseHelpersTrait.php               (MODIFY -- add fileDownload + csv, remove docblocks)
      PageRendererTrait.php                  (FIX -- replace GeneralUtility::makeInstance, remove docblocks)
      PaginationTrait.php                    (NEW)
      FlashMessageTrait.php                  (NEW)
      DetailActionTrait.php                  (NEW)
  Utility/
    CsvFormatter.php                         (NEW)

Tests/Unit/
  Controller/
    AbstractActionControllerTest.php         (no change)
    Traits/
      ResponseHelpersTraitTest.php           (MODIFY)
      PageRendererTraitTest.php              (MODIFY)
      AppendDataToPluginVariablesTraitTest.php (no change)
      PaginationTraitTest.php                (NEW)
      FlashMessageTraitTest.php              (NEW)
      DetailActionTraitTest.php              (NEW)
    Backend/
      AbstractBackendControllerTest.php      (MODIFY)
      Traits/
        BackendCsvExportTraitTest.php        (NEW)
  Utility/
    CsvFormatterTest.php                     (NEW)
```
