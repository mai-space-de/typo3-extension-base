<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Backend\CustomPageModule;

use Maispace\MaiBase\Backend\CustomPageModule\DoktypeIds;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class DoktypeIdsTest extends TestCase
{
    #[Test]
    public function reservedIdsAreStableAndDocumented(): void
    {
        self::assertSame(120, DoktypeIds::NEWS);
        self::assertSame(121, DoktypeIds::EVENT);
        self::assertSame(122, DoktypeIds::JOB);
        self::assertSame(123, DoktypeIds::MEMBER);
        self::assertSame([120, 121, 122, 123], DoktypeIds::all());
        self::assertTrue(DoktypeIds::isReserved(120));
        self::assertTrue(DoktypeIds::isReserved(122));
        self::assertTrue(DoktypeIds::isReserved(123));
        self::assertFalse(DoktypeIds::isReserved(1));
        self::assertFalse(DoktypeIds::isReserved(254));
    }
}
