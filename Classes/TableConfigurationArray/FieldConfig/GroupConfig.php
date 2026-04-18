<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\AllowedFileTypesTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\AutoSizeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\BehaviourTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\DefaultValueTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldControlTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldWizardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MinMaxItemsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MmTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MultipleTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\RequiredTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SizeTrait;

final class GroupConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'group';

    use AllowedFileTypesTrait;
    use AutoSizeTrait;
    use BehaviourTrait;
    use DefaultValueTrait;
    use FieldControlTrait;
    use FieldInformationTrait;
    use FieldWizardTrait;
    use MinMaxItemsTrait;
    use MmTrait;
    use MultipleTrait;
    use ReadOnlyTrait;
    use RequiredTrait;
    use SizeTrait;

    public function setFilter(array $filter): static
    {
        $this->config['filter'] = $filter;

        return $this;
    }

    public function setElementBrowserEntryPoints(array $entryPoints): static
    {
        $this->config['elementBrowserEntryPoints'] = $entryPoints;

        return $this;
    }

    public function setSuggestOptions(array $options): static
    {
        $this->config['suggestOptions'] = $options;

        return $this;
    }

    public function setHideDeleteIcon(bool $hide = true): static
    {
        $this->config['hideDeleteIcon'] = $hide;

        return $this;
    }

    public function setHideMoveIcons(bool $hide = true): static
    {
        $this->config['hideMoveIcons'] = $hide;

        return $this;
    }

    public function setHideSuggest(bool $hide = true): static
    {
        $this->config['hideSuggest'] = $hide;

        return $this;
    }

    public function setDontRemapTablesOnCopy(string $tables): static
    {
        $this->config['dontRemapTablesOnCopy'] = $tables;

        return $this;
    }

    public function setPrependTname(bool $prepend = true): static
    {
        $this->config['prependTname'] = $prepend;

        return $this;
    }

    public function setLocalizeReferencesAtParentLocalization(bool $localize = true): static
    {
        $this->config['localizeReferencesAtParentLocalization'] = $localize;

        return $this;
    }
}
