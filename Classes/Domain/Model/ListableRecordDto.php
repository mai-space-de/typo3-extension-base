<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Domain\Model;

use TYPO3\CMS\Extbase\Persistence\ObjectStorage;

class ListableRecordDto implements ListableRecordInterface
{
    /**
     * @param ObjectStorage<\TYPO3\CMS\Extbase\Domain\Model\Category> $categories
     * @param ObjectStorage<\TYPO3\CMS\Extbase\Domain\Model\FileReference> $media
     */
    public function __construct(
        protected ?int $uid,
        protected string $title,
        protected string $description,
        protected ObjectStorage $categories,
        protected ObjectStorage $media,
        protected ?\DateTimeInterface $date,
        protected string $slug = '',
    ) {}

    public function getUid(): ?int
    {
        return $this->uid;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getCategories(): ObjectStorage
    {
        return $this->categories;
    }

    public function getMedia(): ObjectStorage
    {
        return $this->media;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function getSlug(): string
    {
        if ($this->slug !== '') {
            return $this->slug;
        }
        return $this->uid !== null ? (string) $this->uid : '';
    }

    public function getFirstMediaItem(): ?\TYPO3\CMS\Extbase\Domain\Model\FileReference
    {
        if ($this->media->count() === 0) {
            return null;
        }
        $this->media->rewind();
        return $this->media->current() ?: null;
    }
}
