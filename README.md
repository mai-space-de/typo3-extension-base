# Maispace Base Extension for TYPO3

Base Extension for Maispace Projects providing developer utilities, TCA registration helpers, and backend enhancements for TYPO3 CMS.

## Features

### Backend Enhancements

#### Save and Close Button

Adds a **"Save and Close"** button to the TYPO3 backend editing forms. This button saves the current record and immediately closes the editing form, returning you to the previous view (e.g., the page module or list module).

The button appears alongside the standard "Save" button in the button bar of every record editing form.

#### Record Navigation Buttons

Adds **"Previous record"** and **"Next record"** navigation buttons to the editing form button bar. These buttons allow editors to quickly navigate between sibling records without returning to the list view first.

- **For content elements (`tt_content`)**: Navigate between content elements on the same page, ordered by their sorting position.
- **For pages**: Navigate between pages under the same parent page in the page tree, ordered by their sorting position.
- **For any other table**: Navigate between records with the same parent (pid), ordered by the table's configured sorting field.

The navigation buttons appear on the right side of the button bar and preserve the return URL, so closing any record in the sequence returns you to the original starting point.

### TCA Registration Helpers

Fluent builder classes that simplify TYPO3 TCA (Table Configuration Array) registration:

- **`Helper`** – Static utility methods for TCA operations such as `addCType()`, `addDoktype()`, `overridePalette()`, and `overrideColumns()`.
- **`CType`** – Builder for registering custom content types with chainable methods for default palettes, plugin tabs, accessibility, and more.
- **`Doktype`** – Builder for registering custom page types with SEO, social media, metadata, and behavior tabs.
- **`Field`** – Builder for custom TCA form fields with description, localization, display conditions, and custom config support.
- **`Table`** – Comprehensive table configuration builder with 40+ methods covering language, sorting, versioning, security, and more.
- **`Palette`** – Palette builder for TCA palette configurations.

### Utility Classes

- **`QueryDebugger`** – Converts Extbase queries to raw SQL for debugging. Usage: `QueryDebugger::debug($query)`.
- **`ActiveExtensionConfigurationLoader`** – Merges configuration files from all active extensions for cross-extension configuration sharing.

### Backend Configuration

- Customizable **backend layouts** with a default "Standard" layout featuring 7 content columns: Pop Overs, Navigation, Before Content, Content, After Content, Footer, and Hidden.
- **TypoScript setup** with plugin configuration, PID management, and content rendering libraries.
- **User TSConfig** support for backend user configuration.

## Requirements

- TYPO3 CMS 12.4+

## Installation

Install via Composer:

```bash
composer require maispace/base
```

Or install manually by placing the extension in `typo3conf/ext/base/`.

After installation, activate the extension in the TYPO3 Extension Manager or via:

```bash
vendor/bin/typo3 extension:activate base
```

## Configuration

### Site Set

Include the "MaiSpace Base" site set in your site configuration to activate TypoScript setup, constants, and page TSconfig. The set depends on `typo3/fluid-styled-content`.

### Backend Enhancements

The Save and Close button and record navigation buttons are automatically active once the extension is installed. No additional configuration is required.

## Usage Examples

### TCA Registration Helper

```php
use Maispace\Base\RegistrationHelper\Helper;

// Create a localization helper
$ll = Helper::localLangHelperFactory('LLL:EXT:my_ext/Resources/Private/Language/locallang.xlf:');

// Register a custom content type
Helper::addCType(
    'my_ext',
    'my_content_element',
    $ll('my_content_element.title'),
    $ll('my_content_element.description'),
    'content-text'
);
```

### Query Debugger

```php
use Maispace\Base\Utility\QueryDebugger;

// Debug an Extbase query
QueryDebugger::debug($query);
```

## License

This extension is licensed under the GPL-2.0-or-later license.

## Author

**Joel Maximilian Mai**
- Website: [maispace.de](https://www.maispace.de)
- Email: joel@maispace.de
