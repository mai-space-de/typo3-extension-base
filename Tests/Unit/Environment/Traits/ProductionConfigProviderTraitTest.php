<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Environment\Traits;

use Maispace\MaiBase\Environment\Traits\DefaultConfigProviderTrait;
use Maispace\MaiBase\Environment\Traits\ProductionConfigProviderTrait;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Core\Log\LogLevel;
use TYPO3\CMS\Core\Log\Writer\FileWriter;

final class ProductionConfigProviderTraitTest extends TestCase
{
    private object $subject;

    protected function setUp(): void
    {
        $GLOBALS['TYPO3_CONF_VARS'] = [];

        $this->subject = new class {
            use DefaultConfigProviderTrait;
            use ProductionConfigProviderTrait;

            protected string $varPath = '/var/typo3';

            protected object $context;

            public function __construct()
            {
                $this->context = new class {
                    public function isProduction(): bool
                    {
                        return true;
                    }
                };
            }
        };
    }

    protected function tearDown(): void
    {
        unset($GLOBALS['TYPO3_CONF_VARS']);
    }

    #[Test]
    public function configureLoggingThresholdsDisablesLevelsBelowMinimum(): void
    {
        $this->subject->configureLoggingThresholds(LogLevel::ERROR);

        $writerConfig = $GLOBALS['TYPO3_CONF_VARS']['LOG']['writerConfiguration'];

        self::assertTrue($writerConfig[LogLevel::DEBUG][FileWriter::class]['disabled']);
        self::assertTrue($writerConfig[LogLevel::INFO][FileWriter::class]['disabled']);
        self::assertTrue($writerConfig[LogLevel::NOTICE][FileWriter::class]['disabled']);
        self::assertTrue($writerConfig[LogLevel::WARNING][FileWriter::class]['disabled']);
    }

    #[Test]
    public function configureLoggingThresholdsEnablesMinLevelAndAbove(): void
    {
        $this->subject->configureLoggingThresholds(LogLevel::ERROR);

        $writerConfig = $GLOBALS['TYPO3_CONF_VARS']['LOG']['writerConfiguration'];

        self::assertFalse($writerConfig[LogLevel::ERROR][FileWriter::class]['disabled']);
        self::assertFalse($writerConfig[LogLevel::CRITICAL][FileWriter::class]['disabled']);
        self::assertFalse($writerConfig[LogLevel::ALERT][FileWriter::class]['disabled']);
        self::assertFalse($writerConfig[LogLevel::EMERGENCY][FileWriter::class]['disabled']);
    }

    #[Test]
    public function configureLoggingThresholdsWithWarningSetsCorrectBoundary(): void
    {
        $this->subject->configureLoggingThresholds(LogLevel::WARNING);

        $writerConfig = $GLOBALS['TYPO3_CONF_VARS']['LOG']['writerConfiguration'];

        self::assertTrue($writerConfig[LogLevel::DEBUG][FileWriter::class]['disabled']);
        self::assertTrue($writerConfig[LogLevel::INFO][FileWriter::class]['disabled']);
        self::assertTrue($writerConfig[LogLevel::NOTICE][FileWriter::class]['disabled']);
        self::assertFalse($writerConfig[LogLevel::WARNING][FileWriter::class]['disabled']);
        self::assertFalse($writerConfig[LogLevel::ERROR][FileWriter::class]['disabled']);
    }

    #[Test]
    public function configureLoggingThresholdsAppliesNamespaceOverride(): void
    {
        $this->subject->configureLoggingThresholds(
            LogLevel::ERROR,
            ['Maispace' => LogLevel::WARNING],
        );

        $namespaceLog = $GLOBALS['TYPO3_CONF_VARS']['LOG']['Maispace'] ?? null;

        self::assertIsArray($namespaceLog);
        self::assertArrayHasKey('writerConfiguration', $namespaceLog);
        self::assertArrayHasKey(LogLevel::WARNING, $namespaceLog['writerConfiguration']);
    }

    #[Test]
    public function configureLoggingThresholdsWithUnknownLevelFallsBackToError(): void
    {
        $this->subject->configureLoggingThresholds('invalid-level');

        $writerConfig = $GLOBALS['TYPO3_CONF_VARS']['LOG']['writerConfiguration'];

        self::assertTrue($writerConfig[LogLevel::DEBUG][FileWriter::class]['disabled']);
        self::assertTrue($writerConfig[LogLevel::WARNING][FileWriter::class]['disabled']);
        self::assertFalse($writerConfig[LogLevel::ERROR][FileWriter::class]['disabled']);
    }

    #[Test]
    public function configureLoggingThresholdsReturnsSelf(): void
    {
        $result = $this->subject->configureLoggingThresholds(LogLevel::ERROR);

        self::assertSame($this->subject, $result);
    }
}
