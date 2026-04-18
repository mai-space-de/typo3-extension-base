<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait ItemsProcessorsTrait
{
    public function setItemsProcessors(array $itemsProcessors): static
    {
        $this->config['itemsProcessors'] = $itemsProcessors;
        return $this;
    }

    public function setItemsProcFunc(string $itemsProcFunc): static
    {
        $this->config['itemsProcFunc'] = $itemsProcFunc;
        return $this;
    }
}
