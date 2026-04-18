<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait OverrideChildTcaTrait
{
    public function setOverrideChildTca(array $overrideChildTca): static
    {
        $this->config['overrideChildTca'] = $overrideChildTca;
        return $this;
    }
}
