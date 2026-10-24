<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Icon;

use TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider;

/**
 * Registers every Streamline SVG under Resources/Public/Icons/all-icons/ with the Icon API.
 *
 * Identifier = filename without ".svg" and without the trailing "--Streamline-Core",
 * spaces normalized to hyphens, lowercased. Example:
 *   interface-content-book-open--content-books-book-open--Streamline-Core.svg
 *   → interface-content-book-open--content-books-book-open
 */
final class AllIconsCatalog
{
    public const ICON_PATH = 'EXT:mai_base/Resources/Public/Icons/all-icons/';

    /**
     * Absolute filesystem path to the all-icons directory.
     */
    public static function absoluteDirectory(): string
    {
        return dirname(__DIR__, 2) . '/Resources/Public/Icons/all-icons';
    }

    /**
     * Derive the Icon API identifier from an all-icons filename.
     */
    public static function identifierFromFilename(string $filename): string
    {
        $stem = pathinfo($filename, PATHINFO_FILENAME);
        $stem = str_replace(' ', '-', $stem);
        $stem = (string) preg_replace('/--Streamline-Core$/i', '', $stem);

        return strtolower($stem);
    }

    /**
     * @return array<string, array{provider: class-string, source: string}>
     */
    public static function iconRegistryEntries(): array
    {
        $directory = self::absoluteDirectory();
        if (!is_dir($directory)) {
            return [];
        }

        $entries = [];
        $paths = glob($directory . '/*.svg') ?: [];
        foreach ($paths as $absolutePath) {
            $filename = basename($absolutePath);
            $identifier = self::identifierFromFilename($filename);
            $entries[$identifier] = [
                'provider' => SvgIconProvider::class,
                'source' => self::ICON_PATH . $filename,
            ];
        }

        ksort($entries);

        return $entries;
    }
}
