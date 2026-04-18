<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\AutoSizeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\BehaviourTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldControlTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldWizardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MinMaxItemsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MultipleTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SizeTrait;

final class FolderConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'folder';

    use AutoSizeTrait;
    use BehaviourTrait;
    use FieldControlTrait;
    use FieldInformationTrait;
    use FieldWizardTrait;
    use MinMaxItemsTrait;
    use MultipleTrait;
    use ReadOnlyTrait;
    use SizeTrait;

    public function setElementBrowserEntryPoints(array $entryPoints): static
    {
        $this->config['elementBrowserEntryPoints'] = $entryPoints;

        return $this;
    }

    public function setHideDeleteIcon(bool $hide = true): static
    {
        $this->config['hideDeleteIcon'] = $hide;

        return $this;
    }

    public function setHideMoveIcons(bool $hide = true): static
    {
        $this->config['hideMoveIcons'] = $hide;

        return $this;
    }
}
