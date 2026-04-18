<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait ItemsTrait
{
    public function setItems(array $items): static
    {
        $this->config['items'] = $items;
        return $this;
    }
}
