<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;

final class LanguageConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'language';

    use ReadOnlyTrait;
}
