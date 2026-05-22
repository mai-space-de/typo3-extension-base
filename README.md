# maispace/mai-base — TYPO3 Extension
[![PHP](https://img.shields.io/badge/PHP-8.2%2B-blue)](https://www.php.net/)
[![TYPO3](https://img.shields.io/badge/TYPO3-13.4%20LTS-orange)](https://typo3.org/)
[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)

Base foundation extension for Maispace TYPO3 projects. Provides shared TypoScript configuration, page layout definitions, and pulls in all TYPO3 backend/infrastructure extensions that the project requires. Mail dispatch is handled by `mai_mail` — no external mail queue package is declared here.

**Requires:** TYPO3 13.4 LTS / 14.1 · PHP 8.2+

---

## Installation

```bash
composer require maispace/mai-base
```

---

## Development

### Linting

```bash
composer lint:check     # Run all linters
composer lint:fix       # Fix auto-fixable issues
```

### Testing

```bash
composer test           # Run all tests
composer test:unit      # Run unit tests only
```

---

## Shared Icon Contract

`mai_base` provides three generic SVG icons that every other maispace extension uses as
its default backend icons. Extensions depend on `mai_base` being loaded first; the icons
and their pre-registered TYPO3 identifiers are then available globally.

### Icon files

| File | Purpose |
| --- | --- |
| `EXT:mai_base/Resources/Public/Icons/generic_table.svg` | Default record/table icon — shown in list-module rows |
| `EXT:mai_base/Resources/Public/Icons/generic_content.svg` | Default content-element / plugin icon — shown in the page module |
| `EXT:mai_base/Resources/Public/Icons/generic_backend_module.svg` | Default backend module icon — shown in the module navigation |

### Pre-registered identifiers

`mai_base/Configuration/Icons.php` registers the following identifiers globally the moment
the extension is loaded. Downstream extensions must **not** redeclare these identifiers.

| Identifier | Points to |
| --- | --- |
| `mai-table` | `generic_table.svg` |
| `mai-content` | `generic_content.svg` |
| `mai-backend-module` | `generic_backend_module.svg` |
| `mai-extension` | `extension.svg` |

### Usage patterns

#### 1 — TCA record icon (`->setIconFile()`)

Use the raw SVG path directly in the TCA builder chain:

```php
// Configuration/TCA/tx_myext_myrecord.php
$builder
    ->setLabel('title')
    ->setIconFile('EXT:mai_base/Resources/Public/Icons/generic_table.svg');
```

Alternatively, register an extension-specific identifier in `Configuration/Icons.php`
pointing to the shared source, then reference that identifier from TCA:

```php
// Configuration/Icons.php
return [
    'tx_myext_myrecord' => [
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        'source'   => 'EXT:mai_base/Resources/Public/Icons/generic_table.svg',
    ],
];
```

#### 2 — Content element / plugin icon

Pass the pre-registered `'mai-content'` identifier when registering a CType:

```php
// Configuration/TCA/Overrides/tt_content.php
(new CType('maispace_myplugin', $lang('ctype.myplugin'), 'mai-content'))
    ->addDefaultHeaderPalette()
    ->register();
```

#### 3 — Backend module icon

Set `iconIdentifier` to the pre-registered `'mai-backend-module'` value:

```php
// Configuration/Backend/Modules.php
return [
    'mai_myext' => [
        'parent'          => 'tools',
        'iconIdentifier'  => 'mai-backend-module',
        // …
    ],
];
```

### Rules

- Use the shared icons during extension scaffolding — creating a unique icon per extension
  is optional and only required once a distinct visual identity is needed.
- Never re-register `mai-table`, `mai-content`, `mai-backend-module`, or `mai-extension`
  in a downstream extension — the `mai-*` namespace is reserved for `mai_base`.
- Never declare `scssphp/scssphp` or `symfony/mailer` in this extension — see the
  architecture constraints in `AGENTS.md`.

---

## License

GPL-2.0-or-later — see [LICENSE](../../LICENSE) for details.
