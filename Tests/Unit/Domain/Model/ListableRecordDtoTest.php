<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Domain\Model;

use Maispace\MaiBase\Domain\Model\ListableRecordDto;
use Maispace\MaiBase\Domain\Model\ListableRecordInterface;
use PHPUnit\Framework\Attributes\Test;
use TYPO3\CMS\Extbase\Persistence\ObjectStorage;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

final class ListableRecordDtoTest extends UnitTestCase
{
    #[Test]
    public function implementsListableRecordInterface(): void
    {
        $categories = new ObjectStorage();
        $media = new ObjectStorage();
        $date = new \DateTimeImmutable('2026-05-23');

        $dto = new ListableRecordDto(
            uid: 42,
            title: 'Test Title',
            description: 'Test Description',
            categories: $categories,
            media: $media,
            date: $date,
            slug: 'test-title',
        );

        self::assertInstanceOf(ListableRecordInterface::class, $dto);
    }

    #[Test]
    public function gettersReturnConstructorValues(): void
    {
        $categories = new ObjectStorage();
        $media = new ObjectStorage();
        $date = new \DateTimeImmutable('2026-05-23');

        $dto = new ListableRecordDto(
            uid: 42,
            title: 'Test Title',
            description: 'Test Description',
            categories: $categories,
            media: $media,
            date: $date,
            slug: 'test-title',
        );

        self::assertSame(42, $dto->getUid());
        self::assertSame('Test Title', $dto->getTitle());
        self::assertSame('Test Description', $dto->getDescription());
        self::assertSame($categories, $dto->getCategories());
        self::assertSame($media, $dto->getMedia());
        self::assertSame($date, $dto->getDate());
        self::assertSame('test-title', $dto->getSlug());
    }

    #[Test]
    public function getSlugFallsBackToUidWhenEmpty(): void
    {
        $dto = new ListableRecordDto(
            uid: 42,
            title: 'Test',
            description: 'Test',
            categories: new ObjectStorage(),
            media: new ObjectStorage(),
            date: null,
            slug: '',
        );

        self::assertSame('42', $dto->getSlug());
    }

    #[Test]
    public function getFirstMediaItemReturnsNullForEmptyStorage(): void
    {
        $dto = new ListableRecordDto(
            uid: 1,
            title: 'Test',
            description: 'Test',
            categories: new ObjectStorage(),
            media: new ObjectStorage(),
            date: null,
        );

        self::assertNull($dto->getFirstMediaItem());
    }

    #[Test]
    public function getFirstMediaItemReturnsFirstElement(): void
    {
        $media = new ObjectStorage();
        $fileRef1 = $this->createMock(\TYPO3\CMS\Extbase\Domain\Model\FileReference::class);
        $fileRef2 = $this->createMock(\TYPO3\CMS\Extbase\Domain\Model\FileReference::class);
        $media->attach($fileRef1);
        $media->attach($fileRef2);

        $dto = new ListableRecordDto(
            uid: 1,
            title: 'Test',
            description: 'Test',
            categories: new ObjectStorage(),
            media: $media,
            date: null,
        );

        self::assertSame($fileRef1, $dto->getFirstMediaItem());
    }

    #[Test]
    public function acceptsNullDate(): void
    {
        $dto = new ListableRecordDto(
            uid: 1,
            title: 'Test',
            description: 'Test',
            categories: new ObjectStorage(),
            media: new ObjectStorage(),
            date: null,
        );

        self::assertNull($dto->getDate());
    }
}
