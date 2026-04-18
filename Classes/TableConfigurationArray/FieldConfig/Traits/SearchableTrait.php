<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait SearchableTrait
{
    public function setSearchable(bool $searchable = true): static
    {
        $this->config['searchable'] = $searchable;
        return $this;
    }
}
