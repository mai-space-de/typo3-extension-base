<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Environment\Traits;

use TYPO3\CMS\Core\Log\LogLevel;
use TYPO3\CMS\Core\Log\Writer\FileWriter;

trait ProductionConfigProviderTrait
{
    /**
     * Sets a global minimum log level for all file writers and applies optional
     * per-namespace overrides.
     *
     * The global threshold disables FileWriter for every severity below $minLevel
     * (DEBUG, INFO, NOTICE, WARNING) and enables it for $minLevel and above.
     *
     * Namespace-level overrides are layered on top via `addFileLogger()`, which
     * targets a specific PSR-3 channel (e.g. "Maispace\\MaiBase") at its own
     * threshold — useful for surfacing WARNING-level logs from one namespace
     * while keeping the global gate at ERROR.
     *
     * Example:
     *   $provider->configureLoggingThresholds(LogLevel::ERROR, [
     *       'Maispace' => LogLevel::WARNING,
     *   ]);
     *
     * @param array<string, string> $namespaceThresholds Map of PSR-3 channel (PHP namespace) to LogLevel constant
     */
    public function configureLoggingThresholds(string $minLevel, array $namespaceThresholds = []): self
    {
        $allLevels = [
            LogLevel::DEBUG,
            LogLevel::INFO,
            LogLevel::NOTICE,
            LogLevel::WARNING,
            LogLevel::ERROR,
            LogLevel::CRITICAL,
            LogLevel::ALERT,
            LogLevel::EMERGENCY,
        ];

        $minLevelIndex = array_search($minLevel, $allLevels, true);
        if (false === $minLevelIndex) {
            $minLevelIndex = array_search(LogLevel::ERROR, $allLevels, true);
        }

        $typo3ConfVars = (array) ($GLOBALS['TYPO3_CONF_VARS'] ?? []);
        $log = (array) ($typo3ConfVars['LOG'] ?? []);
        $writerConfiguration = (array) ($log['writerConfiguration'] ?? []);

        foreach ($allLevels as $index => $level) {
            $writerConfiguration[$level] = [
                FileWriter::class => ['disabled' => $index < $minLevelIndex],
            ];
        }

        $log['writerConfiguration'] = $writerConfiguration;
        $typo3ConfVars['LOG'] = $log;
        $GLOBALS['TYPO3_CONF_VARS'] = $typo3ConfVars;

        foreach ($namespaceThresholds as $namespace => $level) {
            $this->addFileLogger($namespace, null, $level);
        }

        return $this;
    }

    public function useProductionPreset(): self
    {
        $typo3ConfVars = (array) ($GLOBALS['TYPO3_CONF_VARS'] ?? []);

        $be = (array) ($typo3ConfVars['BE'] ?? []);
        $be['debug'] = false;
        $typo3ConfVars['BE'] = $be;

        $fe = (array) ($typo3ConfVars['FE'] ?? []);
        $fe['debug'] = false;
        $typo3ConfVars['FE'] = $fe;

        $sys = (array) ($typo3ConfVars['SYS'] ?? []);
        $sys['devIPmask'] = '';
        $sys['displayErrors'] = -1;
        $sys['belogErrorReporting'] = E_ERROR | E_PARSE | E_CORE_ERROR | E_COMPILE_ERROR | E_USER_ERROR | E_RECOVERABLE_ERROR;
        $sys['exceptionalErrors'] = E_ERROR | E_PARSE | E_CORE_ERROR | E_COMPILE_ERROR | E_USER_ERROR | E_RECOVERABLE_ERROR;
        $typo3ConfVars['SYS'] = $sys;

        $log = (array) ($typo3ConfVars['LOG'] ?? []);
        $log['writerConfiguration'] = array_replace_recursive(
            [
                LogLevel::DEBUG => [
                    FileWriter::class => ['disabled' => true],
                ],
                LogLevel::INFO => [
                    FileWriter::class => ['disabled' => true],
                ],
                LogLevel::WARNING => [
                    FileWriter::class => ['disabled' => true],
                ],
                LogLevel::ERROR => [
                    FileWriter::class => ['disabled' => false],
                ],
            ],
            (array) ($log['writerConfiguration'] ?? []),
        );
        $typo3ConfVars['LOG'] = $log;

        $GLOBALS['TYPO3_CONF_VARS'] = $typo3ConfVars;

        $this->disableDeprecationLogging();

        return $this;
    }
}
