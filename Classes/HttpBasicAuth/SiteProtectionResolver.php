<?php

declare(strict_types=1);

namespace Maispace\MaiBase\HttpBasicAuth;

use TYPO3\CMS\Core\Site\Entity\Site;
use TYPO3\CMS\Core\Site\Entity\SiteLanguage;

/**
 * Decides whether a whole site or a single site language is locked.
 *
 * Site level (site settings of the "MaiSpace Base" set):
 *   basicAuth.enabled      locks every language and variant of the site
 *   basicAuth.realm        text in the browser prompt
 *   basicAuth.credentials  list of `username:password` (plain or password hash),
 *                          e.g. one entry for the agency and one for the customer
 *
 * Language level (site configuration → Languages, stored in config.yaml):
 *   basicAuthEnabled       locks only this language
 *   basicAuthCredentials   extra `username:password` lines for this language
 *
 * The site credentials always open a locked language too, so one master login
 * works everywhere.
 */
class SiteProtectionResolver
{
    public const string SETTING_ENABLED = 'basicAuth.enabled';
    public const string SETTING_REALM = 'basicAuth.realm';
    public const string SETTING_CREDENTIALS = 'basicAuth.credentials';
    public const string SETTING_ALLOW_BACKEND_USERS = 'basicAuth.allowBackendUsers';

    public const string LANGUAGE_ENABLED = 'basicAuthEnabled';
    public const string LANGUAGE_CREDENTIALS = 'basicAuthCredentials';

    public function resolve(Site $site, ?SiteLanguage $language): ?Protection
    {
        if ($language !== null) {
            $languageConfiguration = $language->toArray();
            if ($this->isTruthy($languageConfiguration[self::LANGUAGE_ENABLED] ?? false)) {
                $languageCredentials = Protection::parseCredentials(
                    $this->toLines($languageConfiguration[self::LANGUAGE_CREDENTIALS] ?? ''),
                );

                return new Protection(
                    $this->realm($site),
                    [...$languageCredentials, ...$this->siteCredentials($site)],
                    'language:' . $language->getLanguageId(),
                );
            }
        }

        if ($this->isTruthy($this->setting($site, self::SETTING_ENABLED, false))) {
            return new Protection($this->realm($site), $this->siteCredentials($site), 'site');
        }

        return null;
    }

    /**
     * @return list<Credential>
     */
    public function siteCredentials(Site $site): array
    {
        return Protection::parseCredentials($this->toLines($this->setting($site, self::SETTING_CREDENTIALS, [])));
    }

    public function realm(Site $site): string
    {
        $realm = $this->setting($site, self::SETTING_REALM, '');

        return is_string($realm) && trim($realm) !== '' ? trim($realm) : Protection::DEFAULT_REALM;
    }

    public function allowsBackendUsers(Site $site): bool
    {
        return $this->isTruthy($this->setting($site, self::SETTING_ALLOW_BACKEND_USERS, true));
    }

    /**
     * Site settings may come from settings.yaml, the settings editor or %env()% placeholders,
     * so the value type is only known at runtime.
     */
    private function setting(Site $site, string $identifier, mixed $default): mixed
    {
        return $site->getSettings()->get($identifier, $default);
    }

    /**
     * @return list<string>
     */
    private function toLines(mixed $value): array
    {
        if (is_string($value)) {
            return preg_split('/\R/', $value) ?: [];
        }
        if (!is_array($value)) {
            return [];
        }

        return array_values(array_filter($value, is_string(...)));
    }

    private function isTruthy(mixed $value): bool
    {
        return $value === true || $value === 1 || $value === '1' || $value === 'true';
    }
}
