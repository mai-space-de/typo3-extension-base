<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Controller\Traits;

use Maispace\MaiBase\Controller\Traits\FlashMessageTrait;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Core\Type\ContextualFeedbackSeverity;

final class FlashMessageTraitTest extends TestCase
{
    #[Test]
    public function flashSuccessCallsAddFlashMessageWithOkSeverity(): void
    {
        $subject = $this->createTraitUser();
        $subject->callFlashSuccess('Done.', 'OK');

        self::assertSame([['Done.', 'OK', ContextualFeedbackSeverity::OK]], $subject->getCaptured());
    }

    #[Test]
    public function flashErrorCallsAddFlashMessageWithErrorSeverity(): void
    {
        $subject = $this->createTraitUser();
        $subject->callFlashError('Failed.', 'Error');

        self::assertSame([['Failed.', 'Error', ContextualFeedbackSeverity::ERROR]], $subject->getCaptured());
    }

    #[Test]
    public function flashInfoCallsAddFlashMessageWithInfoSeverity(): void
    {
        $subject = $this->createTraitUser();
        $subject->callFlashInfo('FYI.', 'Info');

        self::assertSame([['FYI.', 'Info', ContextualFeedbackSeverity::INFO]], $subject->getCaptured());
    }

    #[Test]
    public function flashWarningCallsAddFlashMessageWithWarningSeverity(): void
    {
        $subject = $this->createTraitUser();
        $subject->callFlashWarning('Watch out.', 'Warning');

        self::assertSame([['Watch out.', 'Warning', ContextualFeedbackSeverity::WARNING]], $subject->getCaptured());
    }

    private function createTraitUser(): object
    {
        return new class () {
            use FlashMessageTrait;

            private array $captured = [];

            protected function addFlashMessage(
                string $messageBody,
                string $messageTitle = '',
                ContextualFeedbackSeverity $severity = ContextualFeedbackSeverity::OK,
                bool $storeInSession = true,
            ): void {
                $this->captured[] = [$messageBody, $messageTitle, $severity];
            }

            public function getCaptured(): array
            {
                return $this->captured;
            }

            public function callFlashSuccess(string $message, string $title = ''): void { $this->flashSuccess($message, $title); }

            public function callFlashError(string $message, string $title = ''): void { $this->flashError($message, $title); }

            public function callFlashInfo(string $message, string $title = ''): void { $this->flashInfo($message, $title); }

            public function callFlashWarning(string $message, string $title = ''): void { $this->flashWarning($message, $title); }
        };
    }
}
