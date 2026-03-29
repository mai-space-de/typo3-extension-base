<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\Traits;

trait EnableFieldsTrait
{
    public function setEditLockField(string $field): self
    {
        $this->config['ctrl']['enablecolumns']['editlock'] = $field;

        return $this;
    }

    public function setDisabledField(string $field): self
    {
        $this->config['ctrl']['enablecolumns']['disabled'] = $field;

        return $this;
    }

    public function setStarttimeField(string $field): self
    {
        $this->config['ctrl']['enablecolumns']['starttime'] = $field;

        return $this;
    }

    public function setEndtimeField(string $field): self
    {
        $this->config['ctrl']['enablecolumns']['endtime'] = $field;

        return $this;
    }

    public function setFeGroupField(string $field): self
    {
        $this->config['ctrl']['enablecolumns']['fe_group'] = $field;

        return $this;
    }

    public function setDefaultEnabledFields(): self
    {
        $this->config['ctrl']['enablecolumns']['disabled'] = 'hidden';
        $this->config['ctrl']['enablecolumns']['starttime'] = 'starttime';
        $this->config['ctrl']['enablecolumns']['endtime'] = 'endtime';
        $this->config['ctrl']['enablecolumns']['fe_group'] = 'fe_group';

        return $this;
    }
}
