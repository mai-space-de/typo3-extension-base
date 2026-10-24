<?php

declare(strict_types=1);

use Maispace\MaiBase\Backend\CustomPageModule\CustomPageModuleRegistry;
use Maispace\MaiBase\Backend\RecordModule\RecordModuleRegistry;

$recordRegistry = new RecordModuleRegistry();
$recordDefinitions = $recordRegistry->getDefinitions();

$customPageRegistry = new CustomPageModuleRegistry();
$customPageDefinitions = $customPageRegistry->getDefinitions();

$modules = [];
$needsRecordsGroup = false;
$needsPagesGroup = false;

foreach ($recordDefinitions as $definition) {
    if ($definition->parent === 'mai_records') {
        $needsRecordsGroup = true;
    }
    $modules[$definition->identifier] = $recordRegistry->toModuleConfiguration($definition);
}

foreach ($customPageDefinitions as $definition) {
    if ($definition->parent === 'mai_pages') {
        $needsPagesGroup = true;
    }
    $modules[$definition->identifier] = $customPageRegistry->toModuleConfiguration($definition);
}

$prefix = [];

if ($needsRecordsGroup) {
    $prefix['mai_records'] = [
        'labels' => 'LLL:EXT:mai_base/Resources/Private/Language/locallang_mod_records.xlf',
        'iconIdentifier' => 'mai-backend-module',
        'extensionName' => 'MaiBase',
        'position' => ['after' => 'web'],
        'navigationComponent' => '',
    ];
}

if ($needsPagesGroup) {
    $prefix['mai_pages'] = [
        'labels' => 'LLL:EXT:mai_base/Resources/Private/Language/locallang_mod_pages.xlf',
        'iconIdentifier' => 'apps-pagetree-page-default',
        'extensionName' => 'MaiBase',
        'position' => $needsRecordsGroup ? ['after' => 'mai_records'] : ['after' => 'web'],
        'navigationComponent' => '',
    ];
}

if ($prefix === [] && $modules === []) {
    return [];
}

return $prefix + $modules;
