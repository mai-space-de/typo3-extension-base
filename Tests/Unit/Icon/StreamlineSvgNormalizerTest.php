<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Icon;

use Maispace\MaiBase\Icon\StreamlineSvgNormalizer;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class StreamlineSvgNormalizerTest extends TestCase
{
    #[Test]
    public function normalizeReplacesHardcodedInkWithCurrentColor(): void
    {
        $svg = <<<'SVG'
<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 1" stroke="#000001" stroke-linecap="round"/>
<path d="M2 2" fill="#000001"/>
</svg>
SVG;

        $normalized = StreamlineSvgNormalizer::normalize($svg);

        self::assertStringContainsString('stroke="currentColor"', $normalized);
        self::assertStringContainsString('fill="currentColor"', $normalized);
        self::assertStringNotContainsString('#000001', $normalized);
        self::assertStringNotContainsString('width="14"', $normalized);
        self::assertStringNotContainsString('height="14"', $normalized);
        self::assertStringContainsString('viewBox="0 0 14 14"', $normalized);
        self::assertStringContainsString('fill="none"', $normalized);
    }

    #[Test]
    public function normalizeLeavesClipPathWhiteFillIntact(): void
    {
        $svg = '<svg viewBox="0 0 14 14"><clipPath><rect width="14" height="14" fill="white"/></clipPath></svg>';

        $normalized = StreamlineSvgNormalizer::normalize($svg);

        self::assertStringContainsString('fill="white"', $normalized);
    }
}
