<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Backend\CustomPageModule;

/**
 * Request-scoped doktype filter for DatabaseRecordList queries in custom page modules.
 */
final class CustomPageModuleListingContext
{
    /** @var list<int> */
    private array $doktypes = [];

    /**
     * @param list<int> $doktypes
     */
    public function activate(array $doktypes): void
    {
        $normalized = [];
        foreach ($doktypes as $doktype) {
            $normalized[] = (int) $doktype;
        }
        $this->doktypes = array_values(array_unique(array_filter(
            $normalized,
            static fn(int $doktype): bool => $doktype > 0,
        )));
    }

    public function clear(): void
    {
        $this->doktypes = [];
    }

    public function isActive(): bool
    {
        return $this->doktypes !== [];
    }

    /**
     * @return list<int>
     */
    public function getDoktypes(): array
    {
        return $this->doktypes;
    }
}
