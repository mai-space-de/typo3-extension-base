<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait MaxLengthTrait
{
    public function setMax(int $max): static
    {
        $this->config['max'] = $max;
        return $this;
    }

    public function setMin(int $min): static
    {
        $this->config['min'] = $min;
        return $this;
    }
}
