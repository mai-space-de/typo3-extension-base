<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Backend\CustomPageModule;

final readonly class CustomPageModuleDefinition
{
    /**
     * @param list<int> $doktypes
     * @param list<int> $pids Parent page UIDs used as list roots (empty = site setting / webmounts)
     */
    public function __construct(
        public string $key,
        public string $identifier,
        public string $title,
        public string $parent,
        public int $sorting,
        public array $doktypes,
        public array $pids,
        public string $icon = '',
        public string $iconIdentifier = '',
        public string $parentPidSetting = '',
    ) {}
}
