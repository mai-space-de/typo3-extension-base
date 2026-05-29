<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Hook;

use TYPO3\CMS\Core\DataHandling\DataHandler;
use TYPO3\CMS\Extbase\Service\CacheService;

/**
 * DataHandler hook that flushes TYPO3 page cache tags for list/detail plugins
 * whenever a watched record table is saved or deleted in the backend.
 *
 * Delegates to Extbase CacheService so the same tags are flushed that Extbase
 * registers during frontend rendering ({table}_pid_{storagePage}, {table}_{uid},
 * pageId_{storagePage}).
 *
 * Backend saves bypass Extbase persistence, so this hook bridges the gap left
 * by enableAutomaticCacheClearing when editors use TCA forms directly.
 */
abstract class AbstractRecordCacheInvalidationHook
{
    public function __construct(
        protected readonly CacheService $cacheService,
    ) {}

    abstract protected function getWatchedTable(): string;

    public function processDatamap_afterDatabaseOperations(
        string $status,
        string $table,
        int|string $id,
        array $fieldArray,
        DataHandler $dataHandler,
    ): void {
        if ($table !== $this->getWatchedTable()) {
            return;
        }

        $uid = $this->resolveRecordUid($status, $id, $dataHandler);
        if ($uid <= 0) {
            return;
        }

        $this->flushCachesForRecord($table, $uid);
    }

    public function processCmdmap_deleteAction(
        string $table,
        int $id,
        array $recordToDelete,
        bool &$recordWasDeleted,
        DataHandler $dataHandler,
    ): void {
        if ($table !== $this->getWatchedTable() || $id <= 0) {
            return;
        }

        $this->flushCachesForRecord($table, $id);
    }

    protected function flushCachesForRecord(string $table, int $uid): void
    {
        $this->cacheService->clearCacheForRecord($table, $uid);
        $this->cacheService->clearCachesOfRegisteredPageIds();
    }

    private function resolveRecordUid(string $status, int|string $id, DataHandler $dataHandler): int
    {
        if ($status === 'new') {
            return (int) ($dataHandler->substNEWwithIDs[$id] ?? 0);
        }

        return (int) $id;
    }
}
