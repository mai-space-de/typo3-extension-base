<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\AppearanceTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\EvalTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\GeneratorOptionsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SearchableTrait;

final class SlugConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'slug';

    use AppearanceTrait;
    use EvalTrait;
    use GeneratorOptionsTrait;
    use ReadOnlyTrait;
    use SearchableTrait;

    public function setFallbackCharacter(string $char): static
    {
        $this->config['fallbackCharacter'] = $char;

        return $this;
    }

    public function setPrependSlash(bool $prepend = true): static
    {
        $this->config['prependSlash'] = $prepend;

        return $this;
    }
}
