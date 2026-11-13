<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Captcha;

use Psr\Http\Message\ServerRequestInterface;
use Psr\Log\LoggerInterface;
use TYPO3\CMS\Core\Core\Environment;
use TYPO3\CMS\Core\Http\RequestFactory;

/**
 * Verifies Cap.js tokens against the self-hosted captcha service.
 *
 * The public API endpoint is rendered into the form; the secret never leaves the
 * server and is read from the environment (CAP_SECRET).
 */
class CaptchaVerifier
{
    public const string FIELD_NAME = 'mai_captcha_token';

    private const int TIMEOUT_SECONDS = 5;

    public function __construct(
        private readonly RequestFactory $requestFactory,
        private readonly LoggerInterface $logger,
        private readonly ?string $endpoint = null,
        private readonly ?string $secret = null,
        private readonly ?bool $enforced = null,
    ) {}

    /**
     * Public API endpoint including the site key, or null when CAP_API_ENDPOINT is not set.
     */
    public function getEndpoint(): ?string
    {
        $endpoint = $this->endpoint ?? $this->env('CAP_API_ENDPOINT');

        return $endpoint === null ? null : rtrim($endpoint, '/') . '/';
    }

    public function verifyRequest(ServerRequestInterface $request): bool
    {
        $body = $request->getParsedBody();
        $token = is_array($body) && is_string($body[self::FIELD_NAME] ?? null) ? $body[self::FIELD_NAME] : '';

        return $this->verifyToken($token);
    }

    public function verifyToken(string $token): bool
    {
        $secret = $this->secret ?? $this->env('CAP_SECRET');
        $endpoint = $this->getEndpoint();
        if ($secret === null || $endpoint === null) {
            if ($this->isEnforced()) {
                $this->logger->error('Captcha is enforced but CAP_API_ENDPOINT or CAP_SECRET is not configured; rejecting submission.');

                return false;
            }

            return true;
        }

        if ($token === '') {
            return false;
        }

        try {
            $response = $this->requestFactory->request(
                $endpoint . 'siteverify',
                'POST',
                [
                    'json' => ['secret' => $secret, 'response' => $token],
                    'timeout' => self::TIMEOUT_SECONDS,
                    'http_errors' => false,
                ],
            );
            $result = json_decode((string) $response->getBody(), true);
        } catch (\Throwable $exception) {
            $this->logger->error('Captcha verification request failed.', ['exception' => $exception]);

            return false;
        }

        return is_array($result) && ($result['success'] ?? false) === true;
    }

    private function isEnforced(): bool
    {
        return $this->enforced ?? Environment::getContext()->isProduction();
    }

    private function env(string $name): ?string
    {
        $value = getenv($name);

        return is_string($value) && $value !== '' ? $value : null;
    }
}
