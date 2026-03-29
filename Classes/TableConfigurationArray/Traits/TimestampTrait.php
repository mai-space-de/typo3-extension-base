<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\Traits;

trait TimestampTrait
{
    public function setCreationDateField(string $field = 'crdate'): self
    {
        $this->config['ctrl']['crdate'] = $field;

        return $this;
    }

    public function setModifiedDateField(string $field = 'tstamp'): self
    {
        $this->config['ctrl']['tstamp'] = $field;

        return $this;
    }

    public function setDefaultStampFields(): self
    {
        $this->setCreationDateField();
        $this->setModifiedDateField();
        $this->setOriginalField();

        return $this;
    }
}
