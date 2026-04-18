<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait AutoSizeTrait
{
    public function setAutoSizeMax(int $autoSizeMax): static
    {
        $this->config['autoSizeMax'] = $autoSizeMax;
        return $this;
    }
}
