<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray;

class Palette
{
    public function __construct(
        private readonly string $tableName,
        private readonly string $paletteName,
        private readonly string $label
    ) {
    }

    public function override(string $showItem): void
    {
        Helper::overridePalette($this->tableName, $this->paletteName, $this->label, $showItem);
    }
}
