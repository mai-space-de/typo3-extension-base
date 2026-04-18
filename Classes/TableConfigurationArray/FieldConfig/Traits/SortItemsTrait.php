<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait SortItemsTrait
{
    public function setSortItems(array $sortItems): static
    {
        $this->config['sortItems'] = $sortItems;
        return $this;
    }
}
