<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

use TYPO3\CMS\Core\Type\ContextualFeedbackSeverity;

trait FlashMessageTrait
{
    protected function flashSuccess(string $message, string $title = ''): void
    {
        $this->addFlashMessage($message, $title, ContextualFeedbackSeverity::OK);
    }

    protected function flashError(string $message, string $title = ''): void
    {
        $this->addFlashMessage($message, $title, ContextualFeedbackSeverity::ERROR);
    }

    protected function flashInfo(string $message, string $title = ''): void
    {
        $this->addFlashMessage($message, $title, ContextualFeedbackSeverity::INFO);
    }

    protected function flashWarning(string $message, string $title = ''): void
    {
        $this->addFlashMessage($message, $title, ContextualFeedbackSeverity::WARNING);
    }
}
