<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Domain\Model;

use Maispace\MaiBase\Domain\Model\ListableRecordInterface;
use Maispace\MaiBase\Domain\Model\ListableRecordTrait;
use PHPUnit\Framework\Attributes\Test;
use TYPO3\CMS\Extbase\DomainObject\AbstractEntity;
use TYPO3\CMS\Extbase\Persistence\ObjectStorage;
use TYPO3\TestingFramework\Core\Unit\UnitTestCase;

final class ListableRecordTraitTest extends UnitTestCase
{
    private function createBaseEntity(): object
    {
        return new class extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $title = 'Test';

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };
    }

    #[Test]
    public function getSlugReturnsSlugPropertyWhenSet(): void
    {
        $mock = new class extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $slug = 'test-slug';
            protected string $title = 'Test';

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };

        self::assertSame('test-slug', $mock->getSlug());
    }

    #[Test]
    public function getSlugFallsBackToUidWhenEmpty(): void
    {
        $mock = new class extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $slug = '';
            protected string $title = 'Test';
            protected ?int $uid = 42;

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };

        self::assertSame('42', $mock->getSlug());
    }

    #[Test]
    public function getMediaReturnsImagesProperty(): void
    {
        $images = new ObjectStorage();

        $mock = new class ($images) extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $title = 'Test';

            public function __construct(protected ObjectStorage $images) {}

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };

        self::assertSame($images, $mock->getMedia());
    }

    #[Test]
    public function getMediaReturnsImageProperty(): void
    {
        $image = new ObjectStorage();

        $mock = new class ($image) extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $title = 'Test';

            public function __construct(protected ObjectStorage $image) {}

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };

        self::assertSame($image, $mock->getMedia());
    }

    #[Test]
    public function getMediaReturnsPortraitProperty(): void
    {
        $portrait = new ObjectStorage();

        $mock = new class ($portrait) extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $title = 'Test';

            public function __construct(protected ObjectStorage $portrait) {}

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };

        self::assertSame($portrait, $mock->getMedia());
    }

    #[Test]
    public function getMediaReturnsEmptyStorageWhenNoMediaProperty(): void
    {
        $mock = $this->createBaseEntity();
        $media = $mock->getMedia();
        self::assertInstanceOf(ObjectStorage::class, $media);
        self::assertCount(0, $media);
    }

    #[Test]
    public function getDescriptionReturnsTeaserFirst(): void
    {
        $mock = new class extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $title = 'Test';
            protected string $teaser = 'Teaser';
            protected string $description = 'Description';

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };

        self::assertSame('Teaser', $mock->getDescription());
    }

    #[Test]
    public function getDescriptionFallsBackToDescription(): void
    {
        $mock = new class extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $title = 'Test';
            protected string $description = 'Description';

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };

        self::assertSame('Description', $mock->getDescription());
    }

    #[Test]
    public function getDescriptionFallsBackToBody(): void
    {
        $mock = new class extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $title = 'Test';
            protected string $body = 'Body';

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };

        self::assertSame('Body', $mock->getDescription());
    }

    #[Test]
    public function getDescriptionFallsBackToQuote(): void
    {
        $mock = new class extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $title = 'Test';
            protected string $quote = 'Quote';

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };

        self::assertSame('Quote', $mock->getDescription());
    }

    #[Test]
    public function getDescriptionReturnsEmptyStringWhenNoProperty(): void
    {
        $mock = $this->createBaseEntity();
        self::assertSame('', $mock->getDescription());
    }

    #[Test]
    public function getDateReturnsDateProperty(): void
    {
        $date = new \DateTime('2026-05-23');

        $mock = new class ($date) extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $title = 'Test';

            public function __construct(protected \DateTime $date) {}

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };

        self::assertSame($date, $mock->getDate());
    }

    #[Test]
    public function getDateConvertsIntTimestampStartDate(): void
    {
        $mock = new class extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $title = 'Test';
            protected int $startDate = 1716422400;

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };

        $date = $mock->getDate();
        self::assertInstanceOf(\DateTimeInterface::class, $date);
        self::assertSame(1716422400, $date->getTimestamp());
    }

    #[Test]
    public function getDateConvertsIntTimestampDeadline(): void
    {
        $mock = new class extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $title = 'Test';
            protected int $deadline = 1716422400;

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };

        $date = $mock->getDate();
        self::assertInstanceOf(\DateTimeInterface::class, $date);
        self::assertSame(1716422400, $date->getTimestamp());
    }

    #[Test]
    public function getDateConvertsYearToJanuaryFirst(): void
    {
        $mock = new class extends AbstractEntity implements ListableRecordInterface {
            use ListableRecordTrait;

            protected string $title = 'Test';
            protected int $year = 2026;

            public function getTitle(): string
            {
                return $this->title;
            }

            public function getCategories(): ObjectStorage
            {
                return new ObjectStorage();
            }
        };

        $date = $mock->getDate();
        self::assertInstanceOf(\DateTimeInterface::class, $date);
        self::assertSame('2026-01-01', $date->format('Y-m-d'));
    }

    #[Test]
    public function getDateReturnsNullWhenNoDateProperty(): void
    {
        $mock = $this->createBaseEntity();
        self::assertNull($mock->getDate());
    }
}
