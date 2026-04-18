<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\BehaviourTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldWizardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SearchableTrait;

final class FlexConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'flex';

    use BehaviourTrait;
    use FieldInformationTrait;
    use FieldWizardTrait;
    use ReadOnlyTrait;
    use SearchableTrait;

    public function setDataStructureIdentifier(string $identifier): static
    {
        $this->config['dsPointerField'] = $identifier;

        return $this;
    }

    public function addDataStructure(string $key, string $path): static
    {
        $this->config['ds'][$key] = $path;

        return $this;
    }
}
