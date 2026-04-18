<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait DbTypeTrait
{
    public function setDbType(string $dbType): static
    {
        $this->config['dbType'] = $dbType;
        return $this;
    }
}
