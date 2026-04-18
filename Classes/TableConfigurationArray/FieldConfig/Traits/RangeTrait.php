<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait RangeTrait
{
    public function setRange(int|float $lower, int|float $upper): static
    {
        $this->config['range'] = ['lower' => $lower, 'upper' => $upper];
        return $this;
    }
}
