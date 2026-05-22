<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SizeTrait;

final class NoneConfig extends AbstractFieldConfig
{
    use FieldInformationTrait;
    use SizeTrait;
    protected const string TYPE = 'none';

    public function setFormat(string $format): static
    {
        $this->config['format'] = $format;

        return $this;
    }
}
