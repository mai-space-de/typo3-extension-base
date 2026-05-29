<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Hook;

use Maispace\MaiBase\Hook\AbstractRecordCacheInvalidationHook;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Core\DataHandling\DataHandler;
use TYPO3\CMS\Extbase\Service\CacheService;

final class AbstractRecordCacheInvalidationHookTest extends TestCase
{
    private CacheService&MockObject $cacheService;

    private DataHandler&MockObject $dataHandler;

    protected function setUp(): void
    {
        $this->cacheService = $this->createMock(CacheService::class);
        $this->dataHandler = $this->createMock(DataHandler::class);
    }

    #[Test]
    public function ignoredTableFlushesNoCacheTest(): void
    {
        $this->cacheService->expects(self::never())->method('clearCacheForRecord');
        $this->cacheService->expects(self::never())->method('clearCachesOfRegisteredPageIds');

        $this->makeHook()->processDatamap_afterDatabaseOperations(
            'update',
            'pages',
            42,
            [],
            $this->dataHandler,
        );
    }

    #[Test]
    public function updateOnWatchedTableFlushesExtbaseCacheTagsTest(): void
    {
        $this->cacheService->expects(self::once())->method('clearCacheForRecord')->with('tx_test_record', 42);
        $this->cacheService->expects(self::once())->method('clearCachesOfRegisteredPageIds');

        $this->makeHook()->processDatamap_afterDatabaseOperations(
            'update',
            'tx_test_record',
            42,
            ['title' => 'Updated'],
            $this->dataHandler,
        );
    }

    #[Test]
    public function newRecordResolvesUidFromDataHandlerTest(): void
    {
        $dataHandler = $this->createMock(DataHandler::class);
        $dataHandler->substNEWwithIDs = ['NEW12345' => 99];

        $this->cacheService->expects(self::once())->method('clearCacheForRecord')->with('tx_test_record', 99);
        $this->cacheService->expects(self::once())->method('clearCachesOfRegisteredPageIds');

        $this->makeHook()->processDatamap_afterDatabaseOperations(
            'new',
            'tx_test_record',
            'NEW12345',
            ['title' => 'Fresh record'],
            $dataHandler,
        );
    }

    #[Test]
    public function newRecordWithMissingUidFlushesNoCacheTest(): void
    {
        $this->cacheService->expects(self::never())->method('clearCacheForRecord');
        $this->cacheService->expects(self::never())->method('clearCachesOfRegisteredPageIds');

        $this->makeHook()->processDatamap_afterDatabaseOperations(
            'new',
            'tx_test_record',
            'NEW99',
            [],
            $this->dataHandler,
        );
    }

    #[Test]
    public function deleteOnWatchedTableFlushesExtbaseCacheTagsTest(): void
    {
        $recordWasDeleted = false;

        $this->cacheService->expects(self::once())->method('clearCacheForRecord')->with('tx_test_record', 7);
        $this->cacheService->expects(self::once())->method('clearCachesOfRegisteredPageIds');

        $this->makeHook()->processCmdmap_deleteAction(
            'tx_test_record',
            7,
            ['uid' => 7],
            $recordWasDeleted,
            $this->dataHandler,
        );
    }

    #[Test]
    public function deleteOnIgnoredTableFlushesNoCacheTest(): void
    {
        $recordWasDeleted = false;

        $this->cacheService->expects(self::never())->method('clearCacheForRecord');
        $this->cacheService->expects(self::never())->method('clearCachesOfRegisteredPageIds');

        $this->makeHook()->processCmdmap_deleteAction(
            'pages',
            7,
            ['uid' => 7],
            $recordWasDeleted,
            $this->dataHandler,
        );
    }

    private function makeHook(): AbstractRecordCacheInvalidationHook
    {
        return new class ($this->cacheService) extends AbstractRecordCacheInvalidationHook {
            protected function getWatchedTable(): string
            {
                return 'tx_test_record';
            }
        };
    }
}
