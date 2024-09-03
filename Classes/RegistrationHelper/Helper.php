<?php

namespace Maispace\Base\RegistrationHelper;

/**
 * Static TCA Helper Class - provides some useful functions for TCA Configuration.
 */
class Helper
{
    /**
     * Provides a closure function, which prepends given LLL key
     * with the path to the locallang file.
     *
     * Usage example:
     *
     * // First create the helper function
     * $lang = Helper::localLangHelperFactory('my_ext');
     *
     * // Then use the $lang function to get the full LLL-path (used for translation)
     * $lang('key1');
     * $lang('tt_content.tx_myext_domain_model_myext.key2');
     */
    public static function localLangHelperFactory(string $extensionKey = 'base', string $locallangFile = 'Default/locallang_tca.xlf'): callable
    {
        return static function (string $key) use ($extensionKey, $locallangFile): string {
            return 'LLL:EXT:' . $extensionKey . '/Resources/Private/Language/' . $locallangFile . ':' . $key;
        };
    }

    /**
     * This is a helper function to add a new CType to the TCA.
     */
    public static function addCType(string $cType, string $label, string $iconIdentifier): void
    {
        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
            'tt_content',
            'CType',
            [
                'label' => $label,
                'value' => $cType,
                'icon' => $iconIdentifier,
            ],
            'textmedia',
            'after'
        );

        $GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes'][$cType] = $iconIdentifier;
    }

    /**
     * This is a helper function to add a new doktype to the TCA.
     */
    public static function addDoktype(string $doktype, string $label, string $iconIdentifier): void
    {
        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTcaSelectItem(
            'pages',
            'doktype',
            [
                'label' => $label,
                'value' => $doktype,
                'icon' => $iconIdentifier,
            ],
            '1',
            'after'
        );

        \TYPO3\CMS\Core\Utility\ArrayUtility::mergeRecursiveWithOverrule(
            $GLOBALS['TCA']['pages'],
            [
                'ctrl' => [
                    'typeicon_classes' => [
                        $doktype => $iconIdentifier,
                        $doktype . '-hideinmenu' => $iconIdentifier . '-hideinmenu',
                        $doktype . '-root' => $iconIdentifier . '-root',
                    ],
                ],
            ]
        );
    }

    /*
     * Helper::overridePalette(
     *      $tableName,
     *      'headers',
     *      $langFrontend('palette.header'),
     *      'header;' . $langFrontend('header_formlabel') . ', --linebreak--, , tx_project_header_appearance;' . $lang('tt_content.tx_project_header_appearance') . ', header_position;' . $langFrontend('header_position_formlabel')
     *  );
     *
     */
    public static function overridePalette(string $tableName, string $paletteName, string $newPaletteLabel, string $newPaletteShowItem): void
    {
        $GLOBALS['TCA'][$tableName]['palettes'][$paletteName]['showitem'] = $newPaletteShowItem;
        $GLOBALS['TCA'][$tableName]['palettes'][$paletteName]['label'] = $newPaletteLabel;
    }

    /**
     * @param array<string, mixed> $newColumnConfiguration
     */
    public static function overrideColumns(string $tableName, string $type, string $columnName, array $newColumnConfiguration): void
    {
        $GLOBALS['TCA'][$tableName]['types'][$type] = array_replace_recursive(
            $GLOBALS['TCA'][$tableName]['types'][$type],
            [
                'columnsOverrides' => [
                    $columnName => $newColumnConfiguration,
                ],
            ]
        );
    }
}
