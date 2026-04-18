<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\BehaviourTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\DbTypeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\DefaultValueTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldControlTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldWizardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ModeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\NullableTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\PlaceholderTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\RangeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\RequiredTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SearchableTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SoftRefTrait;

final class DatetimeConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'datetime';

    use BehaviourTrait;
    use DbTypeTrait;
    use DefaultValueTrait;
    use FieldControlTrait;
    use FieldInformationTrait;
    use FieldWizardTrait;
    use ModeTrait;
    use NullableTrait;
    use PlaceholderTrait;
    use RangeTrait;
    use ReadOnlyTrait;
    use RequiredTrait;
    use SearchableTrait;
    use SoftRefTrait;

    public function setFormat(string $format): static
    {
        $this->config['format'] = $format;

        return $this;
    }

    public function setDisableAgeDisplay(bool $disable = true): static
    {
        $this->config['disableAgeDisplay'] = $disable;

        return $this;
    }
}
