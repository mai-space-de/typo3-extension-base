# FIELD_CONFIG_PLAN.md

## Overview

This plan introduces a typed, fluent configuration layer for TYPO3 TCA field `config` arrays. The goal is to replace raw PHP arrays passed to `Field::setConfig()` with dedicated, type-safe config objects — one per TCA field type — so that only valid options for that type are exposed.

The design follows the same builder + trait-composition patterns already established in `Table`, `CType`, and `Doktype`.

---

## Motivation

Currently, field `config` arrays are written by hand:

```php
(new Field('tt_content', 'my_image', 'My Image'))
    ->setConfig([
        'type'     => 'file',
        'maxitems' => 5,
        'allowed'  => 'jpg,jpeg,png,gif,webp',
    ])
    ->registerField();
```

Problems with this approach:

- No IDE auto-complete for valid keys per type
- No validation that a key is meaningful for the chosen type
- Repeated copy-paste of common options across field definitions
- `type` key must be remembered and typed correctly every time
- Shared options (e.g. `readOnly`, `required`, `maxitems`) have no single source of truth

---

## Goals

1. Introduce a `FieldConfigInterface` as the contract for all config objects.
2. Introduce an `AbstractFieldConfig` that holds the config array and implements `toArray()`.
3. Extract shared config options into **traits** to avoid duplication.
4. Provide one **concrete config class per TYPO3 field type** that only exposes methods valid for that type.
5. Allow `Field::setConfig()` to accept either a raw `array` (backwards-compatible) or a `FieldConfigInterface` instance.

---

## Architecture

### 1. FieldConfigInterface

**Namespace:** `Maispace\MaiBase\TableConfigurationArray\FieldConfig`
**File:** `Classes/TableConfigurationArray/FieldConfig/FieldConfigInterface.php`

Defines the single contract: produce the TCA `config` sub-array.

```php
interface FieldConfigInterface
{
    /**
     * Returns the complete TCA field config array.
     */
    public function toArray(): array;
}
```

---

### 2. AbstractFieldConfig

**Namespace:** `Maispace\MaiBase\TableConfigurationArray\FieldConfig`
**File:** `Classes/TableConfigurationArray/FieldConfig/AbstractFieldConfig.php`

Base class used by all concrete config classes. Holds the mutable `$config` array, seeds it with the `type` key, and implements `toArray()`.

```php
abstract class AbstractFieldConfig implements FieldConfigInterface
{
    protected array $config = [];

    public function __construct()
    {
        $this->config['type'] = static::TYPE;
    }

    public function toArray(): array
    {
        return $this->config;
    }
}
```

Each subclass declares a `TYPE` constant matching the TYPO3 field type string (e.g. `'file'`, `'inline'`, `'input'`).

---

### 3. Trait Library

Located in `Classes/TableConfigurationArray/FieldConfig/Traits/`.

Each trait adds one or more related config keys. Traits are mixed into concrete config classes based on which options the type actually supports.

| Trait | Config keys covered | Applicable types |
|---|---|---|
| `RequiredTrait` | `required` | most |
| `ReadOnlyTrait` | `readOnly` | most |
| `DefaultValueTrait` | `default` | input, text, select, check, radio, number, color, datetime, email, link, slug, uuid |
| `SizeTrait` | `size` | input, text, select, group |
| `PlaceholderTrait` | `placeholder` | input, text, email, link, number, password |
| `MaxLengthTrait` | `max` | input, text, email, slug, uuid |
| `EvalTrait` | `eval` | input, text, datetime, email, number, password, slug |
| `MinMaxItemsTrait` | `minitems`, `maxitems` | file, inline, select (multiple), group |
| `ForeignTableTrait` | `foreign_table`, `foreign_field`, `foreign_sortby`, `foreign_label` | inline, select |
| `AllowedFileTypesTrait` | `allowed`, `disallowed` | file, group |
| `AppearanceTrait` | `appearance` array sub-keys | file, inline |
| `OverrideChildTcaTrait` | `overrideChildTca` | inline |
| `AutoSizeTrait` | `autoSizeMax` | select, group |
| `ItemsTrait` | `items` | select, radio, check |
| `RenderTypeTrait` | `renderType` | select, input, text, check |
| `MmTrait` | `MM`, `MM_opposite_field`, `MM_match_fields` | select, group |
| `FieldWizardTrait` | `fieldWizard` | most |
| `FieldControlTrait` | `fieldControl` | most |
| `BehaviourTrait` | `behaviour` array sub-keys (`allowLanguageSynchronization`) | most |
| `SoftRefTrait` | `softref` | input, text, link |

