<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait MultipleTrait
{
    public function setMultiple(bool $multiple = true): static
    {
        $this->config['multiple'] = $multiple;
        return $this;
    }
}
