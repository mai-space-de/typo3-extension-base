<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SizeTrait;

final class NoneConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'none';

    use FieldInformationTrait;
    use SizeTrait;

    public function setFormat(string $format): static
    {
        $this->config['format'] = $format;

        return $this;
    }
}
