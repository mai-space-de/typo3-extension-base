<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Environment;

interface ConfigProviderInterface
{
    public static function initialize(bool $applyDefaults = true): self;

    public static function get(): self;

    public function applyDefaults(): self;
}
