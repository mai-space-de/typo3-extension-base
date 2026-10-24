<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Icon;

/**
 * Adapt Streamline SVGs to TYPO3 v14 backend icon conventions:
 * currentColor primary stroke/fill, no fixed canvas size attributes.
 *
 * @see https://docs.typo3.org/m/typo3/reference-coreapi/main/en-us/ApiOverview/Icon/Index.html
 */
final class StreamlineSvgNormalizer
{
    /**
     * Hardcoded Streamline blacks that break light/dark backend schemes.
     *
     * @var list<string>
     */
    private const HARDCODED_INK = [
        '#000001',
        '#000000',
        '#000',
        'black',
        'rgb(0,0,0)',
        'rgb(0, 0, 0)',
        'rgba(0,0,0,1)',
        'rgba(0, 0, 0, 1)',
    ];

    public static function normalize(string $svg): string
    {
        if ($svg === '') {
            return '';
        }

        foreach (self::HARDCODED_INK as $ink) {
            $svg = str_ireplace('stroke="' . $ink . '"', 'stroke="currentColor"', $svg);
            $svg = str_ireplace("stroke='" . $ink . "'", "stroke='currentColor'", $svg);
            $svg = str_ireplace('fill="' . $ink . '"', 'fill="currentColor"', $svg);
            $svg = str_ireplace("fill='" . $ink . "'", "fill='currentColor'", $svg);
        }

        // Let .icon-size-* CSS control rendered size; keep viewBox for aspect ratio.
        $svg = (string) preg_replace(
            '/(<svg\b[^>]*?)\s+width="[^"]*"/i',
            '$1',
            $svg,
        );
        $svg = (string) preg_replace(
            '/(<svg\b[^>]*?)\s+height="[^"]*"/i',
            '$1',
            $svg,
        );

        return $svg;
    }

    /**
     * Normalize an SVG file in place. Returns true when the file content changed.
     */
    public static function normalizeFile(string $absolutePath): bool
    {
        if (!is_file($absolutePath)) {
            return false;
        }

        $original = file_get_contents($absolutePath);
        if ($original === false) {
            return false;
        }

        $normalized = self::normalize($original);
        if ($normalized === $original) {
            return false;
        }

        return file_put_contents($absolutePath, $normalized) !== false;
    }
}
