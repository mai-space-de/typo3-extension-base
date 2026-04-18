<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait ModeTrait
{
    public function setMode(string $mode): static
    {
        $this->config['mode'] = $mode;
        return $this;
    }
}
