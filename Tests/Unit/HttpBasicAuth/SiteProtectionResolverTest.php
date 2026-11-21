<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\HttpBasicAuth;

use Maispace\MaiBase\HttpBasicAuth\SiteProtectionResolver;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Core\Settings\Settings;
use TYPO3\CMS\Core\Site\Entity\Site;
use TYPO3\CMS\Core\Site\Entity\SiteLanguage;
use TYPO3\CMS\Core\Site\Entity\SiteSettings;

final class SiteProtectionResolverTest extends TestCase
{
    /**
     * @param array<string, mixed> $settings
     * @param array<string, mixed> $germanLanguage extra config of language 1
     */
    private function site(array $settings, array $germanLanguage = []): Site
    {
        return new Site(
            'main',
            1,
            [
                'base' => 'https://example.test/',
                'languages' => [
                    ['languageId' => 0, 'title' => 'English', 'locale' => 'en_US.UTF-8', 'base' => '/'],
                    ['languageId' => 1, 'title' => 'Deutsch', 'locale' => 'de_DE.UTF-8', 'base' => '/de/', ...$germanLanguage],
                ],
            ],
            SiteSettings::create(new Settings($settings)),
        );
    }

    private function language(Site $site, int $languageId): SiteLanguage
    {
        return $site->getLanguageById($languageId);
    }

    #[Test]
    public function siteWithoutProtectionIsOpenTest(): void
    {
        $site = $this->site(['basicAuth.credentials' => ['agency:one']]);
        $resolver = new SiteProtectionResolver();

        self::assertNull($resolver->resolve($site, $this->language($site, 0)));
        self::assertNull($resolver->resolve($site, null));
    }

    #[Test]
    public function wholeSiteIsLockedForEveryLanguageTest(): void
    {
        $site = $this->site([
            'basicAuth.enabled' => true,
            'basicAuth.realm' => 'Staging',
            'basicAuth.credentials' => ['agency:one', 'customer:two'],
        ]);
        $resolver = new SiteProtectionResolver();

        foreach ([null, $this->language($site, 0), $this->language($site, 1)] as $language) {
            $protection = $resolver->resolve($site, $language);
            self::assertNotNull($protection);
            self::assertSame('site', $protection->source);
            self::assertSame('Staging', $protection->realm);
            self::assertTrue($protection->accepts('agency', 'one'));
            self::assertTrue($protection->accepts('customer', 'two'));
        }
    }

    #[Test]
    public function singleLanguageIsLockedWithItsOwnAndTheSiteLoginsTest(): void
    {
        $site = $this->site(
            ['basicAuth.credentials' => ['agency:one']],
            ['basicAuthEnabled' => true, 'basicAuthCredentials' => "translator:three\n"],
        );
        $resolver = new SiteProtectionResolver();

        self::assertNull($resolver->resolve($site, $this->language($site, 0)));

        $protection = $resolver->resolve($site, $this->language($site, 1));
        self::assertNotNull($protection);
        self::assertSame('language:1', $protection->source);
        self::assertSame('Protected area', $protection->realm);
        self::assertTrue($protection->accepts('translator', 'three'));
        self::assertTrue($protection->accepts('agency', 'one'));
        self::assertFalse($protection->accepts('translator', 'one'));
    }

    #[Test]
    public function credentialsAsMultilineStringAreSupportedTest(): void
    {
        $site = $this->site(['basicAuth.enabled' => '1', 'basicAuth.credentials' => "agency:one\ncustomer:two"]);

        self::assertCount(2, (new SiteProtectionResolver())->siteCredentials($site));
    }

    #[Test]
    public function backendUsersAreAllowedByDefaultTest(): void
    {
        $resolver = new SiteProtectionResolver();

        self::assertTrue($resolver->allowsBackendUsers($this->site([])));
        self::assertFalse($resolver->allowsBackendUsers($this->site(['basicAuth.allowBackendUsers' => false])));
    }
}
