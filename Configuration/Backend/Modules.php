<?php

declare(strict_types=1);

use Maispace\MaiBase\Backend\RecordModule\RecordModuleRegistry;

$registry = new RecordModuleRegistry();
$definitions = $registry->getDefinitions();

if ($definitions === []) {
    return [];
}

$modules = [];
$needsRecordsGroup = false;

foreach ($definitions as $definition) {
    if ($definition->parent === 'mai_records') {
        $needsRecordsGroup = true;
    }
    $modules[$definition->identifier] = $registry->toModuleConfiguration($definition);
}

if ($needsRecordsGroup) {
    $modules = [
        'mai_records' => [
            'labels' => 'LLL:EXT:mai_base/Resources/Private/Language/locallang_mod_records.xlf',
            'iconIdentifier' => 'mai-backend-module',
            'extensionName' => 'MaiBase',
            'position' => ['after' => 'web'],
            'navigationComponent' => '',
        ],
    ] + $modules;
}

return $modules;
