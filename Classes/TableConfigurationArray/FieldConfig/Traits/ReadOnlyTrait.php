<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait ReadOnlyTrait
{
    public function setReadOnly(bool $readOnly = true): static
    {
        $this->config['readOnly'] = $readOnly;
        return $this;
    }
}
