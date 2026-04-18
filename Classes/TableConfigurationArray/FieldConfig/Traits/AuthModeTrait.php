<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait AuthModeTrait
{
    public function setAuthMode(string $authMode): static
    {
        $this->config['authMode'] = $authMode;
        return $this;
    }
}
