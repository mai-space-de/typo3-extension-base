<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\Traits;

trait VersioningTrait
{
    public function enableVersioning(bool $enable = true): self
    {
        $this->config['ctrl']['versioningWS'] = $enable;

        return $this;
    }

    public function alwaysAllowLiveEditing(bool $allow = true): self
    {
        $this->config['ctrl']['versioningWS_alwaysAllowLiveEdit'] = $allow;

        return $this;
    }
}
