# Shared FE List/Detail Rendering Contract

> **Task**: P-23 · **Created**: 2026-05-23

This document defines the shared frontend list/detail rendering contract for all feature extensions (`mai_news`, `mai_events`, `mai_jobs`, `mai_testimonials`, `mai_gallery`, `mai_team`, `mai_faq`, `mai_locations`, etc.).

---

## Purpose

Provide a unified interface and component system that enables:
- **Consistent UI** across all list views (news, events, jobs, testimonials, gallery)
- **Shared Fluid components** via `mai_theme` (no duplicate markup patterns)
- **DTO transformation** for aggregated content feeds (e.g., "Latest Updates" mixing news + events)
- **Predictable data contracts** for frontend developers

---

## Architecture

### 1. Domain Model Interface

**Location**: `EXT:mai_base/Classes/Domain/Model/ListableRecordInterface.php`

All feature extension domain models should implement this interface (directly or via trait).

```php
interface ListableRecordInterface
{
    public function getTitle(): string;
    public function getDescription(): string;
    public function getCategories(): ObjectStorage;  // sys_category
    public function getMedia(): ObjectStorage;       // FAL references
    public function getDate(): ?\DateTimeInterface;
    public function getSlug(): string;
    public function getUid(): int;
}
```

### 2. Adapter Trait

**Location**: `EXT:mai_base/Classes/Domain/Model/ListableRecordTrait.php`

Feature extensions can `use ListableRecordTrait` to auto-implement the interface without modifying existing getters. The trait provides intelligent fallback mapping:

| Interface Method | Trait Resolution Order |
|---|---|
| `getDescription()` | `teaser` → `description` → `body` → `quote` |
| `getMedia()` | `images` → `image` → `portrait` |
| `getDate()` | `date` → `startDate` → `deadline` → `year` |
| `getSlug()` | `slug` → uid fallback |

### 3. DTO Class

**Location**: `EXT:mai_base/Classes/Domain/Model/ListableRecordDto.php`

Standalone DTO for manual transformation or aggregated feeds:

```php
$dto = new ListableRecordDto(
    uid: $news->getUid(),
    title: $news->getTitle(),
    description: $news->getTeaser(),
    categories: $news->getCategories(),
    media: $news->getImages(),
    date: $news->getDate(),
    slug: $news->getSlug(),
);
```

### 4. Fluid Component

**Location**: `EXT:mai_theme/Resources/Private/Partials/Items/ListItem.html`

Shared list item partial that renders any `ListableRecordInterface` implementation:

```html
<f:render partial="Items/ListItem" arguments="{
    item: news,
    detailAction: 'show',
    detailPid: settings.detailPid,
    showImage: true,
    showDate: true,
    showCategories: true
}"/>
```

**Rendered output**:
- Optional leading image (first media item)
- Category tags
- Title (with optional detail link)
- Date (formatted)
- Description (cropped to 200 chars, HTML rendered)
- "Read more" link

### 5. Styling

**Location**: `EXT:mai_theme/Resources/Private/StyleSheets/05-molecules/_list-item.scss`

BEM-structured CSS for `.mai-list-item`:
- Responsive flex layout (column on mobile, row on desktop)
- Consistent spacing using design tokens
- Hover states for interactive elements

---

## Implementation Guide

### For Existing Extensions

#### Option A: Implement Interface Directly

```php
class News extends AbstractEntity implements ListableRecordInterface
{
    // Existing properties and getters...
    
    // Add missing interface methods if needed:
    public function getMedia(): ObjectStorage
    {
        return $this->images;
    }
    
    public function getDescription(): string
    {
        return $this->teaser !== '' ? $this->teaser : $this->body;
    }
}
```

#### Option B: Use Trait (Recommended)

```php
class News extends AbstractEntity implements ListableRecordInterface
{
    use ListableRecordTrait;
    
    // No changes needed - trait auto-maps existing properties
}
```

### For New Extensions

