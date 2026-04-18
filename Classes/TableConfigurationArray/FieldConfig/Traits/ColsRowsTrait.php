<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait ColsRowsTrait
{
    public function setCols(int $cols): static
    {
        $this->config['cols'] = $cols;
        return $this;
    }

    public function setRows(int $rows): static
    {
        $this->config['rows'] = $rows;
        return $this;
    }
}
