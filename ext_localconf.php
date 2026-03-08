<?php

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

defined('TYPO3') or exit('Access denied.');

// Customize Backend Login
$GLOBALS['TYPO3_CONF_VARS']['EXTENSIONS']['backend']['loginFootnote'] = '© 2023 by Joel Maximilian Mai';

// Register user tsConfig
ExtensionManagementUtility::addUserTSConfig(
    'EXT:base/Configuration/TsConfig/user.tsconfig'
);
