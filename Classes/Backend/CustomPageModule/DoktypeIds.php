<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Backend\CustomPageModule;

/**
 * Reserved custom page doktype numbers for this project.
 *
 * Spike (2026-10-24): Core uses 1, 3, 4, 6, 7, 199, 254. Project DB only had 1, 199, 254.
 * 120/121 are free and documented for Content (News/Events) and Discovery.
 */
final class DoktypeIds
{
    public const NEWS = 120;

    public const EVENT = 121;

    /**
     * @return list<int>
     */
    public static function all(): array
    {
        return [
            self::NEWS,
            self::EVENT,
        ];
    }

    public static function isReserved(int $doktype): bool
    {
        return in_array($doktype, self::all(), true);
    }
}
