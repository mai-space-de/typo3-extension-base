<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Backend\RecordModule\Event;

use Maispace\MaiBase\Backend\RecordModule\Event\AfterRecordModulePidsLoadedEvent;
use Maispace\MaiBase\Backend\RecordModule\Event\BeforeRecordModulePidsLoadedEvent;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class RecordModulePidsLoadedEventTest extends TestCase
{
    #[Test]
    public function beforeEventExposesAndUpdatesPids(): void
    {
        $event = new BeforeRecordModulePidsLoadedEvent([1], 'tx_mainews_news');

        self::assertSame([1], $event->getPids());
        self::assertSame('tx_mainews_news', $event->getTable());

        $event->setPids([2, 3]);
        self::assertSame([2, 3], $event->getPids());
    }

    #[Test]
    public function afterEventExposesAndUpdatesPids(): void
    {
        $event = new AfterRecordModulePidsLoadedEvent([4], 'tx_maievents_event');

        self::assertSame([4], $event->getPids());
        self::assertSame('tx_maievents_event', $event->getTable());

        $event->setPids([5]);
        self::assertSame([5], $event->getPids());
    }
}
