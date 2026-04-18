<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Controller\Traits;

use Maispace\MaiBase\Controller\Traits\PaginationTrait;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Core\Pagination\ArrayPaginator;
use TYPO3\CMS\Core\Pagination\SimplePagination;
use TYPO3\CMS\Extbase\Mvc\Request;
use TYPO3\CMS\Extbase\Pagination\QueryResultPaginator;
use TYPO3\CMS\Extbase\Persistence\QueryResultInterface;

final class PaginationTraitTest extends TestCase
{
    #[Test]
    public function paginateArrayReturnsArrayPaginatorAndSimplePagination(): void
    {
        $request = $this->createMock(Request::class);
        $request->method('hasArgument')->with('currentPage')->willReturn(false);

        $subject = $this->createTraitUser($request);
        $result = $subject->callPaginateArray(['a', 'b', 'c', 'd', 'e']);

        self::assertArrayHasKey('paginator', $result);
        self::assertArrayHasKey('pagination', $result);
        self::assertInstanceOf(ArrayPaginator::class, $result['paginator']);
        self::assertInstanceOf(SimplePagination::class, $result['pagination']);
    }

    #[Test]
    public function paginateArrayUsesCurrentPageArgument(): void
    {
        $request = $this->createMock(Request::class);
        $request->method('hasArgument')->with('currentPage')->willReturn(true);
        $request->method('getArgument')->with('currentPage')->willReturn('2');

        $subject = $this->createTraitUser($request);
        $result = $subject->callPaginateArray(range(1, 25), 10);

        self::assertSame(2, $result['paginator']->getCurrentPageNumber());
    }

    #[Test]
    public function paginateArrayUsesItemsPerPageFromSettings(): void
    {
        $request = $this->createMock(Request::class);
        $request->method('hasArgument')->with('currentPage')->willReturn(false);

        $subject = $this->createTraitUser($request, ['itemsPerPage' => '5']);
        $result = $subject->callPaginateArray(range(1, 20));

        self::assertSame(5, $result['paginator']->getItemsPerPage());
    }

    #[Test]
    public function paginateQueryResultReturnsQueryResultPaginatorAndSimplePagination(): void
    {
        $queryResult = $this->createMock(QueryResultInterface::class);
        $queryResult->method('count')->willReturn(0);
        $queryResult->method('toArray')->willReturn([]);

        $request = $this->createMock(Request::class);
        $request->method('hasArgument')->with('currentPage')->willReturn(false);

        $subject = $this->createTraitUser($request);
        $result = $subject->callPaginateQueryResult($queryResult);

        self::assertArrayHasKey('paginator', $result);
        self::assertArrayHasKey('pagination', $result);
        self::assertInstanceOf(QueryResultPaginator::class, $result['paginator']);
        self::assertInstanceOf(SimplePagination::class, $result['pagination']);
    }

    private function createTraitUser(Request $request, array $settings = []): object
    {
        return new class ($request, $settings) {
            use PaginationTrait;

            protected Request $request;
            protected array $settings;

            public function __construct(Request $request, array $settings)
            {
                $this->request = $request;
                $this->settings = $settings;
            }

            public function callPaginateArray(array $items, int $defaultItemsPerPage = 10): array
            {
                return $this->paginateArray($items, $defaultItemsPerPage);
            }

            public function callPaginateQueryResult(QueryResultInterface $queryResult, int $defaultItemsPerPage = 10): array
            {
                return $this->paginateQueryResult($queryResult, $defaultItemsPerPage);
            }
        };
    }
}
