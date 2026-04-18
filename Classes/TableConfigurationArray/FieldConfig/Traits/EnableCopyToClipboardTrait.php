<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait EnableCopyToClipboardTrait
{
    public function setEnableCopyToClipboard(bool $enable = true): static
    {
        $this->config['enableCopyToClipboard'] = $enable;
        return $this;
    }
}
