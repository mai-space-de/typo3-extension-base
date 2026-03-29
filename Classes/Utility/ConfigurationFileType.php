<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Utility;

enum ConfigurationFileType: string
{
    case PHP = 'php';
    case YAML = 'yaml';
}
