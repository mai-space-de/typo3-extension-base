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
| `AllowedFileTypesTrait` | `allowed`, `disallowed` | file, group |
| `AppearanceTrait` | `appearance` array sub-keys | file, inline, link |
| `AuthModeTrait` | `authMode` | select (all render types) |
| `AutoSizeTrait` | `autoSizeMax` | select, group, folder |
| `AutocompleteTrait` | `autocomplete` | input, email, link, number, password |
| `BehaviourTrait` | `behaviour` array sub-keys | file, inline, select, group |
| `ColsRowsTrait` | `cols`, `rows` | text, json |
| `DbFieldLengthTrait` | `dbFieldLength` | select (all render types) |
| `DbTypeTrait` | `dbType` | datetime |
| `DefaultValueTrait` | `default` | input, text, select, check, radio, number, color, datetime, email, link, slug, uuid, json, country, passthrough |
| `EnableCopyToClipboardTrait` | `enableCopyToClipboard` | uuid |
| `EvalTrait` | `eval` | input, text, datetime, email, number, password, slug, check |
| `FieldControlTrait` | `fieldControl` | most |
| `FieldInformationTrait` | `fieldInformation` | most |
| `FieldWizardTrait` | `fieldWizard` | most |
| `FileFolderConfigTrait` | `fileFolderConfig` | select (all render types) |
| `ForeignTableTrait` | `foreignTable`, `foreignField`, `foreignSortby`, `foreignLabel`, `foreignTablePrefix`, `foreignTableWhere`, `foreignTableItemGroup` | inline, select, category, group |
| `GeneratorOptionsTrait` | `generatorOptions` | slug |
| `ItemsProcessorsTrait` | `itemsProcessors`, `itemsProcFunc` | select, check, radio |
| `ItemsTrait` | `items` | select, radio, check |
| `MaxLengthTrait` | `max`, `min` | input, text |
| `MinMaxItemsTrait` | `minitems`, `maxitems` | file, inline, select (multiple/tree), group, folder, category |
| `MmTrait` | `MM`, `MM_opposite_field`, `MM_match_fields` | select, group, category, inline |
| `ModeTrait` | `mode` | input, email, color, datetime, link, number, password |
| `MultipleTrait` | `multiple` | select (all render types), group, folder |
| `NullableTrait` | `nullable` | input, text, email, color, datetime, link, number, password |
| `OverrideChildTcaTrait` | `overrideChildTca` | inline, file |
| `PlaceholderTrait` | `placeholder` | input, text, email, link, number, password, color, json |
| `RangeTrait` | `range` | datetime, number |
| `ReadOnlyTrait` | `readOnly` | most |
| `RenderTypeTrait` | `renderType` | select, input, text, check, user |
| `RequiredTrait` | `required` | most |
| `SearchableTrait` | `searchable` | most |
| `SizeTrait` | `size` | input, text, select, group, folder, country, uuid, none |
| `SliderTrait` | `slider` | number |
| `SoftRefTrait` | `softref` | input, text, link, datetime |
| `SortItemsTrait` | `sortItems` | select (single), country |
| `TreeConfigTrait` | `treeConfig` | select (tree), category |
| `ValuePickerTrait` | `valuePicker` | input, color, number, link |

