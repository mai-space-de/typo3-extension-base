<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait MinMaxItemsTrait
{
    public function setMinItems(int $min): static
    {
        $this->config['minitems'] = $min;
        return $this;
    }

    public function setMaxItems(int $max): static
    {
        $this->config['maxitems'] = $max;
        return $this;
    }
}
