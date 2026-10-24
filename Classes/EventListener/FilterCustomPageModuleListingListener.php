<?php

declare(strict_types=1);

namespace Maispace\MaiBase\EventListener;

use Maispace\MaiBase\Backend\CustomPageModule\CustomPageModuleListingContext;
use TYPO3\CMS\Backend\View\Event\ModifyDatabaseQueryForRecordListingEvent;
use TYPO3\CMS\Core\Database\Connection;

final class FilterCustomPageModuleListingListener
{
    public function __construct(
        private readonly CustomPageModuleListingContext $listingContext,
    ) {}

    public function __invoke(ModifyDatabaseQueryForRecordListingEvent $event): void
    {
        if ($event->getTable() !== 'pages' || !$this->listingContext->isActive()) {
            return;
        }

        $doktypes = $this->listingContext->getDoktypes();
        $queryBuilder = $event->getQueryBuilder();
        $queryBuilder->andWhere(
            $queryBuilder->expr()->in(
                'pages.doktype',
                $queryBuilder->createNamedParameter($doktypes, Connection::PARAM_INT_ARRAY),
            ),
        );
    }
}
