<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\HttpBasicAuth;

use Maispace\MaiBase\HttpBasicAuth\Credential;
use Maispace\MaiBase\HttpBasicAuth\Protection;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class ProtectionTest extends TestCase
{
    #[Test]
    public function parsesCredentialsFromMultilineStringTest(): void
    {
        $credentials = Protection::parseCredentials("agency:one\r\n\n# comment\ncustomer:two\ninvalid");

        self::assertCount(2, $credentials);
        self::assertSame('agency', $credentials[0]->username);
        self::assertSame('customer', $credentials[1]->username);
    }

    #[Test]
    public function parsesCredentialsFromListAndSkipsNonStringsTest(): void
    {
        $credentials = Protection::parseCredentials(['agency:one', 42, null, 'customer:two']);

        self::assertCount(2, $credentials);
    }

    #[Test]
    public function acceptsEveryConfiguredLoginTest(): void
    {
        $protection = new Protection('Staging', [new Credential('agency', 'one'), new Credential('customer', 'two')]);

        self::assertTrue($protection->accepts('agency', 'one'));
        self::assertTrue($protection->accepts('customer', 'two'));
        self::assertFalse($protection->accepts('agency', 'two'));
        self::assertTrue($protection->hasCredentials());
    }

    #[Test]
    public function withoutCredentialsNobodyGetsInTest(): void
    {
        $protection = new Protection('Staging', []);

        self::assertFalse($protection->hasCredentials());
        self::assertFalse($protection->accepts('', ''));
        self::assertFalse($protection->accepts('agency', 'one'));
    }
}
