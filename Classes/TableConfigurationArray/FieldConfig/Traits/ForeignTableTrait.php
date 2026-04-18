<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait ForeignTableTrait
{
    public function setForeignTable(string $foreignTable): static
    {
        $this->config['foreign_table'] = $foreignTable;
        return $this;
    }

    public function setForeignField(string $foreignField): static
    {
        $this->config['foreign_field'] = $foreignField;
        return $this;
    }

    public function setForeignSortby(string $foreignSortby): static
    {
        $this->config['foreign_sortby'] = $foreignSortby;
        return $this;
    }

    public function setForeignLabel(string $foreignLabel): static
    {
        $this->config['foreign_label'] = $foreignLabel;
        return $this;
    }

    public function setForeignTablePrefix(string $foreignTablePrefix): static
    {
        $this->config['foreign_table_prefix'] = $foreignTablePrefix;
        return $this;
    }

    public function setForeignTableWhere(string $foreignTableWhere): static
    {
        $this->config['foreign_table_where'] = $foreignTableWhere;
        return $this;
    }

    public function setForeignTableItemGroup(string $foreignTableItemGroup): static
    {
        $this->config['foreign_table_item_group'] = $foreignTableItemGroup;
        return $this;
    }
}
