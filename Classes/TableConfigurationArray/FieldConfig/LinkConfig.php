<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\AppearanceTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\AutocompleteTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\BehaviourTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\DefaultValueTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldControlTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldWizardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ModeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\NullableTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\PlaceholderTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\RequiredTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SearchableTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SizeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SoftRefTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ValuePickerTrait;

final class LinkConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'link';

    use AppearanceTrait;
    use AutocompleteTrait;
    use BehaviourTrait;
    use DefaultValueTrait;
    use FieldControlTrait;
    use FieldInformationTrait;
    use FieldWizardTrait;
    use ModeTrait;
    use NullableTrait;
    use PlaceholderTrait;
    use ReadOnlyTrait;
    use RequiredTrait;
    use SearchableTrait;
    use SizeTrait;
    use SoftRefTrait;
    use ValuePickerTrait;

    public function setAllowedTypes(array $types): static
    {
        $this->config['allowedTypes'] = $types;

        return $this;
    }
}
