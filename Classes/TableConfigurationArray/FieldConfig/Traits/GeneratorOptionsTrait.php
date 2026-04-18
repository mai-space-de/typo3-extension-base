<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait GeneratorOptionsTrait
{
    public function setGeneratorOptions(array $generatorOptions): static
    {
        $this->config['generatorOptions'] = $generatorOptions;
        return $this;
    }
}
