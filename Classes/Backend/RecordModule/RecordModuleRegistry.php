<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Backend\RecordModule;

use Maispace\MaiBase\Controller\Backend\RecordModuleController;
use TYPO3\CMS\Core\Utility\GeneralUtility;

final class RecordModuleRegistry
{
    private const TABLE_PREFIX = 'tx_mai';

    private const DEFAULT_PARENT = 'mai_records';

    private const DEFAULT_SORTING = 9999;

    /**
     * @param array<string, array<string, mixed>>|null $tca
     * @return list<RecordModuleDefinition>
     */
    public function getDefinitions(?array $tca = null): array
    {
        $tca ??= $GLOBALS['TCA'] ?? [];
        $definitions = [];

        foreach ($tca as $table => $tableConfig) {
            if (!$this->shouldRegister($table, $tableConfig)) {
                continue;
            }

            $definitions[] = $this->buildDefinition($table, $tableConfig);
        }

        usort(
            $definitions,
            static fn(RecordModuleDefinition $a, RecordModuleDefinition $b): int => $a->sorting <=> $b->sorting,
        );

        return $definitions;
    }

    /**
     * @param array<string, mixed> $tableConfig
     */
    public function shouldRegister(string $table, array $tableConfig): bool
    {
        if (!str_starts_with($table, self::TABLE_PREFIX)) {
            return false;
        }

        if ((bool) ($tableConfig['ctrl']['hideTable'] ?? false)) {
            return false;
        }

        $settings = $this->getRecordModuleSettings($tableConfig);
        if (array_key_exists('enable', $settings) && $settings['enable'] === false) {
            return false;
        }

        return true;
    }

    /**
     * @param array<string, mixed> $tableConfig
     */
    private function buildDefinition(string $table, array $tableConfig): RecordModuleDefinition
    {
        $settings = $this->getRecordModuleSettings($tableConfig);
        $ctrl = $tableConfig['ctrl'] ?? [];
        $typeIcons = $ctrl['typeicon_classes'] ?? [];

        $title = (string) ($settings['title'] ?? $ctrl['title'] ?? $table);
        $parent = trim((string) ($settings['parent'] ?? self::DEFAULT_PARENT));
        if ($parent === '') {
            $parent = self::DEFAULT_PARENT;
        }

        $pids = $this->normalizePids($settings);
        $icon = '';
        $iconIdentifier = '';

        if (isset($settings['iconIdentifier']) && is_string($settings['iconIdentifier']) && $settings['iconIdentifier'] !== '') {
            $iconIdentifier = $settings['iconIdentifier'];
        } elseif (isset($settings['icon']) && is_string($settings['icon']) && $settings['icon'] !== '') {
            $icon = $settings['icon'];
        } elseif (isset($ctrl['iconfile']) && is_string($ctrl['iconfile']) && $ctrl['iconfile'] !== '') {
            $icon = $ctrl['iconfile'];
        } elseif (is_array($typeIcons) && $typeIcons !== []) {
            $iconIdentifier = (string) ($typeIcons['default'] ?? reset($typeIcons));
        } else {
            $iconIdentifier = 'mai-table';
        }

        return new RecordModuleDefinition(
            table: $table,
            identifier: 'mai_records_' . $table,
            title: $title,
            parent: $parent,
            sorting: (int) ($settings['sorting'] ?? self::DEFAULT_SORTING),
            pids: $pids,
            icon: $icon,
            iconIdentifier: $iconIdentifier,
        );
    }

    /**
     * @param array<string, mixed> $tableConfig
     * @return array<string, mixed>
     */
    private function getRecordModuleSettings(array $tableConfig): array
    {
        $settings = $tableConfig['ctrl']['EXT']['mai_base']['recordModule'] ?? [];

        return is_array($settings) ? $settings : [];
    }

    /**
     * @param array<string, mixed> $settings
     * @return list<int>
     */
    private function normalizePids(array $settings): array
    {
        if (isset($settings['root_level']) && (int) $settings['root_level'] === 1) {
            return [0];
        }

        if (!isset($settings['pids'])) {
            return [];
        }

        $pids = $settings['pids'];
        if (!is_array($pids)) {
            $pids = GeneralUtility::intExplode(',', (string) $pids, true);
        }

        $normalized = [];
        foreach ($pids as $pid) {
            $normalized[] = (int) $pid;
        }

        return array_values(array_unique($normalized));
    }

    /**
     * @return array<string, mixed>
     */
    public function toModuleConfiguration(RecordModuleDefinition $definition): array
    {
        $navigationComponent = '';
        if ($definition->pids === []) {
            $navigationComponent = '@typo3/backend/tree/page-tree-element';
        }

        $configuration = [
            'parent' => $definition->parent,
            'position' => ['before' => 'web_list'],
            'access' => 'user',
            'workspaces' => 'live',
            'path' => '/module/mai-records/' . $definition->table,
            'labels' => [
                'title' => $definition->title,
            ],
            'extensionName' => 'MaiBase',
            'navigationComponent' => $navigationComponent,
            'inheritNavigationComponentFromMainModule' => false,
            'controllerActions' => [
                RecordModuleController::class => [
                    'index',
                ],
            ],
            'moduleData' => [
                'table' => $definition->table,
                'title' => $definition->title,
                'pids' => $definition->pids,
                'clipBoard' => true,
                'searchBox' => true,
            ],
        ];

        if ($definition->iconIdentifier !== '') {
            $configuration['iconIdentifier'] = $definition->iconIdentifier;
        } elseif ($definition->icon !== '') {
            $configuration['icon'] = $definition->icon;
        } else {
            $configuration['iconIdentifier'] = 'mai-backend-module';
        }

        return $configuration;
    }
}