#### Example trait

```php
// Traits/RequiredTrait.php
trait RequiredTrait
{
    public function setRequired(bool $required = true): static
    {
        $this->config['required'] = $required;
        return $this;
    }
}
```

```php
// Traits/MinMaxItemsTrait.php
trait MinMaxItemsTrait
{
    public function setMinItems(int $min): static
    {
        $this->config['minitems'] = $min;
        return $this;
    }

    public function setMaxItems(int $max): static
    {
        $this->config['maxitems'] = $max;
        return $this;
    }
}
```

---

### 4. Concrete Config Classes

Located in `Classes/TableConfigurationArray/FieldConfig/`.

Each class:
- Extends `AbstractFieldConfig`
- Declares `const TYPE = '<typo3-type-string>'`
- Uses only the traits relevant to that type
- May add type-exclusive methods not covered by a trait

---

#### FileConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/FileConfig.php`

Covers `type = 'file'` (FAL file references, TYPO3 12+).

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `MinMaxItemsTrait`, `AllowedFileTypesTrait`, `AppearanceTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`

Type-exclusive methods:
- `setCropVariants(array $cropVariants): static` — sets `overrideChildTca.columns.crop.config.cropVariants`
- `setImageOverlayPalette(bool $enable): static` — controls image overlay palette in appearance

```php
(new FileConfig())
    ->setAllowed('jpg,jpeg,png,webp')
    ->setMaxItems(1)
    ->setRequired()
    ->toArray();
```

---

#### InlineConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/InlineConfig.php`

Covers `type = 'inline'` (IRRE).

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `MinMaxItemsTrait`, `ForeignTableTrait`, `AppearanceTrait`, `OverrideChildTcaTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`

Type-exclusive methods:
- `setForeignSortby(string $field): static`
- `setForeignDefaultSortby(string $sorting): static`
- `enableSortable(bool $enable = true): static` — sets `appearance.useSortable`
- `enableNewRecordLinkAddTitle(bool $enable = true): static`
- `setLevelLinksPosition(string $position): static` — `'both'|'top'|'bottom'|'none'`

```php
(new InlineConfig())
    ->setForeignTable('tx_myext_domain_model_item')
    ->setForeignField('parent_uid')
    ->setMaxItems(10)
    ->enableSortable()
    ->toArray();
```

---

#### InputConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/InputConfig.php`

Covers `type = 'input'`.

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `PlaceholderTrait`, `MaxLengthTrait`, `EvalTrait`, `SoftRefTrait`, `RenderTypeTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`

---

#### TextConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/TextConfig.php`

Covers `type = 'text'` (textarea / RTE).

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `PlaceholderTrait`, `MaxLengthTrait`, `EvalTrait`, `SoftRefTrait`, `RenderTypeTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`

Type-exclusive methods:
- `enableRte(bool $enable = true): static` — sets `enableRichtext`
- `setRtePid(int $pid): static` — sets `richtextConfiguration`
- `setRichtextConfiguration(string $configuration): static`
- `setCols(int $cols): static`
- `setRows(int $rows): static`

---

#### SelectSingleConfig / SelectMultipleConfig

**Files:**
- `Classes/TableConfigurationArray/FieldConfig/SelectSingleConfig.php`
- `Classes/TableConfigurationArray/FieldConfig/SelectMultipleConfig.php`

Both cover `type = 'select'` but with distinct render types and item-count semantics.

`SelectSingleConfig`: `renderType = 'selectSingle'`, no `MinMaxItemsTrait`
`SelectMultipleConfig`: `renderType = 'selectMultipleSideBySide'`, uses `MinMaxItemsTrait`

