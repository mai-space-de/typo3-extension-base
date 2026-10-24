<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Icon;

use Maispace\MaiBase\Icon\AllIconsCatalog;
use Maispace\MaiBase\Icon\StreamlineSvgIconProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class AllIconsCatalogTest extends TestCase
{
    #[Test]
    public function identifierFromFilenameStripsStreamlineSuffixAndNormalizesSpaces(): void
    {
        $identifier = AllIconsCatalog::identifierFromFilename(
            'entertainment-news-paper--newspaper-periodical-fold-content 2--Streamline-Core.svg',
        );

        self::assertSame(
            'entertainment-news-paper--newspaper-periodical-fold-content-2',
            $identifier,
        );
    }

    #[Test]
    public function identifierFromFilenameLowercasesMixedCaseFilenames(): void
    {
        $identifier = AllIconsCatalog::identifierFromFilename(
            'Interface-file-text--text-common-file--Streamline-Core.svg',
        );

        self::assertSame('interface-file-text--text-common-file', $identifier);
    }

    #[Test]
    public function iconRegistryEntriesRegisterEverySvg(): void
    {
        $directory = AllIconsCatalog::absoluteDirectory();
        self::assertDirectoryExists($directory);

        $svgCount = count(glob($directory . '/*.svg') ?: []);
        self::assertGreaterThan(0, $svgCount);

        $entries = AllIconsCatalog::iconRegistryEntries();
        self::assertCount($svgCount, $entries);

        foreach ($entries as $identifier => $entry) {
            self::assertNotSame('', $identifier);
            self::assertSame(StreamlineSvgIconProvider::class, $entry['provider']);
            self::assertStringStartsWith(AllIconsCatalog::ICON_PATH, $entry['source']);
            self::assertStringEndsWith('.svg', $entry['source']);
            $filename = substr($entry['source'], strlen(AllIconsCatalog::ICON_PATH));
            self::assertFileExists($directory . '/' . $filename);
            self::assertSame($identifier, AllIconsCatalog::identifierFromFilename($filename));
        }
    }
}
