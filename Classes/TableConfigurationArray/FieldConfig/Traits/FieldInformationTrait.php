<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait FieldInformationTrait
{
    public function setFieldInformation(array $fieldInformation): static
    {
        $this->config['fieldInformation'] = $fieldInformation;
        return $this;
    }
}
