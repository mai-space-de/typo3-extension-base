<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Backend\CustomPageModule;

use Maispace\MaiBase\Controller\Backend\CustomPageModuleController;
use TYPO3\CMS\Core\Utility\GeneralUtility;

final class CustomPageModuleRegistry
{
    private const DEFAULT_PARENT = 'mai_pages';

    private const DEFAULT_SORTING = 9999;

    /**
     * @param array<string, array<string, mixed>>|null $tca
     * @return list<CustomPageModuleDefinition>
     */
    public function getDefinitions(?array $tca = null): array
    {
        $tca ??= $GLOBALS['TCA'] ?? [];
        $pagesCtrl = $tca['pages']['ctrl'] ?? [];
        if (!is_array($pagesCtrl)) {
            return [];
        }

        $modules = $pagesCtrl['EXT']['mai_base']['customPageModules'] ?? [];
        if (!is_array($modules) || $modules === []) {
            return [];
        }

        $definitions = [];
        foreach ($modules as $key => $settings) {
            if (!is_array($settings)) {
                continue;
            }
            if (array_key_exists('enable', $settings) && $settings['enable'] === false) {
                continue;
            }

            $definition = $this->buildDefinition((string) $key, $settings);
            if ($definition === null) {
                continue;
            }
            $definitions[] = $definition;
        }

        usort(
            $definitions,
            static fn(CustomPageModuleDefinition $a, CustomPageModuleDefinition $b): int => $a->sorting <=> $b->sorting,
        );

        return $definitions;
    }

    /**
     * @param array<string, mixed> $settings
     */
    private function buildDefinition(string $key, array $settings): ?CustomPageModuleDefinition
    {
        $doktypes = $this->normalizeDoktypes($settings);
        if ($doktypes === []) {
            return null;
        }

        $title = (string) ($settings['title'] ?? $key);
        $parent = trim((string) ($settings['parent'] ?? self::DEFAULT_PARENT));
        if ($parent === '') {
            $parent = self::DEFAULT_PARENT;
        }

        $identifier = trim((string) ($settings['identifier'] ?? ''));
        if ($identifier === '') {
            $identifier = 'mai_pages_' . $key;
        }

        $icon = '';
        $iconIdentifier = '';
        if (isset($settings['iconIdentifier']) && is_string($settings['iconIdentifier']) && $settings['iconIdentifier'] !== '') {
            $iconIdentifier = $settings['iconIdentifier'];
        } elseif (isset($settings['icon']) && is_string($settings['icon']) && $settings['icon'] !== '') {
            $icon = $settings['icon'];
        } else {
            $iconIdentifier = 'mai-backend-module';
        }

        return new CustomPageModuleDefinition(
            key: $key,
            identifier: $identifier,
            title: $title,
            parent: $parent,
            sorting: (int) ($settings['sorting'] ?? self::DEFAULT_SORTING),
            doktypes: $doktypes,
            pids: $this->normalizePids($settings),
            icon: $icon,
            iconIdentifier: $iconIdentifier,
            parentPidSetting: (string) ($settings['parentPidSetting'] ?? ''),
        );
    }

    /**
     * @param array<string, mixed> $settings
     * @return list<int>
     */
    private function normalizeDoktypes(array $settings): array
    {
        if (isset($settings['doktype'])) {
            $doktype = (int) $settings['doktype'];
            return $doktype > 0 ? [$doktype] : [];
        }

        if (!isset($settings['doktypes'])) {
            return [];
        }

        $doktypes = $settings['doktypes'];
        if (!is_array($doktypes)) {
            $doktypes = GeneralUtility::intExplode(',', (string) $doktypes, true);
        }

        $normalized = [];
        foreach ($doktypes as $doktype) {
            $value = (int) $doktype;
            if ($value > 0) {
                $normalized[] = $value;
            }
        }

        return array_values(array_unique($normalized));
    }

    /**
     * @param array<string, mixed> $settings
     * @return list<int>
     */
    private function normalizePids(array $settings): array
    {
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
    public function toModuleConfiguration(CustomPageModuleDefinition $definition): array
    {
        // Never attach the page tree: the last selected page would open instead of
        // the configured parent / site setting, so the list looked empty or wrong.
        $configuration = [
            'parent' => $definition->parent,
            'position' => ['before' => 'web_list'],
            'access' => 'user',
            'workspaces' => 'live',
            'path' => '/module/mai-pages/' . $definition->key,
            'labels' => [
                'title' => $definition->title,
            ],
            'extensionName' => 'MaiBase',
            'navigationComponent' => '',
            'inheritNavigationComponentFromMainModule' => false,
            'controllerActions' => [
                CustomPageModuleController::class => [
                    'index',
                ],
            ],
            'moduleData' => [
                'table' => 'pages',
                'title' => $definition->title,
                'doktypes' => $definition->doktypes,
                'pids' => $definition->pids,
                'parentPidSetting' => $definition->parentPidSetting,
                'key' => $definition->key,
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
