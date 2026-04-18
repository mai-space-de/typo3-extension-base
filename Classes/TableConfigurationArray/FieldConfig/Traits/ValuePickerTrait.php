<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait ValuePickerTrait
{
    public function setValuePickerItems(array $items): static
    {
        $this->config['valuePicker'] = ['items' => $items];
        return $this;
    }
}
