<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait MmTrait
{
    public function setMm(string $mm): static
    {
        $this->config['MM'] = $mm;
        return $this;
    }

    public function setMmOppositeField(string $oppositeField): static
    {
        $this->config['MM_opposite_field'] = $oppositeField;
        return $this;
    }

    public function setMmMatchFields(array $matchFields): static
    {
        $this->config['MM_match_fields'] = $matchFields;
        return $this;
    }
}
