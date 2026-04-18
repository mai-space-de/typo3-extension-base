<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\FieldConfig\Traits;

trait FileFolderConfigTrait
{
    public function setFileFolderConfig(array $fileFolderConfig): static
    {
        $this->config['fileFolderConfig'] = $fileFolderConfig;
        return $this;
    }
}
