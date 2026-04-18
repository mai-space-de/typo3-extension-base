<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait AppearanceTrait
{
    public function setAppearance(array $appearance): static
    {
        $this->config['appearance'] = array_merge($this->config['appearance'] ?? [], $appearance);
        return $this;
    }
}
