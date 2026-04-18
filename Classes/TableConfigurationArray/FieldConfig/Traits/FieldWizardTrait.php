<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait FieldWizardTrait
{
    public function setFieldWizard(array $fieldWizard): static
    {
        $this->config['fieldWizard'] = $fieldWizard;
        return $this;
    }
}
