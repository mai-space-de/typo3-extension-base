<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Domain\Model;

use TYPO3\CMS\Extbase\Persistence\ObjectStorage;

trait ListableRecordTrait
{
    abstract public function getUid(): ?int;
    abstract public function getTitle(): string;
    abstract public function getCategories(): ObjectStorage;

    public function getSlug(): string
    {
        if (property_exists($this, 'slug') && $this->slug !== '') {
            return $this->slug;
        }
        return (string) $this->getUid();
    }

    public function getMedia(): ObjectStorage
    {
        if (property_exists($this, 'images')) {
            return $this->images;
        }
        if (property_exists($this, 'image')) {
            return $this->image;
        }
        if (property_exists($this, 'portrait')) {
            return $this->portrait;
        }
        return new ObjectStorage();
    }

    public function getDescription(): string
    {
        if (property_exists($this, 'teaser') && $this->teaser !== '') {
            return $this->teaser;
        }
        if (property_exists($this, 'description')) {
            return $this->description;
        }
        if (property_exists($this, 'body')) {
            return $this->body;
        }
        if (property_exists($this, 'quote')) {
            return $this->quote;
        }
        return '';
    }

    public function getDate(): ?\DateTimeInterface
    {
        if (property_exists($this, 'date') && $this->date !== null) {
            return $this->date;
        }
        if (property_exists($this, 'startDate') && $this->startDate !== null) {
            if ($this->startDate instanceof \DateTimeInterface) {
                return $this->startDate;
            }
            if (is_int($this->startDate) && $this->startDate > 0) {
                return (new \DateTimeImmutable())->setTimestamp($this->startDate);
            }
        }
        if (property_exists($this, 'deadline') && is_int($this->deadline) && $this->deadline > 0) {
            return (new \DateTimeImmutable())->setTimestamp($this->deadline);
        }
        if (property_exists($this, 'year') && is_int($this->year) && $this->year > 0) {
            return new \DateTimeImmutable($this->year . '-01-01');
        }
        return null;
    }
}
