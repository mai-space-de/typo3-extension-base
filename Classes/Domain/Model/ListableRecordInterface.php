<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Domain\Model;

use TYPO3\CMS\Extbase\Persistence\ObjectStorage;

/**
 * Shared interface for feature extension records that appear in list views.
 *
 * Defines the minimum contract for news, events, jobs, testimonials, gallery,
 * and other content record types that render in list/grid layouts.
 *
 * Implementing this interface enables:
 * - Unified list rendering via shared Fluid components
 * - Consistent frontend markup across all feature extensions
 * - Centralized DTO transformation for aggregated content feeds
 */
interface ListableRecordInterface
{
    /**
     * Returns the record title (required for all list items).
     */
    public function getTitle(): string;

    /**
     * Returns the primary description/content field.
     *
     * This maps to:
     * - News: teaser or body
     * - Event: description
     * - Job: description
     * - Testimonial: quote
     * - Gallery: description
     */
    public function getDescription(): string;

    /**
     * Returns the collection of categories (sys_category).
     *
     * @return ObjectStorage<\TYPO3\CMS\Extbase\Domain\Model\Category>
     */
    public function getCategories(): ObjectStorage;

    /**
     * Returns the collection of media assets (FAL references).
     *
     * This maps to:
     * - News: images
     * - Event: image
     * - Testimonial: portrait
     * - Gallery: images
     *
     * @return ObjectStorage<\TYPO3\CMS\Extbase\Domain\Model\FileReference>
     */
    public function getMedia(): ObjectStorage;

    /**
     * Returns the primary date/timestamp for sorting and display.
     *
     * This maps to:
     * - News: published date
     * - Event: start date
     * - Job: application deadline
     * - Gallery: year (converted to DateTime)
     *
     * @return \DateTimeInterface|null
     */
    public function getDate(): ?\DateTimeInterface;

    /**
     * Returns the URL slug for detail page routing.
     *
     * Falls back to uid-based routing if no slug is defined.
     */
    public function getSlug(): string;

    /**
     * Returns the record UID.
     */
    public function getUid(): ?int;
}
