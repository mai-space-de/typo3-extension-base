<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\EventListener;

use Maispace\MaiBase\Backend\CustomPageModule\CustomPageModuleListingContext;
use Maispace\MaiBase\EventListener\FilterCustomPageModuleListingListener;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Backend\RecordList\DatabaseRecordList;
use TYPO3\CMS\Backend\View\Event\ModifyDatabaseQueryForRecordListingEvent;
use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Database\Query\Expression\ExpressionBuilder;
use TYPO3\CMS\Core\Database\Query\QueryBuilder;

final class FilterCustomPageModuleListingListenerTest extends TestCase
{
    #[Test]
    public function addsDoktypeConstraintWhenActiveForPages(): void
    {
        $context = new CustomPageModuleListingContext();
        $context->activate([120, 121]);

        $expressionBuilder = $this->createMock(ExpressionBuilder::class);
        $expressionBuilder->expects(self::once())
            ->method('in')
            ->with('pages.doktype', 'doktypes-param')
            ->willReturn('doktype-constraint');

        $queryBuilder = $this->createMock(QueryBuilder::class);
        $queryBuilder->method('expr')->willReturn($expressionBuilder);
        $queryBuilder->expects(self::once())
            ->method('createNamedParameter')
            ->with([120, 121], Connection::PARAM_INT_ARRAY)
            ->willReturn('doktypes-param');
        $queryBuilder->expects(self::once())
            ->method('andWhere')
            ->with('doktype-constraint')
            ->willReturnSelf();

        $event = new ModifyDatabaseQueryForRecordListingEvent(
            $queryBuilder,
            'pages',
            1,
            ['*'],
            0,
            50,
            $this->createMock(DatabaseRecordList::class),
        );

        (new FilterCustomPageModuleListingListener($context))($event);
    }

    #[Test]
    public function skipsWhenInactiveOrWrongTable(): void
    {
        $context = new CustomPageModuleListingContext();
        $queryBuilder = $this->createMock(QueryBuilder::class);
        $queryBuilder->expects(self::never())->method('andWhere');

        $event = new ModifyDatabaseQueryForRecordListingEvent(
            $queryBuilder,
            'pages',
            1,
            ['*'],
            0,
            50,
            $this->createMock(DatabaseRecordList::class),
        );

        (new FilterCustomPageModuleListingListener($context))($event);

        $context->activate([120]);
        $eventTtContent = new ModifyDatabaseQueryForRecordListingEvent(
            $queryBuilder,
            'tt_content',
            1,
            ['*'],
            0,
            50,
            $this->createMock(DatabaseRecordList::class),
        );
        (new FilterCustomPageModuleListingListener($context))($eventTtContent);
    }
}
