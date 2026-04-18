<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\DefaultValueTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ForeignTableTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MinMaxItemsTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\MmTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\ReadOnlyTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\SizeTrait;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits\TreeConfigTrait;

final class CategoryConfig extends AbstractFieldConfig
{
    protected const string TYPE = 'category';

    use DefaultValueTrait;
    use ForeignTableTrait;
    use MinMaxItemsTrait;
    use MmTrait;
    use ReadOnlyTrait;
    use SizeTrait;
    use TreeConfigTrait;

    public function setRelationship(string $relationship): static
    {
        $this->config['relationship'] = $relationship;

        return $this;
    }

    public function setExclusiveKeys(string $keys): static
    {
        $this->config['exclusiveKeys'] = $keys;

        return $this;
    }

    public function setItemGroups(array $groups): static
    {
        $this->config['itemGroups'] = $groups;

        return $this;
    }
}
