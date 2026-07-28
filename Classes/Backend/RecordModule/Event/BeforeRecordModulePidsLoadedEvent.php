<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Backend\RecordModule\Event;

final class BeforeRecordModulePidsLoadedEvent
{
    /**
     * @param list<int> $pids
     */
    public function __construct(
        private array $pids,
        private readonly string $table,
    ) {}

    /**
     * @return list<int>
     */
    public function getPids(): array
    {
        return $this->pids;
    }

    /**
     * @param list<int> $pids
     */
    public function setPids(array $pids): void
    {
        $this->pids = $pids;
    }

    public function getTable(): string
    {
        return $this->table;
    }
}
