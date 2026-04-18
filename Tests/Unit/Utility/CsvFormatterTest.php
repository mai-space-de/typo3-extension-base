<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Utility;

use Maispace\MaiBase\Utility\CsvFormatter;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class CsvFormatterTest extends TestCase
{
    #[Test]
    public function formatProducesUtf8BomByDefault(): void
    {
        $result = CsvFormatter::format([['a', 'b']]);

        self::assertStringStartsWith("\xEF\xBB\xBF", $result);
    }

    #[Test]
    public function formatOmitsBomWhenDisabled(): void
    {
        $result = CsvFormatter::format([['a', 'b']], includeUtf8Bom: false);

        self::assertStringStartsNotWith("\xEF\xBB\xBF", $result);
    }

    #[Test]
    public function formatUsesDefaultSemicolonSeparator(): void
    {
        $result = CsvFormatter::format([['foo', 'bar']], includeUtf8Bom: false);

        self::assertStringContainsString('foo;bar', $result);
    }

    #[Test]
    public function formatUsesCustomSeparator(): void
    {
        $result = CsvFormatter::format([['foo', 'bar']], separator: ',', includeUtf8Bom: false);

        self::assertStringContainsString('foo,bar', $result);
    }

    #[Test]
    public function formatProducesOneLinePerRow(): void
    {
        $rows = [['h1', 'h2'], ['v1', 'v2'], ['v3', 'v4']];
        $result = CsvFormatter::format($rows, includeUtf8Bom: false);
        $lines = array_filter(explode("\n", trim($result)));

        self::assertCount(3, $lines);
    }

    #[Test]
    public function formatReturnsEmptyStringForEmptyInput(): void
    {
        $result = CsvFormatter::format([], includeUtf8Bom: false);

        self::assertSame('', $result);
    }
}
