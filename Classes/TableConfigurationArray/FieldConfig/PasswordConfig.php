<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\AutocompleteTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\BehaviourTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\DefaultValueTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldControlTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldWizardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ModeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\NullableTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\PlaceholderTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\RequiredTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SizeTrait;

final class PasswordConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'password';

    use AutocompleteTrait;
    use BehaviourTrait;
    use DefaultValueTrait;
    use FieldControlTrait;
    use FieldInformationTrait;
    use FieldWizardTrait;
    use ModeTrait;
    use NullableTrait;
    use PlaceholderTrait;
    use ReadOnlyTrait;
    use RequiredTrait;
    use SizeTrait;

    public function setHashed(bool $hashed = true): static
    {
        $this->config['hashed'] = $hashed;

        return $this;
    }

    public function setPasswordPolicy(string $policy): static
    {
        $this->config['passwordPolicy'] = $policy;

        return $this;
    }

    public function setPasswordGenerator(array $generator): static
    {
        $this->config['passwordGenerator'] = $generator;

        return $this;
    }
}
