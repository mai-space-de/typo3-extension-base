<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Backend\CustomPageModule;

use Maispace\MaiBase\Backend\CustomPageModule\CustomPageModuleListingContext;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class CustomPageModuleListingContextTest extends TestCase
{
    #[Test]
    public function activateNormalizesAndDeduplicatesDoktypes(): void
    {
        $subject = new CustomPageModuleListingContext();
        $subject->activate([120, 0, 120, 121]);

        self::assertTrue($subject->isActive());
        self::assertSame([120, 121], $subject->getDoktypes());
    }

    #[Test]
    public function clearDeactivatesFilter(): void
    {
        $subject = new CustomPageModuleListingContext();
        $subject->activate([120]);
        $subject->clear();

        self::assertFalse($subject->isActive());
        self::assertSame([], $subject->getDoktypes());
    }
}
