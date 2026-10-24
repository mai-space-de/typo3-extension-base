<?php

declare(strict_types=1);

use Maispace\MaiBase\Icon\AllIconsCatalog;
use Maispace\MaiBase\Icon\StreamlineSvgIconProvider;
use TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider;

$allIcons = AllIconsCatalog::ICON_PATH;

return array_merge(
    [
        'ext-maispace-mai_base' => [
            'provider' => SvgIconProvider::class,
            'source' => 'EXT:mai_base/Resources/Public/Icons/Extension.svg',
        ],
        'mai-extension' => [
            'provider' => SvgIconProvider::class,
            'source' => 'EXT:mai_base/Resources/Public/Icons/extension.svg',
        ],
        // Semantic defaults (Streamline); generic_*.svg files mirror the same sources.
        'mai-content' => [
            'provider' => StreamlineSvgIconProvider::class,
            'source' => $allIcons . 'interface-content-note-pad-text--content-notes-book-notepad-notebook--Streamline-Core.svg',
        ],
        'mai-table' => [
            'provider' => StreamlineSvgIconProvider::class,
            'source' => $allIcons . 'computer-database--raid-storage-code-disk-programming-database-array-hard-disc--Streamline-Core.svg',
        ],
        'mai-backend-module' => [
            'provider' => StreamlineSvgIconProvider::class,
            'source' => $allIcons . 'interface-dashboard-layout-3--app-application-dashboard-home-layout--Streamline-Core.svg',
        ],
    ],
    AllIconsCatalog::iconRegistryEntries(),
);
