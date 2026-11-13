<?php

declare(strict_types=1);

namespace Maispace\MaiBase\ViewHelpers;

use Maispace\MaiBase\Captcha\CaptchaVerifier;
use TYPO3\CMS\Core\Page\AssetCollector;
use TYPO3\CMS\Core\Utility\PathUtility;
use TYPO3Fluid\Fluid\Core\ViewHelper\AbstractViewHelper;

/**
 * Renders the hidden token field of the invisible Cap.js captcha and loads the
 * locally bundled widget. Place it inside the form that has to be protected:
 *
 *     <captcha:field />
 *
 * The matching controller action has to call CaptchaVerifier::verifyRequest().
 */
class FieldViewHelper extends AbstractViewHelper
{
    private const string SCRIPT = 'EXT:mai_base/Resources/Public/JavaScript/dist/cap.js';

    private const string RUNTIME_DIRECTORY = 'EXT:mai_base/Resources/Public/JavaScript/dist/cap/';

    protected $escapeOutput = false;

    public function __construct(
        private readonly CaptchaVerifier $verifier,
        private readonly AssetCollector $assetCollector,
    ) {}

    public function render(): string
    {
        $endpoint = $this->verifier->getEndpoint();
        if ($endpoint === null) {
            // Not configured: render nothing. The server side decides whether that is acceptable
            // (skipped in development, rejected in production).
            return '';
        }

        $this->assetCollector->addJavaScript(
            'mai-captcha',
            $this->publicWebPath(self::SCRIPT),
            ['type' => 'module', 'defer' => 'defer'],
        );

        return sprintf(
            '<input type="hidden" name="%s" value="" data-mai-captcha-token data-endpoint="%s" data-assets="%s" />',
            CaptchaVerifier::FIELD_NAME,
            htmlspecialchars($endpoint, ENT_QUOTES),
            htmlspecialchars($this->publicWebPath(self::RUNTIME_DIRECTORY), ENT_QUOTES),
        );
    }

    protected function publicWebPath(string $resource): string
    {
        return PathUtility::getPublicResourceWebPath($resource);
    }
}
