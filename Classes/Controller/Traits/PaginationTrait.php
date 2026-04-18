<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

use TYPO3\CMS\Core\Pagination\ArrayPaginator;
use TYPO3\CMS\Core\Pagination\SimplePagination;
use TYPO3\CMS\Extbase\Pagination\QueryResultPaginator;
use TYPO3\CMS\Extbase\Persistence\QueryResultInterface;

trait PaginationTrait
{
    protected function paginateQueryResult(
        QueryResultInterface $queryResult,
        int $defaultItemsPerPage = 10,
    ): array {
        $currentPage = max(1, (int)($this->request->hasArgument('currentPage')
            ? $this->request->getArgument('currentPage')
            : 1));
        $itemsPerPage = (int)($this->settings['itemsPerPage'] ?? $defaultItemsPerPage);

        $paginator = new QueryResultPaginator($queryResult, $currentPage, $itemsPerPage);
        $pagination = new SimplePagination($paginator);

        return ['paginator' => $paginator, 'pagination' => $pagination];
    }

    protected function paginateArray(
        array $items,
        int $defaultItemsPerPage = 10,
    ): array {
        $currentPage = max(1, (int)($this->request->hasArgument('currentPage')
            ? $this->request->getArgument('currentPage')
            : 1));
        $itemsPerPage = (int)($this->settings['itemsPerPage'] ?? $defaultItemsPerPage);

        $paginator = new ArrayPaginator($items, $currentPage, $itemsPerPage);
        $pagination = new SimplePagination($paginator);

        return ['paginator' => $paginator, 'pagination' => $pagination];
    }
}