Both use: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `ItemsTrait`, `ForeignTableTrait`, `AutoSizeTrait`, `MmTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`

---

#### CheckboxConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/CheckboxConfig.php`

Covers `type = 'check'`.

Traits used: `DefaultValueTrait`, `ReadOnlyTrait`, `ItemsTrait`, `RenderTypeTrait`, `BehaviourTrait`

Type-exclusive methods:
- `setColumns(int $cols): static`

---

#### GroupConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/GroupConfig.php`

Covers `type = 'group'` (record browser / old file reference style).

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `SizeTrait`, `MinMaxItemsTrait`, `AllowedFileTypesTrait`, `AutoSizeTrait`, `MmTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`

Type-exclusive methods:
- `setAllowedTables(string|array $tables): static` — sets `allowed`
- `setInternalType(string $type): static` — `'db'` or `'folder'`

---

#### DatetimeConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/DatetimeConfig.php`

Covers `type = 'datetime'`.

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `EvalTrait`, `RenderTypeTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`

Type-exclusive methods:
- `setFormat(string $format): static` — `'datetime'|'date'|'time'|'timesec'`
- `setRange(int $lower, int $upper): static`
- `setDbType(string $dbType): static`

---

#### LinkConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/LinkConfig.php`

Covers `type = 'link'`.

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `PlaceholderTrait`, `SoftRefTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`

Type-exclusive methods:
- `setAllowedTypes(array $types): static` — restricts link picker to specific types
- `setAppearance(array $appearance): static`

---

#### NumberConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/NumberConfig.php`

Covers `type = 'number'`.

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `PlaceholderTrait`, `EvalTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`

Type-exclusive methods:
- `setFormat(string $format): static` — `'integer'|'decimal'`
- `setRange(int|float $lower, int|float $upper): static`
- `setSlider(int $step, int $width): static`

---

#### SlugConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/SlugConfig.php`

Covers `type = 'slug'`.

Traits used: `ReadOnlyTrait`, `EvalTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`

Type-exclusive methods:
- `setGeneratorOptions(array $fields, string $separator = '/'): static`
- `setFallbackCharacter(string $char): static`
- `setPrependSlash(bool $prepend = true): static`

---

#### EmailConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/EmailConfig.php`

Covers `type = 'email'`.

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `PlaceholderTrait`, `SoftRefTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`

---

#### PasswordConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/PasswordConfig.php`

Covers `type = 'password'`.

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `PlaceholderTrait`, `EvalTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`

Type-exclusive methods:
- `setHashed(bool $hashed = true): static`
- `setPasswordPolicy(string $policy): static`

---

#### ColorConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/ColorConfig.php`

Covers `type = 'color'`.

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `PlaceholderTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`

Type-exclusive methods:
- `setOpacity(bool $enable = true): static` — enables opacity slider (TYPO3 13+)
- `setValuePickerItems(array $items): static`

---

#### FlexConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/FlexConfig.php`

Covers `type = 'flex'`.

Traits used: `BehaviourTrait`

Type-exclusive methods:
- `setDataStructureIdentifier(string $identifier): static`
- `addDataStructure(string $key, string $path): static` — appends to `ds` array

---

#### UuidConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/UuidConfig.php`

Covers `type = 'uuid'`.

Traits used: `ReadOnlyTrait`

Type-exclusive methods:
- `setVersion(int $version): static` — UUID version (e.g. `4`, `7`)
- `setEnableStatusField(bool $enable = true): static`

---

### 5. Integration with Field Helper

**File:** `Classes/TableConfigurationArray/Field.php` — modify `setConfig()`.

`Field::setConfig()` currently accepts only `array`. It will be updated to also accept `FieldConfigInterface`, calling `toArray()` internally:

```php
public function setConfig(array|FieldConfigInterface $config): self
{
    $this->config = $config instanceof FieldConfigInterface
        ? $config->toArray()
        : $config;
    return $this;
}
```

This change is fully backwards-compatible: existing raw-array usages continue to work unchanged.

---

## File Structure

