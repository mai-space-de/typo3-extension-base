<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait BehaviourTrait
{
    public function setBehaviour(array $behaviour): static
    {
        $this->config['behaviour'] = array_merge($this->config['behaviour'] ?? [], $behaviour);
        return $this;
    }

    public function setAllowLanguageSynchronization(bool $allow = true): static
    {
        return $this->setBehaviour(['allowLanguageSynchronization' => $allow]);
    }
}
