<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\BehaviourTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldControlTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldWizardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;

final class ImageManipulationConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'imageManipulation';

    use BehaviourTrait;
    use FieldControlTrait;
    use FieldInformationTrait;
    use FieldWizardTrait;
    use ReadOnlyTrait;

    public function setCropVariants(array $cropVariants): static
    {
        $this->config['cropVariants'] = $cropVariants;

        return $this;
    }

    public function setAllowedExtensions(string $extensions): static
    {
        $this->config['allowedExtensions'] = $extensions;

        return $this;
    }

    public function setFileField(string $field): static
    {
        $this->config['fileField'] = $field;

        return $this;
    }
}
