<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\BehaviourTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\DefaultValueTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldControlTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldWizardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ItemsProcessorsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ItemsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;

final class RadioConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'radio';

    use BehaviourTrait;
    use DefaultValueTrait;
    use FieldControlTrait;
    use FieldInformationTrait;
    use FieldWizardTrait;
    use ItemsProcessorsTrait;
    use ItemsTrait;
    use ReadOnlyTrait;
}
