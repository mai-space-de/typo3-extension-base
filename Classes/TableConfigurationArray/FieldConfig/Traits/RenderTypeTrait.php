<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait RenderTypeTrait
{
    public function setRenderType(string $renderType): static
    {
        $this->config['renderType'] = $renderType;
        return $this;
    }
}
