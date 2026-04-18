<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\BehaviourTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ColsRowsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\DefaultValueTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\EvalTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldControlTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldInformationTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\FieldWizardTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MaxLengthTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\NullableTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\PlaceholderTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\RenderTypeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\RequiredTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SearchableTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SizeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SoftRefTrait;

final class TextConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'text';

    use BehaviourTrait;
    use ColsRowsTrait;
    use DefaultValueTrait;
    use EvalTrait;
    use FieldControlTrait;
    use FieldInformationTrait;
    use FieldWizardTrait;
    use MaxLengthTrait;
    use NullableTrait;
    use PlaceholderTrait;
    use ReadOnlyTrait;
    use RenderTypeTrait;
    use RequiredTrait;
    use SearchableTrait;
    use SizeTrait;
    use SoftRefTrait;

    public function enableRte(bool $enable = true): static
    {
        $this->config['enableRichtext'] = $enable;

        return $this;
    }

    public function setRichtextConfiguration(string $configuration): static
    {
        $this->config['richtextConfiguration'] = $configuration;

        return $this;
    }

    public function enableTabulator(bool $enable = true): static
    {
        $this->config['enableTabulator'] = $enable;

        return $this;
    }

    public function enableFixedFont(bool $enable = true): static
    {
        $this->config['fixedFont'] = $enable;

        return $this;
    }

    public function setWrap(string $wrap): static
    {
        $this->config['wrap'] = $wrap;

        return $this;
    }

    public function setIsIn(string $chars): static
    {
        $this->config['is_in'] = $chars;

        return $this;
    }
}
