<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\DefaultValueTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\RequiredTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SizeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SortItemsTrait;

final class CountryConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'country';

    use DefaultValueTrait;
    use ReadOnlyTrait;
    use RequiredTrait;
    use SizeTrait;
    use SortItemsTrait;

    public function setFilter(array $filter): static
    {
        $this->config['filter'] = $filter;

        return $this;
    }

    public function setLabelField(string $field): static
    {
        $this->config['labelField'] = $field;

        return $this;
    }

    public function setPrioritizedCountries(array $isoCodes): static
    {
        $this->config['prioritizedCountries'] = $isoCodes;

        return $this;
    }
}