#### Example traits

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
// Traits/NullableTrait.php
trait NullableTrait
{
    public function setNullable(bool $nullable = true): static
    {
        $this->config['nullable'] = $nullable;
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

```php
// Traits/RangeTrait.php
trait RangeTrait
{
    public function setRange(int|float $lower, int|float $upper): static
    {
        $this->config['range'] = ['lower' => $lower, 'upper' => $upper];
        return $this;
    }
}
```

```php
// Traits/ValuePickerTrait.php
trait ValuePickerTrait
{
    public function setValuePickerItems(array $items): static
    {
        $this->config['valuePicker'] = ['items' => $items];
        return $this;
    }
}
```

```php
// Traits/TreeConfigTrait.php
trait TreeConfigTrait
{
    public function setTreeConfig(array $treeConfig): static
    {
        $this->config['treeConfig'] = $treeConfig;
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

TCA properties: `allowed`, `appearance`, `behaviour`, `disallowed`, `fieldInformation`, `fieldWizard`, `maxitems`, `minitems`, `overrideChildTca`, `readOnly`

Traits used: `ReadOnlyTrait`, `MinMaxItemsTrait`, `AllowedFileTypesTrait`, `AppearanceTrait`, `BehaviourTrait`, `OverrideChildTcaTrait`, `FieldWizardTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setCropVariants(array $cropVariants): static` — sets `overrideChildTca.columns.crop.config.cropVariants`
- `setImageOverlayPalette(bool $enable): static` — controls image overlay palette in appearance

```php
(new FileConfig())
    ->setAllowed('jpg,jpeg,png,webp')
    ->setMaxItems(1)
    ->toArray();
```

---

#### InlineConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/InlineConfig.php`

Covers `type = 'inline'` (IRRE).

TCA properties: `appearance`, `autoSizeMax`, `behaviour`, `customControls`, `filter`, `foreignDefaultSortby`, `foreignField`, `foreignLabel`, `foreignMatchFields`, `foreignSelector`, `foreignSortby`, `foreignTable`, `foreignTableField`, `foreignUnique`, `maxitems`, `minitems`, `mm`, `overrideChildTca`, `size`, `symmetricField`, `symmetricLabel`, `symmetricSortby`

Traits used: `ReadOnlyTrait`, `MinMaxItemsTrait`, `SizeTrait`, `AutoSizeTrait`, `ForeignTableTrait`, `AppearanceTrait`, `OverrideChildTcaTrait`, `BehaviourTrait`, `MmTrait`, `FieldWizardTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setForeignDefaultSortby(string $sorting): static`
- `setForeignMatchFields(array $fields): static`
- `setForeignSelector(string $field): static`
- `setForeignTableField(string $field): static`
- `setForeignUnique(string $field): static`
- `setSymmetricField(string $field): static`
- `setSymmetricLabel(string $field): static`
- `setSymmetricSortby(string $field): static`
- `setFilter(array $filter): static`
- `setCustomControls(array $controls): static`
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

TCA properties: `allowLanguageSynchronization` (via behaviour), `autocomplete`, `default`, `eval`, `fieldControl`, `fieldInformation`, `fieldWizard`, `isIn`, `max`, `min`, `mode`, `nullable`, `placeholder`, `readOnly`, `required`, `search`, `searchable`, `size`, `softref`, `valuePicker`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `PlaceholderTrait`, `MaxLengthTrait`, `EvalTrait`, `SoftRefTrait`, `RenderTypeTrait`, `NullableTrait`, `ModeTrait`, `AutocompleteTrait`, `ValuePickerTrait`, `SearchableTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setIsIn(string $chars): static` — sets `isIn`

---

#### TextConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/TextConfig.php`

Covers `type = 'text'` (textarea / RTE).

TCA properties: `allowLanguageSynchronization` (via behaviour), `cols`, `default`, `enableRichtext`, `enableTabulator`, `eval`, `fieldControl`, `fieldInformation`, `fieldWizard`, `fixedFont`, `isIn`, `max`, `min`, `nullable`, `placeholder`, `readOnly`, `required`, `richtextConfiguration`, `rows`, `search`, `searchable`, `softref`, `wrap`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `PlaceholderTrait`, `MaxLengthTrait`, `EvalTrait`, `SoftRefTrait`, `RenderTypeTrait`, `NullableTrait`, `SearchableTrait`, `ColsRowsTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `enableRte(bool $enable = true): static` — sets `enableRichtext`
- `setRichtextConfiguration(string $configuration): static`
- `enableTabulator(bool $enable = true): static`
- `enableFixedFont(bool $enable = true): static`
- `setWrap(string $wrap): static` — `'virtual'|'off'`
- `setIsIn(string $chars): static`

---

#### SelectSingleConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/SelectSingleConfig.php`

Covers `type = 'select'` with `renderType = 'selectSingle'`.

TCA properties: `allowNonIdValues`, `authMode`, `autoSizeMax`, `behaviour`, `dbFieldLength`, `default`, `disableNonMatchingValueElement`, `fieldControl`, `fieldInformation`, `fieldWizard`, `fileFolderConfig`, `foreignTable`, `foreignTableItemGroup`, `foreignTablePrefix`, `foreignTableWhere`, `itemGroups`, `items`, `itemsProcessors`, `itemsProcFunc`, `maxitems`, `minitems`, `mm`, `multiple`, `readOnly`, `size`, `sortItems`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `AutoSizeTrait`, `ItemsTrait`, `ItemsProcessorsTrait`, `ForeignTableTrait`, `MmTrait`, `AuthModeTrait`, `DbFieldLengthTrait`, `FileFolderConfigTrait`, `SortItemsTrait`, `MultipleTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setAllowNonIdValues(bool $allow = true): static`
- `setDisableNonMatchingValueElement(bool $disable = true): static`
- `setItemGroups(array $groups): static`
- `setMinMaxItems(int $min, int $max): static`

---

#### SelectMultipleConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/SelectMultipleConfig.php`

Covers `type = 'select'` with `renderType = 'selectMultipleSideBySide'`.

TCA properties: `allowNonIdValues`, `authMode`, `autoSizeMax`, `behaviour`, `dbFieldLength`, `default`, `disableNonMatchingValueElement`, `exclusiveKeys`, `fieldControl`, `fieldInformation`, `fieldWizard`, `fileFolderConfig`, `foreignTable`, `foreignTablePrefix`, `foreignTableWhere`, `items`, `itemsProcessors`, `itemsProcFunc`, `maxitems`, `minitems`, `mm`, `multiple`, `multiSelectFilterItems`, `readOnly`, `size`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `AutoSizeTrait`, `MinMaxItemsTrait`, `ItemsTrait`, `ItemsProcessorsTrait`, `ForeignTableTrait`, `MmTrait`, `AuthModeTrait`, `DbFieldLengthTrait`, `FileFolderConfigTrait`, `MultipleTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setAllowNonIdValues(bool $allow = true): static`
- `setDisableNonMatchingValueElement(bool $disable = true): static`
- `setExclusiveKeys(string $keys): static`
- `setMultiSelectFilterItems(array $items): static`

---

#### SelectTreeConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/SelectTreeConfig.php`

Covers `type = 'select'` with `renderType = 'selectTree'`.

TCA properties: `allowNonIdValues`, `authMode`, `behaviour`, `dbFieldLength`, `default`, `disableNonMatchingValueElement`, `exclusiveKeys`, `fieldInformation`, `fieldWizard`, `fileFolderConfig`, `foreignTable`, `foreignTableItemGroup`, `foreignTablePrefix`, `foreignTableWhere`, `items`, `itemsProcessors`, `itemsProcFunc`, `maxitems`, `minitems`, `mm`, `multiple`, `readOnly`, `size`, `treeConfig`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `MinMaxItemsTrait`, `ItemsTrait`, `ItemsProcessorsTrait`, `ForeignTableTrait`, `MmTrait`, `AuthModeTrait`, `DbFieldLengthTrait`, `FileFolderConfigTrait`, `MultipleTrait`, `TreeConfigTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setAllowNonIdValues(bool $allow = true): static`
- `setDisableNonMatchingValueElement(bool $disable = true): static`
- `setExclusiveKeys(string $keys): static`
- `setItemGroups(array $groups): static`

---

#### CheckboxConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/CheckboxConfig.php`

Covers `type = 'check'`.

TCA properties: `cols`, `default`, `eval`, `fieldInformation`, `fieldWizard`, `invertStateDisplay`, `items`, `itemsProcessors`, `itemsProcFunc`, `readOnly`, `renderType`, `validation`, `allowLanguageSynchronization` (via behaviour)

Traits used: `DefaultValueTrait`, `ReadOnlyTrait`, `ItemsTrait`, `ItemsProcessorsTrait`, `EvalTrait`, `RenderTypeTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setColumns(int $cols): static` — sets `cols`
- `setInvertStateDisplay(bool $invert = true): static`
- `setValidation(array $validation): static`

---

#### GroupConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/GroupConfig.php`

Covers `type = 'group'` (record browser).

TCA properties: `allowed`, `allowLanguageSynchronization` (via behaviour), `autoSizeMax`, `default`, `dontRemapTablesOnCopy`, `elementBrowserEntryPoints`, `fieldControl`, `fieldInformation`, `fieldWizard`, `filter`, `foreignTable`, `hideDeleteIcon`, `hideMoveIcons`, `hideSuggest`, `localizeReferencesAtParentLocalization`, `maxitems`, `minitems`, `mm`, `multiple`, `prependTname`, `readOnly`, `size`, `suggestOptions`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `MinMaxItemsTrait`, `AllowedFileTypesTrait`, `AutoSizeTrait`, `MultipleTrait`, `MmTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setFilter(array $filter): static`
- `setElementBrowserEntryPoints(array $entryPoints): static`
- `setSuggestOptions(array $options): static`
- `setHideDeleteIcon(bool $hide = true): static`
- `setHideMoveIcons(bool $hide = true): static`
- `setHideSuggest(bool $hide = true): static`
- `setDontRemapTablesOnCopy(string $tables): static`
- `setPrependTname(bool $prepend = true): static`
- `setLocalizeReferencesAtParentLocalization(bool $localize = true): static`

---

#### DatetimeConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/DatetimeConfig.php`

Covers `type = 'datetime'`.

TCA properties: `allowLanguageSynchronization` (via behaviour), `dbType`, `default`, `disableAgeDisplay`, `fieldControl`, `fieldInformation`, `fieldWizard`, `format`, `mode`, `nullable`, `placeholder`, `range`, `readOnly`, `search`, `searchable`, `softref`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `PlaceholderTrait`, `NullableTrait`, `ModeTrait`, `RangeTrait`, `DbTypeTrait`, `SoftRefTrait`, `SearchableTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setFormat(string $format): static` — `'datetime'|'date'|'time'|'timesec'`
- `setDisableAgeDisplay(bool $disable = true): static`

---

#### LinkConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/LinkConfig.php`

Covers `type = 'link'`.

TCA properties: `allowedTypes`, `allowLanguageSynchronization` (via behaviour), `appearance`, `autocomplete`, `default`, `fieldControl`, `fieldInformation`, `fieldWizard`, `mode`, `nullable`, `placeholder`, `readOnly`, `required`, `search`, `searchable`, `size`, `valuePicker`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `PlaceholderTrait`, `NullableTrait`, `ModeTrait`, `AutocompleteTrait`, `ValuePickerTrait`, `AppearanceTrait`, `SoftRefTrait`, `SearchableTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setAllowedTypes(array $types): static` — e.g. `['page', 'url', 'file', 'folder', 'email', 'telephone']`

---

#### NumberConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/NumberConfig.php`

Covers `type = 'number'`.

TCA properties: `allowLanguageSynchronization` (via behaviour), `autocomplete`, `default`, `fieldControl`, `fieldInformation`, `fieldWizard`, `format`, `mode`, `nullable`, `placeholder`, `range`, `readOnly`, `required`, `size`, `slider`, `valuePicker`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `PlaceholderTrait`, `NullableTrait`, `ModeTrait`, `AutocompleteTrait`, `RangeTrait`, `SliderTrait`, `ValuePickerTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setFormat(string $format): static` — `'integer'|'decimal'`

---

#### SlugConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/SlugConfig.php`

Covers `type = 'slug'`.

TCA properties: `appearance`, `eval`, `fallbackCharacter`, `generatorOptions`, `prependSlash`, `searchable`

Traits used: `ReadOnlyTrait`, `EvalTrait`, `AppearanceTrait`, `GeneratorOptionsTrait`, `SearchableTrait`

Type-exclusive methods:
- `setFallbackCharacter(string $char): static`
- `setPrependSlash(bool $prepend = true): static`

---

#### EmailConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/EmailConfig.php`

Covers `type = 'email'`.

TCA properties: `allowLanguageSynchronization` (via behaviour), `autocomplete`, `eval`, `fieldInformation`, `fieldWizard`, `mode`, `nullable`, `placeholder`, `readOnly`, `required`, `searchable`, `size`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `PlaceholderTrait`, `SizeTrait`, `NullableTrait`, `ModeTrait`, `AutocompleteTrait`, `SearchableTrait`, `EvalTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldInformationTrait`

---

#### PasswordConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/PasswordConfig.php`

Covers `type = 'password'`.

TCA properties: `allowLanguageSynchronization` (via behaviour), `autocomplete`, `default`, `fieldControl`, `fieldInformation`, `fieldWizard`, `hashed`, `mode`, `nullable`, `passwordGenerator`, `passwordPolicy`, `placeholder`, `readOnly`, `required`, `size`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `PlaceholderTrait`, `NullableTrait`, `ModeTrait`, `AutocompleteTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setHashed(bool $hashed = true): static`
- `setPasswordPolicy(string $policy): static`
- `setPasswordGenerator(array $generator): static`

---

#### ColorConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/ColorConfig.php`

Covers `type = 'color'`.

TCA properties: `allowLanguageSynchronization` (via behaviour), `default`, `fieldControl`, `fieldInformation`, `fieldWizard`, `mode`, `nullable`, `opacity`, `placeholder`, `readOnly`, `required`, `searchable`, `size`, `valuePicker`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `PlaceholderTrait`, `NullableTrait`, `ModeTrait`, `ValuePickerTrait`, `SearchableTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setOpacity(bool $enable = true): static` — enables opacity slider (TYPO3 13+)

---

#### FlexConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/FlexConfig.php`

Covers `type = 'flex'`.

TCA properties: `allowLanguageSynchronization` (via behaviour), `ds`, `dsPointerField`, `fieldInformation`, `fieldWizard`, `readOnly`, `searchable`

Traits used: `ReadOnlyTrait`, `SearchableTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setDataStructureIdentifier(string $identifier): static` — sets `dsPointerField`
- `addDataStructure(string $key, string $path): static` — appends to `ds` array

---

#### UuidConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/UuidConfig.php`

Covers `type = 'uuid'`.

TCA properties: `enableCopyToClipboard`, `fieldInformation`, `required`, `searchable`, `size`, `version`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `SizeTrait`, `SearchableTrait`, `EnableCopyToClipboardTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setVersion(int $version): static` — UUID version (e.g. `4`, `7`)

---

#### CategoryConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/CategoryConfig.php`

Covers `type = 'category'` (TYPO3 11+, simplified `sys_category` integration).

TCA properties: `default`, `exclusiveKeys`, `foreignTable`, `foreignTableItemGroup`, `foreignTablePrefix`, `foreignTableWhere`, `itemGroups`, `maxitems`, `minitems`, `mm`, `readOnly`, `relationship`, `size`, `treeConfig`

Traits used: `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `MinMaxItemsTrait`, `ForeignTableTrait`, `MmTrait`, `TreeConfigTrait`

Type-exclusive methods:
- `setRelationship(string $relationship): static` — `'oneToOne'|'oneToMany'|'manyToMany'`
- `setExclusiveKeys(string $keys): static`
- `setItemGroups(array $groups): static`

```php
(new CategoryConfig())
    ->setRelationship('manyToMany')
    ->setMaxItems(10)
    ->toArray();
```

---

#### CountryConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/CountryConfig.php`

Covers `type = 'country'` (TYPO3 14.0+).

TCA properties: `default`, `filter`, `labelField`, `prioritizedCountries`, `readOnly`, `required`, `size`, `sortItems`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `SizeTrait`, `SortItemsTrait`

Type-exclusive methods:
- `setFilter(array $filter): static` — restrict selectable countries
- `setLabelField(string $field): static` — `'name'|'localName'|'officialName'|'iso2'|'iso3'`
- `setPrioritizedCountries(array $isoCodes): static` — ISO 2-letter codes shown first

```php
(new CountryConfig())
    ->setPrioritizedCountries(['DE', 'AT', 'CH'])
    ->setRequired()
    ->toArray();
```

---

#### FolderConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/FolderConfig.php`

Covers `type = 'folder'` (TYPO3 13.0+, folder browser).

TCA properties: `allowLanguageSynchronization` (via behaviour), `autoSizeMax`, `elementBrowserEntryPoints`, `fieldControl`, `fieldInformation`, `fieldWizard`, `hideDeleteIcon`, `hideMoveIcons`, `maxitems`, `minitems`, `multiple`, `readOnly`, `size`

Traits used: `ReadOnlyTrait`, `SizeTrait`, `AutoSizeTrait`, `MinMaxItemsTrait`, `MultipleTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setElementBrowserEntryPoints(array $entryPoints): static`
- `setHideDeleteIcon(bool $hide = true): static`
- `setHideMoveIcons(bool $hide = true): static`

---

#### ImageManipulationConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/ImageManipulationConfig.php`

Covers `type = 'imageManipulation'` (crop/focus point editor).

TCA properties: `allowedExtensions`, `allowLanguageSynchronization` (via behaviour), `cropVariants`, `fieldControl`, `fieldInformation`, `fieldWizard`, `fileField`, `readOnly`

Traits used: `ReadOnlyTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setCropVariants(array $cropVariants): static`
- `setAllowedExtensions(string $extensions): static` — comma-separated list
- `setFileField(string $field): static` — reference to the FAL file field

---

#### JsonConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/JsonConfig.php`

Covers `type = 'json'` (TYPO3 13+, JSON editor).

TCA properties: `allowLanguageSynchronization` (via behaviour), `cols`, `default`, `enableCodeEditor`, `fieldControl`, `fieldInformation`, `fieldWizard`, `placeholder`, `readOnly`, `required`, `rows`, `searchable`

Traits used: `RequiredTrait`, `ReadOnlyTrait`, `DefaultValueTrait`, `PlaceholderTrait`, `SearchableTrait`, `ColsRowsTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `enableCodeEditor(bool $enable = true): static` — syntax-highlighted editor (requires CodeMirror)

```php
(new JsonConfig())
    ->setRows(10)
    ->enableCodeEditor()
    ->setRequired()
    ->toArray();
```

---

#### LanguageConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/LanguageConfig.php`

Covers `type = 'language'` (TYPO3 11+, language selector). Internally uses a select-based render type. Minimal configuration surface — primarily configured via page TSconfig.

TCA properties: no dedicated config properties; type alone is sufficient for most use-cases.

Traits used: `ReadOnlyTrait`

> **Note:** This type selects from `sys_language` records and is typically placed on the system field `sys_language_uid`. Custom usage is uncommon. Page TSconfig `TCEFORM.keepItems` / `TCEFORM.removeItems` control available options.

---

#### NoneConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/NoneConfig.php`

Covers `type = 'none'` (display-only, no DB column).

TCA properties: `fieldInformation`, `format`, `size`

Traits used: `SizeTrait`, `FieldInformationTrait`

Type-exclusive methods:
- `setFormat(string $format): static` — display format (`'int'|'float'|'date'|'datetime'|'time'|'timesec'|'filesize'`)

---

#### PassthroughConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/PassthroughConfig.php`

Covers `type = 'passthrough'` (not rendered in the form, value passed through as-is).

TCA properties: `default`

Traits used: `DefaultValueTrait`

---

#### RadioConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/RadioConfig.php`

Covers `type = 'radio'`.

TCA properties: `allowLanguageSynchronization` (via behaviour), `default`, `fieldControl`, `fieldInformation`, `fieldWizard`, `items`, `itemsProcessors`, `itemsProcFunc`, `readOnly`

Traits used: `ReadOnlyTrait`, `DefaultValueTrait`, `ItemsTrait`, `ItemsProcessorsTrait`, `BehaviourTrait`, `FieldWizardTrait`, `FieldControlTrait`, `FieldInformationTrait`

---

#### UserConfig

**File:** `Classes/TableConfigurationArray/FieldConfig/UserConfig.php`

Covers `type = 'user'` (custom render type via user-defined `renderType`).

TCA properties: `renderType` (required; must match a registered custom render type)

Traits used: `RenderTypeTrait`

> **Note:** All other config keys are type-specific to the custom `renderType` and must be passed as raw array via a dedicated method.

Type-exclusive methods:
- `setParameters(array $parameters): static` — arbitrary `parameters` array passed to the custom element

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
        │   ├── AuthModeTrait.php
        │   ├── AutoSizeTrait.php
        │   ├── AutocompleteTrait.php
        │   ├── BehaviourTrait.php
        │   ├── ColsRowsTrait.php
        │   ├── DbFieldLengthTrait.php
        │   ├── DbTypeTrait.php
        │   ├── DefaultValueTrait.php
        │   ├── EnableCopyToClipboardTrait.php
        │   ├── EvalTrait.php
        │   ├── FieldControlTrait.php
        │   ├── FieldInformationTrait.php
        │   ├── FieldWizardTrait.php
        │   ├── FileFolderConfigTrait.php
        │   ├── ForeignTableTrait.php
        │   ├── GeneratorOptionsTrait.php
        │   ├── ItemsProcessorsTrait.php
        │   ├── ItemsTrait.php
        │   ├── MaxLengthTrait.php
        │   ├── MinMaxItemsTrait.php
        │   ├── MmTrait.php
        │   ├── ModeTrait.php
        │   ├── MultipleTrait.php
        │   ├── NullableTrait.php
        │   ├── OverrideChildTcaTrait.php
        │   ├── PlaceholderTrait.php
        │   ├── RangeTrait.php
        │   ├── ReadOnlyTrait.php
        │   ├── RenderTypeTrait.php
        │   ├── RequiredTrait.php
        │   ├── SearchableTrait.php
        │   ├── SizeTrait.php
        │   ├── SliderTrait.php
        │   ├── SoftRefTrait.php
        │   ├── SortItemsTrait.php
        │   ├── TreeConfigTrait.php
        │   └── ValuePickerTrait.php
        │
        ├── CategoryConfig.php
        ├── CheckboxConfig.php
        ├── ColorConfig.php
        ├── CountryConfig.php
        ├── DatetimeConfig.php
        ├── EmailConfig.php
        ├── FileConfig.php
        ├── FlexConfig.php
        ├── FolderConfig.php
        ├── GroupConfig.php
        ├── ImageManipulationConfig.php
        ├── InlineConfig.php
        ├── InputConfig.php
        ├── JsonConfig.php
        ├── LanguageConfig.php
        ├── LinkConfig.php
        ├── NoneConfig.php
        ├── NumberConfig.php
        ├── PassthroughConfig.php
        ├── PasswordConfig.php
        ├── RadioConfig.php
        ├── SelectMultipleConfig.php
        ├── SelectSingleConfig.php
        ├── SelectTreeConfig.php
        ├── SlugConfig.php
        ├── TextConfig.php
        ├── UserConfig.php
        └── UuidConfig.php
```

---

## Implementation Steps

1. Create `FieldConfigInterface`
2. Create `AbstractFieldConfig`
3. Create all traits in `FieldConfig/Traits/` (38 trait files)
4. Implement concrete config classes (27 classes) in priority order:
   - **High-use:** `FileConfig`, `InlineConfig`, `InputConfig`, `TextConfig`
   - **Select family:** `SelectSingleConfig`, `SelectMultipleConfig`, `SelectTreeConfig`
   - **Common fields:** `CheckboxConfig`, `DatetimeConfig`, `LinkConfig`, `NumberConfig`
   - **Text variants:** `EmailConfig`, `PasswordConfig`, `SlugConfig`, `ColorConfig`
   - **Structural:** `FlexConfig`, `GroupConfig`, `UuidConfig`, `CategoryConfig`
   - **Newer types:** `CountryConfig` (14.0+), `JsonConfig` (13+), `FolderConfig` (13+), `ImageManipulationConfig`
   - **Minimal types:** `RadioConfig`, `LanguageConfig`, `NoneConfig`, `PassthroughConfig`, `UserConfig`
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

// Category tree (sys_category)
(new Field('tt_content', 'tx_myext_categories', 'Categories'))
    ->setConfig(
        (new CategoryConfig())
            ->setRelationship('manyToMany')
            ->setMaxItems(5)
    )
    ->registerField();

// Country picker (TYPO3 14+)
(new Field('tt_address', 'country', 'Country'))
    ->setConfig(
        (new CountryConfig())
            ->setPrioritizedCountries(['DE', 'AT', 'CH'])
            ->setRequired()
    )
    ->registerField();

// JSON editor (TYPO3 13+)
(new Field('tx_myext_domain_model_record', 'settings', 'Settings'))
    ->setConfig(
        (new JsonConfig())
            ->enableCodeEditor()
            ->setRows(15)
    )
    ->registerField();

// Nullable datetime
(new Field('tx_myext_domain_model_event', 'event_date', 'Event Date'))
    ->setConfig(
        (new DatetimeConfig())
            ->setFormat('date')
            ->setNullable()
            ->setRequired()
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
- **`BehaviourTrait` covers `allowLanguageSynchronization`** — rather than a dedicated `AllowLanguageSynchronizationTrait`, this follows the TYPO3 convention of nesting it under `behaviour`.
- **Select split into three classes** — `SelectSingleConfig`, `SelectMultipleConfig`, and `SelectTreeConfig` each have distinct property sets and are used differently; a single `SelectConfig` with `setRenderType()` would expose irrelevant options and obscure the render-type-specific ones.
- **`FieldInformationTrait` split from `FieldWizardTrait` and `FieldControlTrait`** — all three are separate TCA keys and semantically distinct; merged traits would be less discoverable.
- **`ItemsProcessorsTrait` covers both `itemsProcessors` and `itemsProcFunc`** — these two keys are functionally related (both extend item lists) and always co-occur in the same types.
