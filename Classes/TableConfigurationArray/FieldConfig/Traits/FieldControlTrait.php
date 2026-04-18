<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait FieldControlTrait
{
    public function setFieldControl(array $fieldControl): static
    {
        $this->config['fieldControl'] = $fieldControl;
        return $this;
    }
}
