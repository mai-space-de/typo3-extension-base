<?php

declare(strict_types=1);

namespace Maispace\MaiBase\HttpBasicAuth;

/**
 * A resolved HTTP Basic Auth lock: the realm shown in the browser prompt and
 * every credential that opens it. An empty credential list locks everybody out
 * (fail closed) instead of silently publishing the content.
 */
final readonly class Protection
{
    public const string DEFAULT_REALM = 'Protected area';

    /** @var list<Credential> */
    public array $credentials;

    /**
     * @param iterable<Credential> $credentials
     */
    public function __construct(
        public string $realm,
        iterable $credentials,
        public string $source = '',
    ) {
        $list = [];
        foreach ($credentials as $credential) {
            $list[] = $credential;
        }
        $this->credentials = $list;
    }

    /**
     * Builds the credential list from `username:password` lines; a string is split on newlines.
     *
     * @param iterable<mixed>|string $lines
     * @return list<Credential>
     */
    public static function parseCredentials(iterable|string $lines): array
    {
        if (is_string($lines)) {
            $lines = preg_split('/\R/', $lines) ?: [];
        }
        $credentials = [];
        foreach ($lines as $line) {
            if (!is_string($line)) {
                continue;
            }
            $credential = Credential::fromString($line);
            if ($credential !== null) {
                $credentials[] = $credential;
            }
        }

        return $credentials;
    }

    public function hasCredentials(): bool
    {
        return $this->credentials !== [];
    }

    public function accepts(string $username, string $password): bool
    {
        $accepted = false;
        foreach ($this->credentials as $credential) {
            // No early return: check every entry so the response time does not reveal which one matched.
            $accepted = $credential->matches($username, $password) || $accepted;
        }

        return $accepted;
    }
}