```
Classes/
└── TableConfigurationArray/
    └── FieldConfig/
        ├── FieldConfigInterface.php
        ├── AbstractFieldConfig.php
        │
        ├── Traits/
        │   ├── AllowedFileTypesTrait.php
        │   ├── AppearanceTrait.php
        │   ├── AutoSizeTrait.php
        │   ├── BehaviourTrait.php
        │   ├── DefaultValueTrait.php
        │   ├── EvalTrait.php
        │   ├── FieldControlTrait.php
        │   ├── FieldWizardTrait.php
        │   ├── ForeignTableTrait.php
        │   ├── ItemsTrait.php
        │   ├── MaxLengthTrait.php
        │   ├── MinMaxItemsTrait.php
        │   ├── MmTrait.php
        │   ├── OverrideChildTcaTrait.php
        │   ├── PlaceholderTrait.php
        │   ├── ReadOnlyTrait.php
        │   ├── RenderTypeTrait.php
        │   ├── RequiredTrait.php
        │   ├── SizeTrait.php
        │   └── SoftRefTrait.php
        │
        ├── CheckboxConfig.php
        ├── ColorConfig.php
        ├── DatetimeConfig.php
        ├── EmailConfig.php
        ├── FileConfig.php
        ├── FlexConfig.php
        ├── GroupConfig.php
        ├── InlineConfig.php
        ├── InputConfig.php
        ├── LinkConfig.php
        ├── NumberConfig.php
        ├── PasswordConfig.php
        ├── SelectMultipleConfig.php
        ├── SelectSingleConfig.php
        ├── SlugConfig.php
        ├── TextConfig.php
        └── UuidConfig.php
```

---

## Implementation Steps

1. Create `FieldConfigInterface`
2. Create `AbstractFieldConfig`
3. Create all traits in `FieldConfig/Traits/`
4. Implement concrete config classes, starting with the most-used:
   - `FileConfig`
   - `InlineConfig`
   - `InputConfig`
   - `TextConfig`
   - `SelectSingleConfig` / `SelectMultipleConfig`
   - Remaining types
5. Update `Field::setConfig()` to accept `array|FieldConfigInterface`
6. Add unit tests for each config class (`toArray()` output correctness)

---

## Example Usage (after implementation)

```php
// FAL image field
(new Field('tt_content', 'tx_myext_image', 'Image'))
    ->setConfig(
        (new FileConfig())
            ->setAllowed('jpg,jpeg,png,gif,webp')
            ->setMaxItems(1)
            ->setRequired()
    )
    ->registerField();

// IRRE child records
(new Field('tt_content', 'tx_myext_items', 'Items'))
    ->setConfig(
        (new InlineConfig())
            ->setForeignTable('tx_myext_domain_model_item')
            ->setForeignField('parent_uid')
            ->setMaxItems(20)
            ->enableSortable()
            ->setLevelLinksPosition('bottom')
    )
    ->registerField();

// RTE textarea
(new Field('tt_content', 'tx_myext_bodytext', 'Body Text'))
    ->setConfig(
        (new TextConfig())
            ->enableRte()
            ->setRows(10)
            ->setRequired()
    )
    ->registerField();

// Select dropdown
(new Field('tt_content', 'tx_myext_layout', 'Layout'))
    ->setConfig(
        (new SelectSingleConfig())
            ->setItems([
                ['label' => 'Default', 'value' => 'default'],
                ['label' => 'Compact', 'value' => 'compact'],
            ])
            ->setDefault('default')
    )
    ->registerField();
```

---

## Design Decisions

- **No constructor arguments** on concrete config classes — all options via fluent setters — consistent with `Table`, `CType`, and `Doktype`.
- **`TYPE` constant on each subclass** — avoids passing the type string as a constructor argument and keeps the `type` key always present.
- **Traits over inheritance** — a deep hierarchy (e.g. `AbstractSelectConfig extends AbstractFieldConfig`) would create coupling; traits keep options orthogonal and composable.
- **Backwards compatibility** — `Field::setConfig()` accepts both `array` and `FieldConfigInterface`, so no existing code breaks.
- **No validation in `toArray()`** — config objects are build-time helpers, not runtime validators; TYPO3 itself validates TCA on load.
