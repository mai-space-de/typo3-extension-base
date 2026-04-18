<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait SoftRefTrait
{
    public function setSoftref(string $softref): static
    {
        $this->config['softref'] = $softref;
        return $this;
    }
}
