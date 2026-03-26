<?php

namespace Maispace\MaiBase\RegistrationHelper;

class Palette
{
    public function __construct(
        private readonly string $tableName,
        private readonly string $paletteName,
        private readonly string $label
    ) {
    }
}
