<?php

declare(strict_types=1);

return [
    'ext-maispace-mai_base' => [
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        'source' => 'EXT:mai_base/Resources/Public/Icons/Extension.svg',
    ],
    'mai-extension' => [
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        'source' => 'EXT:mai_base/Resources/Public/Icons/extension.svg',
    ],
    'mai-content' => [
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        'source' => 'EXT:mai_base/Resources/Public/Icons/generic_content.svg',
    ],
    'mai-table' => [
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        'source' => 'EXT:mai_base/Resources/Public/Icons/generic_table.svg',
    ],
    'mai-backend-module' => [
        'provider' => \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
        'source' => 'EXT:mai_base/Resources/Public/Icons/generic_backend_module.svg',
    ],
];
