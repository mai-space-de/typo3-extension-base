<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait PlaceholderTrait
{
    public function setPlaceholder(string $placeholder): static
    {
        $this->config['placeholder'] = $placeholder;
        return $this;
    }
}
