<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait EvalTrait
{
    public function setEval(string $eval): static
    {
        $this->config['eval'] = $eval;
        return $this;
    }
}
