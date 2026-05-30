<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\EventListener;

use Maispace\MaiBase\EventListener\SmokeTestContentFilterListener;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Routing\PageArguments;
use TYPO3\CMS\Frontend\ContentObject\Event\ModifyRecordsAfterFetchingContentEvent;

final class SmokeTestContentFilterListenerTest extends TestCase
{
    #[Test]
    public function filtersPluginPageRecordsBySmokePluginParameter(): void
    {
        $GLOBALS['TYPO3_REQUEST'] = $this->createRequest(10002, ['smoke_plugin' => 'maifaq_list']);

        $event = new ModifyRecordsAfterFetchingContentEvent(
            [
                ['uid' => 1, 'CType' => 'maifaq_list'],
                ['uid' => 2, 'CType' => 'mainews_list'],
            ],
            '',
            0,
            0,
            false,
            false,
            [],
        );

        (new SmokeTestContentFilterListener())($event);

        self::assertSame(
            [['uid' => 1, 'CType' => 'maifaq_list']],
            $event->getRecords(),
        );
    }

    #[Test]
    public function leavesRecordsUntouchedWithoutSmokeParameter(): void
    {
        $records = [
            ['uid' => 1, 'CType' => 'maifaq_list'],
            ['uid' => 2, 'CType' => 'mainews_list'],
        ];
        $GLOBALS['TYPO3_REQUEST'] = $this->createRequest(10002, []);

        $event = new ModifyRecordsAfterFetchingContentEvent($records, '', 0, 0, false, false, []);

        (new SmokeTestContentFilterListener())($event);

        self::assertSame($records, $event->getRecords());
    }

    private function createRequest(int $pageId, array $queryParams): ServerRequestInterface
    {
        $pageArguments = new PageArguments($pageId, '0', []);

        $request = $this->createMock(ServerRequestInterface::class);
        $request->method('getAttribute')->willReturnCallback(
            static fn(string $name) => $name === 'routing' ? $pageArguments : null,
        );
        $request->method('getQueryParams')->willReturn($queryParams);

        return $request;
    }
}
