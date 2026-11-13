<?php

declare(strict_types=1);

use Maispace\MaiBase\Environment\ConfigProvider;
use TYPO3\CMS\Core\Log\LogLevel;

defined('TYPO3') or die();

ConfigProvider::get()->configureLoggingThresholds(
    LogLevel::WARNING,
    [
        'Maispace' => LogLevel::WARNING,
    ]
);

// <captcha:field /> in any Fluid template, without an inline xmlns declaration.
$GLOBALS['TYPO3_CONF_VARS']['SYS']['fluid']['namespaces']['captcha'][] = 'Maispace\\MaiBase\\ViewHelpers';
