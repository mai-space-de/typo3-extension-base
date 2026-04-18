<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Controller\Traits;

use Maispace\MaiBase\Controller\Traits\DetailActionTrait;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Core\Error\Http\PageNotFoundException;
use TYPO3\CMS\Extbase\Mvc\Request;
use TYPO3\CMS\Extbase\Persistence\RepositoryInterface;

final class DetailActionTraitTest extends TestCase
{
    #[Test]
    public function resolveDetailOrNotFoundReturnsObjectWhenFound(): void
    {
        $record = new \stdClass();
        $repository = $this->createMock(RepositoryInterface::class);
        $repository->method('findByUid')->with(42)->willReturn($record);

        $request = $this->createMock(Request::class);
        $request->method('hasArgument')->with('uid')->willReturn(true);
        $request->method('getArgument')->with('uid')->willReturn('42');

        $subject = $this->createTraitUser($request);

        self::assertSame($record, $subject->callResolveDetailOrNotFound($repository));
    }

    #[Test]
    public function resolveDetailOrNotFoundThrowsWhenArgumentMissing(): void
    {
        $repository = $this->createMock(RepositoryInterface::class);

        $request = $this->createMock(Request::class);
        $request->method('hasArgument')->with('uid')->willReturn(false);

        $subject = $this->createTraitUser($request);

        $this->expectException(PageNotFoundException::class);
        $this->expectExceptionCode(1745000001);

        $subject->callResolveDetailOrNotFound($repository);
    }

    #[Test]
    public function resolveDetailOrNotFoundThrowsWhenRepositoryReturnsNull(): void
    {
        $repository = $this->createMock(RepositoryInterface::class);
        $repository->method('findByUid')->with(7)->willReturn(null);

        $request = $this->createMock(Request::class);
        $request->method('hasArgument')->with('uid')->willReturn(true);
        $request->method('getArgument')->with('uid')->willReturn('7');

        $subject = $this->createTraitUser($request);

        $this->expectException(PageNotFoundException::class);
        $this->expectExceptionCode(1745000002);

        $subject->callResolveDetailOrNotFound($repository);
    }

    private function createTraitUser(Request $request): object
    {
        return new class ($request) {
            use DetailActionTrait;

            protected Request $request;

            public function __construct(Request $request)
            {
                $this->request = $request;
            }

            public function callResolveDetailOrNotFound(RepositoryInterface $repository, string $argumentName = 'uid'): object
            {
                return $this->resolveDetailOrNotFound($repository, $argumentName);
            }
        };
    }
}
