<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Icon;

use TYPO3\CMS\Core\Imaging\Icon;
use TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider;

/**
 * SvgIconProvider for Streamline icons: always emit inline SVG markup so
 * currentColor / dark-mode backend styling applies (TYPO3 v14).
 */
final class StreamlineSvgIconProvider extends SvgIconProvider
{
    protected function generateMarkup(Icon $icon, array $options): string
    {
        // Prefer inline over <img> so CSS color tokens reach the geometry.
        return $this->generateInlineMarkup($options);
    }

    protected function generateInlineMarkup(array $options): string
    {
        return StreamlineSvgNormalizer::normalize(parent::generateInlineMarkup($options));
    }
}
