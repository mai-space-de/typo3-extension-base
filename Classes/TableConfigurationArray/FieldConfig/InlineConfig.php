<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\AppearanceTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\AutoSizeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\BehaviourTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldWizardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ForeignTableTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MinMaxItemsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MmTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\OverrideChildTcaTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SizeTrait;

final class InlineConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'inline';

    use AppearanceTrait;
    use AutoSizeTrait;
    use BehaviourTrait;
    use FieldInformationTrait;
    use FieldWizardTrait;
    use ForeignTableTrait;
    use MinMaxItemsTrait;
    use MmTrait;
    use OverrideChildTcaTrait;
    use ReadOnlyTrait;
    use SizeTrait;

    public function setForeignDefaultSortby(string $sorting): static
    {
        $this->config['foreign_default_sortby'] = $sorting;

        return $this;
    }

    public function setForeignMatchFields(array $fields): static
    {
        $this->config['foreign_match_fields'] = $fields;

        return $this;
    }

    public function setForeignSelector(string $field): static
    {
        $this->config['foreign_selector'] = $field;

        return $this;
    }

    public function setForeignTableField(string $field): static
    {
        $this->config['foreign_table_field'] = $field;

        return $this;
    }

    public function setForeignUnique(string $field): static
    {
        $this->config['foreign_unique'] = $field;

        return $this;
    }

    public function setSymmetricField(string $field): static
    {
        $this->config['symmetric_field'] = $field;

        return $this;
    }

    public function setSymmetricLabel(string $field): static
    {
        $this->config['symmetric_label'] = $field;

        return $this;
    }

    public function setSymmetricSortby(string $field): static
    {
        $this->config['symmetric_sortby'] = $field;

        return $this;
    }

    public function setFilter(array $filter): static
    {
        $this->config['filter'] = $filter;

        return $this;
    }

    public function setCustomControls(array $controls): static
    {
        $this->config['customControls'] = $controls;

        return $this;
    }

    public function enableSortable(bool $enable = true): static
    {
        $this->config['appearance']['useSortable'] = $enable;

        return $this;
    }

    public function enableNewRecordLinkAddTitle(bool $enable = true): static
    {
        $this->config['appearance']['newRecordLinkAddTitle'] = $enable;

        return $this;
    }

    public function setLevelLinksPosition(string $position): static
    {
        $this->config['appearance']['levelLinksPosition'] = $position;

        return $this;
    }
}
