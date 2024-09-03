<?php

namespace Maispace\Base\RegistrationHelper;

class Palette
{
    public function __construct(
        private readonly string $tableName,
        private readonly string $paletteName,
        private readonly string $label
    )
    {}


}
