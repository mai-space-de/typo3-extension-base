<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\HttpBasicAuth;

use Maispace\MaiBase\HttpBasicAuth\PageProtectionResolver;
use Maispace\MaiBase\HttpBasicAuth\SiteProtectionResolver;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Core\Settings\Settings;
use TYPO3\CMS\Core\Site\Entity\Site;
use TYPO3\CMS\Core\Site\Entity\SiteSettings;

final class PageProtectionResolverTest extends TestCase
{
    private function resolver(): PageProtectionResolver
    {
        return new PageProtectionResolver(new SiteProtectionResolver());
    }

    /**
     * Root 1 → 10 → 20 → 30, ordered like TYPO3 does (current page first).
     *
     * @param array<int, array<string, mixed>> $overrides
     * @return array<int, array<string, mixed>>
     */
    private function rootLine(array $overrides = []): array
    {
        $pages = [
            3 => ['uid' => 30, 'pid' => 20],
            2 => ['uid' => 20, 'pid' => 10],
            1 => ['uid' => 10, 'pid' => 1],
            0 => ['uid' => 1, 'pid' => 0],
        ];
        foreach ($pages as $index => $page) {
            $pages[$index] = [...$page, ...($overrides[$page['uid']] ?? [])];
        }

        return $pages;
    }

    #[Test]
    public function unprotectedRootLineIsOpenTest(): void
    {
        self::assertNull($this->resolver()->resolve(30, $this->rootLine()));
    }

    #[Test]
    public function pageOnlyProtectionLocksJustThatPageTest(): void
    {
        $rootLine = $this->rootLine([20 => [
            'tx_maibase_basic_auth' => PageProtectionResolver::MODE_PAGE,
            'tx_maibase_basic_auth_username' => 'guest',
            'tx_maibase_basic_auth_password' => 'secret',
        ]]);

        $protection = $this->resolver()->resolve(20, array_slice($rootLine, 1, null, true));
        self::assertNotNull($protection);
        self::assertSame('page:20', $protection->source);
        self::assertTrue($protection->accepts('guest', 'secret'));

        self::assertNull($this->resolver()->resolve(30, $rootLine));
    }

    #[Test]
    public function subpageProtectionLocksAllPagesBelowTest(): void
    {
        $rootLine = $this->rootLine([10 => [
            'tx_maibase_basic_auth' => PageProtectionResolver::MODE_PAGE_AND_SUBPAGES,
            'tx_maibase_basic_auth_username' => 'guest',
            'tx_maibase_basic_auth_password' => password_hash('secret', PASSWORD_BCRYPT, ['cost' => 4]),
        ]]);

        $protection = $this->resolver()->resolve(30, $rootLine);
        self::assertNotNull($protection);
        self::assertSame('page:10', $protection->source);
        self::assertTrue($protection->accepts('guest', 'secret'));
    }

    #[Test]
    public function closestProtectedPageWinsTest(): void
    {
        $rootLine = $this->rootLine([
            10 => ['tx_maibase_basic_auth' => 2, 'tx_maibase_basic_auth_username' => 'outer', 'tx_maibase_basic_auth_password' => 'a'],
            20 => ['tx_maibase_basic_auth' => 2, 'tx_maibase_basic_auth_username' => 'inner', 'tx_maibase_basic_auth_password' => 'b'],
        ]);

        $protection = $this->resolver()->resolve(30, array_reverse($rootLine));
        self::assertNotNull($protection);
        self::assertSame('page:20', $protection->source);
        self::assertTrue($protection->accepts('inner', 'b'));
        self::assertFalse($protection->accepts('outer', 'a'));
    }

    #[Test]
    public function siteLoginsOpenProtectedPagesTest(): void
    {
        $site = new Site('main', 1, ['base' => '/'], SiteSettings::create(new Settings([
            'basicAuth.realm' => 'Preview',
            'basicAuth.credentials' => ['agency:one'],
        ])));
        $rootLine = $this->rootLine([30 => ['tx_maibase_basic_auth' => 1]]);

        $protection = $this->resolver()->resolve(30, $rootLine, $site);
        self::assertNotNull($protection);
        self::assertSame('Preview', $protection->realm);
        self::assertTrue($protection->accepts('agency', 'one'));
    }

    #[Test]
    public function protectedPageWithoutAnyLoginLocksEverybodyOutTest(): void
    {
        $protection = $this->resolver()->resolve(30, $this->rootLine([30 => ['tx_maibase_basic_auth' => 1]]));

        self::assertNotNull($protection);
        self::assertFalse($protection->hasCredentials());
    }

    #[Test]
    public function cyclicRootLineDoesNotLoopTest(): void
    {
        $rootLine = [['uid' => 5, 'pid' => 6], ['uid' => 6, 'pid' => 5]];

        self::assertNull($this->resolver()->resolve(5, $rootLine));
    }
}
