<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\EventListener;

use Maispace\MaiBase\EventListener\SmokeTestContentFilterListener;
use Maispace\MaiBase\SmokeTest\SmokeTestContentFilter;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Routing\PageArguments;
use TYPO3\CMS\Frontend\Event\AfterContentHasBeenFetchedEvent;

final class SmokeTestContentFilterListenerTest extends TestCase
{
    #[Test]
    public function filtersPluginPageRecordsBySmokePluginParameter(): void
    {
        $request = $this->createRequest(10002, ['smoke_plugin' => 'maifaq_list']);

        $event = new AfterContentHasBeenFetchedEvent(
            groupedContent: [
                'column1' => [
                    'records' => [
                        ['uid' => 1, 'CType' => 'maifaq_list'],
                        ['uid' => 2, 'CType' => 'mainews_list'],
                    ],
                ],
            ],
            request: $request,
        );

        (new SmokeTestContentFilterListener(new SmokeTestContentFilter()))($event);

        self::assertCount(1, $event->groupedContent['column1']['records']);
        self::assertSame('maifaq_list', $event->groupedContent['column1']['records'][0]['CType']);
    }

    #[Test]
    public function leavesRecordsUntouchedWithoutSmokeParameter(): void
    {
        $records = [
            ['uid' => 1, 'CType' => 'maifaq_list'],
            ['uid' => 2, 'CType' => 'mainews_list'],
        ];
        $request = $this->createRequest(10002, []);

        $event = new AfterContentHasBeenFetchedEvent(
            groupedContent: [
                'column1' => ['records' => $records],
            ],
            request: $request,
        );

        (new SmokeTestContentFilterListener(new SmokeTestContentFilter()))($event);

        self::assertCount(2, $event->groupedContent['column1']['records']);
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
