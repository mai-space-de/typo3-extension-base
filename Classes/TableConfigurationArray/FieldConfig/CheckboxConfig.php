<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\BehaviourTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\DefaultValueTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\EvalTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldWizardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ItemsProcessorsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ItemsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\RenderTypeTrait;

final class CheckboxConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'check';

    use BehaviourTrait;
    use DefaultValueTrait;
    use EvalTrait;
    use FieldInformationTrait;
    use FieldWizardTrait;
    use ItemsProcessorsTrait;
    use ItemsTrait;
    use ReadOnlyTrait;
    use RenderTypeTrait;

    public function setColumns(int $cols): static
    {
        $this->config['cols'] = $cols;

        return $this;
    }

    public function setInvertStateDisplay(bool $invert = true): static
    {
        $this->config['invertStateDisplay'] = $invert;

        return $this;
    }

    public function setValidation(array $validation): static
    {
        $this->config['validation'] = $validation;

        return $this;
    }
}
