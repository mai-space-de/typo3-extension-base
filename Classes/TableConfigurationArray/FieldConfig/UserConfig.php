<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\RenderTypeTrait;

final class UserConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'user';

    use RenderTypeTrait;

    public function setParameters(array $parameters): static
    {
        $this->config['parameters'] = $parameters;

        return $this;
    }
}
