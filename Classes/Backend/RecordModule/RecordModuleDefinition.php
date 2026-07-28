<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Backend\RecordModule;

final readonly class RecordModuleDefinition
{
    /**
     * @param list<int> $pids
     */
    public function __construct(
        public string $table,
        public string $identifier,
        public string $title,
        public string $parent,
        public int $sorting,
        public array $pids,
        public string $icon = '',
        public string $iconIdentifier = '',
    ) {}
}