1. Implement `ListableRecordInterface` on your main domain model
2. Use `ListableRecordTrait` for automatic property mapping
3. Use `Items/ListItem` partial in your list templates
4. Follow the controller pattern (see below)

### Controller Pattern

```php
public function listAction(): ResponseInterface
{
    $items = $this->itemRepository->findAll();
    
    $this->view->assignMultiple([
        'items' => $items,  // Collection of ListableRecordInterface
        'settings' => $this->settings,
        // Optional: pagination, filters, etc.
    ]);
    
    return $this->htmlResponse();
}
```

### Template Pattern

```html
<f:for each="{items}" as="item">
    <f:render partial="Items/ListItem" arguments="{
        item: item,
        detailAction: 'show',
        detailPid: settings.detailPid
    }"/>
</f:for>
```

---

## Extension-Specific Mapping

| Extension | `getTitle()` | `getDescription()` | `getMedia()` | `getDate()` |
|---|---|---|---|---|
| `mai_news` | `title` | `teaser` / `body` | `images` | `date` |
| `mai_events` | `title` | `description` | `image` | `startDate` |
| `mai_jobs` | `title` | `description` | (none) | `deadline` |
| `mai_testimonials` | `authorName` | `quote` | `portrait` | (none) |
| `mai_gallery` | `title` | `description` | `images` | `year` (as DateTime) |

---

## Testing

### Unit Tests

Test that your domain model correctly implements the interface:

```php
public function testImplementsListableRecordInterface(): void
{
    $news = new News();
    $news->setTitle('Test');
    $news->setTeaser('Teaser');
    
    self::assertInstanceOf(ListableRecordInterface::class, $news);
    self::assertSame('Test', $news->getTitle());
    self::assertSame('Teaser', $news->getDescription());
}
```

### Integration Tests

Render the list component and verify output structure:

```php
public function testListItemRendersCorrectly(): void
{
    $view = new StandaloneView();
    $view->setPartialRootPaths(['EXT:mai_theme/Resources/Private/Partials/']);
    $view->setPartial('Items/ListItem');
    $view->assign('item', $this->news);
    
    $output = $view->render();
    
    self::assertStringContainsString('mai-list-item', $output);
    self::assertStringContainsString($this->news->getTitle(), $output);
}
```

---

## Migration Checklist

When adopting this contract in an existing extension:

- [ ] Add `ListableRecordInterface` to domain model
- [ ] Add `use ListableRecordTrait;` to domain model
- [ ] Replace custom list markup with `<f:render partial="Items/ListItem"/>`
- [ ] Remove duplicate CSS (defer to `mai_theme`'s `.mai-list-item`)
- [ ] Add unit test verifying interface implementation
- [ ] Run `composer lint:check` and `composer test`
- [ ] Verify list view in DDEV frontend

---

## Maintenance

- **Interface changes** require updating ALL implementing extensions
- **Fluid component changes** automatically propagate to all extensions
- **SCSS changes** affect all extensions via `mai_theme` compilation
- Keep extension-specific rendering (e.g., event calendar grid) separate from this shared contract

---

## Related Files

| File | Purpose |
|---|---|
| `EXT:mai_base/Classes/Domain/Model/ListableRecordInterface.php` | Interface definition |
| `EXT:mai_base/Classes/Domain/Model/ListableRecordTrait.php` | Trait implementation |
| `EXT:mai_base/Classes/Domain/Model/ListableRecordDto.php` | DTO class |
| `EXT:mai_theme/Resources/Private/Partials/Items/ListItem.html` | Shared Fluid component |
| `EXT:mai_theme/Resources/Private/StyleSheets/05-molecules/_list-item.scss` | Component styles |
| `EXT:mai_base/Resources/Private/Language/locallang.xlf` | Translations |

---

## Future Enhancements

- [ ] Add grid variant component (`Items/GridItem.html`)
- [ ] Add card variant component (`Items/CardItem.html`)
- [ ] Create aggregated feed controller for mixed content types
- [ ] Add JSON-LD structured data generation from `ListableRecordInterface`
- [ ] Implement RSS/Atom feed generation from the shared interface
