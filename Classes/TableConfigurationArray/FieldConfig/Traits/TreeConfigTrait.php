<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait TreeConfigTrait
{
    public function setTreeConfig(array $treeConfig): static
    {
        $this->config['treeConfig'] = $treeConfig;
        return $this;
    }
}
