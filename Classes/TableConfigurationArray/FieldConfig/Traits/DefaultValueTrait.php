<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait DefaultValueTrait
{
    public function setDefault(mixed $default): static
    {
        $this->config['default'] = $default;
        return $this;
    }
}
