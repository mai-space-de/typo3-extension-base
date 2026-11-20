<?php

declare(strict_types=1);

namespace Maispace\MaiBase\EventListener;

use TYPO3\CMS\Core\Configuration\Event\AfterTcaCompilationEvent;

/**
 * Shows the HTTP password protection palette on the "Access" tab of every page type.
 *
 * Runs after all TCA overrides, so doktypes registered by later extensions
 * (which replace their showitem completely) get the palette too.
 */
final class AddBasicAuthPaletteToPageTypes
{
    public const string PALETTE = 'maiBaseBasicAuth';

    private const string ACCESS_PALETTE_PATTERN = '/--palette--;[^;,]*;access\b/';

    public function __invoke(AfterTcaCompilationEvent $event): void
    {
        $event->setTca($this->addPalette($event->getTca()));
    }

    /**
     * @param array<string, mixed> $tca
     * @return array<string, mixed>
     */
    public function addPalette(array $tca): array
    {
        if (!isset($tca['pages']['palettes'][self::PALETTE]) || !is_array($tca['pages']['types'] ?? null)) {
            return $tca;
        }
        $palette = '--palette--;;' . self::PALETTE;
        foreach ($tca['pages']['types'] as $type => $configuration) {
            $showitem = $configuration['showitem'] ?? null;
            if (!is_string($showitem) || str_contains($showitem, $palette)) {
                continue;
            }
            $updated = preg_replace(self::ACCESS_PALETTE_PATTERN, '$0, ' . $palette, $showitem, 1, $count);
            if ($updated !== null && $count > 0) {
                $tca['pages']['types'][$type]['showitem'] = $updated;
            }
        }

        return $tca;
    }
}
