<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

use Maispace\MaiBase\Captcha\CaptchaVerifier;
use TYPO3\CMS\Core\Type\ContextualFeedbackSeverity;
use TYPO3\CMS\Extbase\Utility\LocalizationUtility;

/**
 * Adds invisible captcha verification to an Extbase action controller.
 *
 * Render <captcha:field /> inside the form:
 *
 *     if (!$this->isCaptchaValid()) {
 *         $this->flashCaptchaError();
 *         return $this->redirect('form');
 *     }
 */
trait CaptchaProtectedTrait
{
    private ?CaptchaVerifier $captchaVerifier = null;

    public function injectCaptchaVerifier(CaptchaVerifier $captchaVerifier): void
    {
        $this->captchaVerifier = $captchaVerifier;
    }

    protected function isCaptchaValid(): bool
    {
        // Fail closed: a controller without the injected verifier must never skip the check.
        return $this->captchaVerifier instanceof CaptchaVerifier
            && $this->captchaVerifier->verifyRequest($this->request);
    }

    protected function flashCaptchaError(): void
    {
        $message = LocalizationUtility::translate('captcha.failed', 'MaiBase')
            ?? 'The security check failed. Please try again.';
        $this->addFlashMessage($message, '', ContextualFeedbackSeverity::ERROR);
    }
}
