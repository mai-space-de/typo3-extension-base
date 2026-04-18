<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait SliderTrait
{
    public function setSlider(array $slider): static
    {
        $this->config['slider'] = $slider;
        return $this;
    }
}
