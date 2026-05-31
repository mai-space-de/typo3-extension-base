<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\SmokeTest;

use Maispace\MaiBase\SmokeTest\SmokeTestContentFilter;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class SmokeTestContentFilterTest extends TestCase
{
    private SmokeTestContentFilter $subject;

    protected function setUp(): void
    {
        $this->subject = new SmokeTestContentFilter();
    }

    #[Test]
    public function filtersPluginPageRecordsBySmokePluginParameter(): void
    {
        $grouped = [
            'main' => [
                'records' => [
                    ['uid' => 1, 'CType' => 'maifaq_list'],
                    ['uid' => 2, 'CType' => 'mainews_list'],
                ],
            ],
        ];

        $filtered = $this->subject->filterGroupedContent(
            $grouped,
            10002,
            ['smoke_plugin' => 'maifaq_list'],
        );

        self::assertCount(1, $filtered['main']['records']);
        self::assertSame('maifaq_list', $filtered['main']['records'][0]['CType']);
    }

    #[Test]
    public function leavesRecordsUntouchedWithoutSmokeParameter(): void
    {
        $records = [
            ['uid' => 1, 'CType' => 'maifaq_list'],
            ['uid' => 2, 'CType' => 'mainews_list'],
        ];
        $grouped = ['main' => ['records' => $records]];

        $filtered = $this->subject->filterGroupedContent($grouped, 10002, []);

        self::assertSame($records, $filtered['main']['records']);
    }
}
