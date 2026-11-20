<?php

declare(strict_types=1);

namespace Maispace\MaiBase\HttpBasicAuth;

use TYPO3\CMS\Core\Site\Entity\Site;

/**
 * Decides whether the requested page is locked through its page properties
 * (tab "Access" → "HTTP password protection").
 *
 *   tx_maibase_basic_auth           0 = off, 1 = this page only, 2 = this page and all subpages
 *   tx_maibase_basic_auth_username  login for this page
 *   tx_maibase_basic_auth_password  password (stored hashed by TYPO3)
 *
 * The closest locked page in the rootline wins. The site credentials
 * (basicAuth.credentials) open every locked page as well.
 */
class PageProtectionResolver
{
    public const string FIELD_MODE = 'tx_maibase_basic_auth';
    public const string FIELD_USERNAME = 'tx_maibase_basic_auth_username';
    public const string FIELD_PASSWORD = 'tx_maibase_basic_auth_password';

    public const int MODE_OFF = 0;
    public const int MODE_PAGE = 1;
    public const int MODE_PAGE_AND_SUBPAGES = 2;

    public function __construct(
        private readonly SiteProtectionResolver $siteProtectionResolver,
    ) {}

    /**
     * @param array<array-key, array<string, mixed>> $rootLine page records from the current page up to the site root, in any order
     */
    public function resolve(int $pageUid, array $rootLine, ?Site $site = null): ?Protection
    {
        $pages = [];
        foreach ($rootLine as $page) {
            $pages[(int) ($page['uid'] ?? 0)] = $page;
        }

        $uid = $pageUid;
        $visited = [];
        while ($uid > 0 && isset($pages[$uid]) && !isset($visited[$uid])) {
            $visited[$uid] = true;
            $page = $pages[$uid];
            $mode = (int) ($page[self::FIELD_MODE] ?? self::MODE_OFF);
            $isCurrentPage = $uid === $pageUid;
            if ($mode === self::MODE_PAGE_AND_SUBPAGES || ($mode === self::MODE_PAGE && $isCurrentPage)) {
                return $this->buildProtection($page, $site);
            }
            $uid = (int) ($page['pid'] ?? 0);
        }

        return null;
    }

    /**
     * @param array<string, mixed> $page
     */
    private function buildProtection(array $page, ?Site $site): Protection
    {
        $credentials = [];
        $username = trim((string) ($page[self::FIELD_USERNAME] ?? ''));
        $password = (string) ($page[self::FIELD_PASSWORD] ?? '');
        if ($username !== '' && $password !== '') {
            $credentials[] = new Credential($username, $password);
        }
        if ($site !== null) {
            $credentials = [...$credentials, ...$this->siteProtectionResolver->siteCredentials($site)];
        }

        return new Protection(
            $site !== null ? $this->siteProtectionResolver->realm($site) : Protection::DEFAULT_REALM,
            $credentials,
            'page:' . (int) ($page['uid'] ?? 0),
        );
    }
}
