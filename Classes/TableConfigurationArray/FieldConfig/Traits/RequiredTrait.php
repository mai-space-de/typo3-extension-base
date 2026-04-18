<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait RequiredTrait
{
    public function setRequired(bool $required = true): static
    {
        $this->config['required'] = $required;
        return $this;
    }
}
