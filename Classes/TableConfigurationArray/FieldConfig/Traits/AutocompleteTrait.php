<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait AutocompleteTrait
{
    public function setAutocomplete(bool $autocomplete = true): static
    {
        $this->config['autocomplete'] = $autocomplete;
        return $this;
    }
}
