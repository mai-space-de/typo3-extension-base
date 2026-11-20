<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\HttpBasicAuth;

use Maispace\MaiBase\HttpBasicAuth\Credential;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class CredentialTest extends TestCase
{
    #[Test]
    public function parsesUsernameAndPasswordTest(): void
    {
        $credential = Credential::fromString('  agency:s3cret  ');

        self::assertNotNull($credential);
        self::assertSame('agency', $credential->username);
        self::assertTrue($credential->matches('agency', 's3cret'));
    }

    #[Test]
    public function onlyFirstColonSeparatesThePasswordTest(): void
    {
        $credential = Credential::fromString('customer:pa:ss:word');

        self::assertNotNull($credential);
        self::assertSame('customer', $credential->username);
        self::assertTrue($credential->matches('customer', 'pa:ss:word'));
    }

    /**
     * @return iterable<string, array{string}>
     */
    public static function invalidLinesProvider(): iterable
    {
        yield 'empty' => [''];
        yield 'whitespace' => ['   '];
        yield 'comment' => ['# agency:secret'];
        yield 'no colon' => ['agency'];
        yield 'no username' => [':secret'];
        yield 'no password' => ['agency:'];
    }

    #[Test]
    #[DataProvider('invalidLinesProvider')]
    public function rejectsInvalidLinesTest(string $line): void
    {
        self::assertNull(Credential::fromString($line));
    }

    #[Test]
    public function plainPasswordRejectsWrongValuesTest(): void
    {
        $credential = new Credential('agency', 's3cret');

        self::assertFalse($credential->isHashed());
        self::assertFalse($credential->matches('agency', 'wrong'));
        self::assertFalse($credential->matches('Agency', 's3cret'));
        self::assertFalse($credential->matches('', ''));
    }

    #[Test]
    public function hashedPasswordIsVerifiedTest(): void
    {
        $credential = new Credential('customer', password_hash('preview', PASSWORD_BCRYPT, ['cost' => 4]));

        self::assertTrue($credential->isHashed());
        self::assertTrue($credential->matches('customer', 'preview'));
        self::assertFalse($credential->matches('customer', 'Preview'));
    }

    #[Test]
    public function argon2HashFromStringIsVerifiedTest(): void
    {
        if (!defined('PASSWORD_ARGON2ID')) {
            self::markTestSkipped('PHP was built without Argon2.');
        }
        $credential = Credential::fromString('customer:' . password_hash('preview', PASSWORD_ARGON2ID));

        self::assertNotNull($credential);
        self::assertTrue($credential->matches('customer', 'preview'));
    }

    #[Test]
    public function theHashItselfIsNotAcceptedAsPasswordTest(): void
    {
        $hash = password_hash('preview', PASSWORD_BCRYPT, ['cost' => 4]);

        self::assertFalse((new Credential('customer', $hash))->matches('customer', $hash));
    }
}
