<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait AllowedFileTypesTrait
{
    public function setAllowed(string $allowed): static
    {
        $this->config['allowed'] = $allowed;
        return $this;
    }

    public function setDisallowed(string $disallowed): static
    {
        $this->config['disallowed'] = $disallowed;
        return $this;
    }
}
