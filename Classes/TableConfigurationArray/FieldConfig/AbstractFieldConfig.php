<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

abstract class AbstractFieldConfig implements FieldConfigInterface
{
    protected const string TYPE = '';

    protected array $config = [];

    public function __construct()
    {
        $this->config['type'] = static::TYPE;
    }

    public function toArray(): array
    {
        return $this->config;
    }
}
