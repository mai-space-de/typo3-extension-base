<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait SizeTrait
{
    public function setSize(int $size): static
    {
        $this->config['size'] = $size;
        return $this;
    }
}
