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
