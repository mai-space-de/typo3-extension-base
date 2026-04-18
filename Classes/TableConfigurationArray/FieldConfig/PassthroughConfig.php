<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\DefaultValueTrait;

final class PassthroughConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'passthrough';

    use DefaultValueTrait;
}
