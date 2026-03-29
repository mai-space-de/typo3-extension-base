<?php

namespace Maispace\MaiBase\Utility;

use TYPO3\CMS\Core\Information\Typo3Version;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class Compatibility
{
    public static function isVersion14(): bool
    {
        $versionInformation = GeneralUtility::makeInstance(Typo3Version::class);

        return version_compare($versionInformation->getVersion(), '14.0.0', '>=');
    }
}