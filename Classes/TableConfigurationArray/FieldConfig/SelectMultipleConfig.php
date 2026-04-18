<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\AuthModeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\AutoSizeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\BehaviourTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\DbFieldLengthTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\DefaultValueTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldControlTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldWizardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FileFolderConfigTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ForeignTableTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ItemsProcessorsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ItemsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MinMaxItemsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MmTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MultipleTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\RequiredTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SizeTrait;

final class SelectMultipleConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'select';

    use AuthModeTrait;
    use AutoSizeTrait;
    use BehaviourTrait;
    use DbFieldLengthTrait;
    use DefaultValueTrait;
    use FieldControlTrait;
    use FieldInformationTrait;
    use FieldWizardTrait;
    use FileFolderConfigTrait;
    use ForeignTableTrait;
    use ItemsProcessorsTrait;
    use ItemsTrait;
    use MinMaxItemsTrait;
    use MmTrait;
    use MultipleTrait;
    use ReadOnlyTrait;
    use RequiredTrait;
    use SizeTrait;

    public function __construct()
    {
        parent::__construct();
        $this->config['renderType'] = 'selectMultipleSideBySide';
    }

    public function setAllowNonIdValues(bool $allow = true): static
    {
        $this->config['allowNonIdValues'] = $allow;

        return $this;
    }

    public function setDisableNonMatchingValueElement(bool $disable = true): static
    {
        $this->config['disableNonMatchingValueElement'] = $disable;

        return $this;
    }

    public function setExclusiveKeys(string $keys): static
    {
        $this->config['exclusiveKeys'] = $keys;

        return $this;
    }

    public function setMultiSelectFilterItems(array $items): static
    {
        $this->config['multiSelectFilterItems'] = $items;

        return $this;
    }
}
