<?php

declare(strict_types=1);

namespace Maispace\MaiBase\HttpBasicAuth;

/**
 * One username/password pair that unlocks an HTTP Basic Auth protection.
 *
 * The password may be stored in plain text or as a PHP password hash
 * (bcrypt/argon2, e.g. `password_hash('secret', PASSWORD_DEFAULT)` or a
 * TYPO3 `type=password` field). Hashes are checked with password_verify(),
 * plain values with a timing-safe comparison.
 */
final readonly class Credential
{
    public function __construct(
        public string $username,
        private string $password,
    ) {}

    /**
     * Parses `username:password`. Only the first colon separates the two, so the
     * password may contain colons (hashes like `$argon2id$v=19$m=…` stay intact).
     */
    public static function fromString(string $line): ?self
    {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) {
            return null;
        }
        $separator = strpos($line, ':');
        if ($separator === false || $separator === 0) {
            return null;
        }
        $password = substr($line, $separator + 1);
        if ($password === '') {
            return null;
        }

        return new self(substr($line, 0, $separator), $password);
    }

    public function matches(string $username, string $password): bool
    {
        // Compare both parts every time so a wrong username takes as long as a wrong password.
        $usernameMatches = hash_equals($this->username, $username);
        $passwordMatches = $this->isHashed()
            ? password_verify($password, $this->password)
            : hash_equals($this->password, $password);

        return $usernameMatches && $passwordMatches;
    }

    public function isHashed(): bool
    {
        return password_get_info($this->password)['algo'] !== null;
    }
}
