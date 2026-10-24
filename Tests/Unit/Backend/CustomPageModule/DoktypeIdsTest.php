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
        self::assertSame([120, 121], DoktypeIds::all());
        self::assertTrue(DoktypeIds::isReserved(120));
        self::assertFalse(DoktypeIds::isReserved(1));
        self::assertFalse(DoktypeIds::isReserved(254));
    }
}
