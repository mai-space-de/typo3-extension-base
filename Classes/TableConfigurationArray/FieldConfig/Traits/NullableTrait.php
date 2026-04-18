<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait NullableTrait
{
    public function setNullable(bool $nullable = true): static
    {
        $this->config['nullable'] = $nullable;
        return $this;
    }
}
