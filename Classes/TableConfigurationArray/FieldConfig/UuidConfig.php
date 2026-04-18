<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\EnableCopyToClipboardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\RequiredTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SearchableTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SizeTrait;

final class UuidConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'uuid';

    use EnableCopyToClipboardTrait;
    use FieldInformationTrait;
    use ReadOnlyTrait;
    use RequiredTrait;
    use SearchableTrait;
    use SizeTrait;

    public function setVersion(int $version): static
    {
        $this->config['version'] = $version;

        return $this;
    }
}
