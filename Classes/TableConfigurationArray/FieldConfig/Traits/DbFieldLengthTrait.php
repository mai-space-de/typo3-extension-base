<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait DbFieldLengthTrait
{
    public function setDbFieldLength(int $length): static
    {
        $this->config['dbFieldLength'] = $length;
        return $this;
    }
}
