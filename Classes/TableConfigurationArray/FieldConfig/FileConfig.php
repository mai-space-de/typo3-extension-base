<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\AllowedFileTypesTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\AppearanceTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\BehaviourTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldWizardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MinMaxItemsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\OverrideChildTcaTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;

final class FileConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'file';

    use AllowedFileTypesTrait;
    use AppearanceTrait;
    use BehaviourTrait;
    use FieldInformationTrait;
    use FieldWizardTrait;
    use MinMaxItemsTrait;
    use OverrideChildTcaTrait;
    use ReadOnlyTrait;

    public function setCropVariants(array $cropVariants): static
    {
        $this->config['overrideChildTca']['columns']['crop']['config']['cropVariants'] = $cropVariants;

        return $this;
    }

    public function setImageOverlayPalette(bool $enable = true): static
    {
        $this->config['appearance']['imageoverlayPalette'] = (int) $enable;

        return $this;
    }
}
