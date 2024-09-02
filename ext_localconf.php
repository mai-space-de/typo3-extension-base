<?php

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or exit('Access denied.');

// Customize Backend Login
$GLOBALS['TYPO3_CONF_VARS']['EXTENSIONS']['backend']['loginFootnote'] = '© 2023 by Joel Maximilian Mai';

// Register user tsConfig
ExtensionManagementUtility::addUserTSConfig(
    'EXT:base/Configuration/TsConfig/user.tsconfig'
);

// Load base typoscript
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTypoScript(
    'base',
    'setup',
    "@import 'EXT:base/Configuration/TypoScript/constants.typoscript'"
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTypoScript(
    'base',
    'setup',
    "@import 'EXT:base/Configuration/TypoScript/setup.typoscript'"
);
