<?php

declare(strict_types=1);

namespace Maispace\MaiBase\EventListener;

use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Attribute\AsEventListener;
use TYPO3\CMS\Core\Routing\PageArguments;
use TYPO3\CMS\Frontend\ContentObject\Event\ModifyRecordsAfterFetchingContentEvent;

/**
 * Renders a single CType or plugin on smoke-test pages when smoke_ctype / smoke_plugin is set.
 */
final class SmokeTestContentFilterListener
{
    private const CTYPE_PAGE_UID = 10001;
    private const PLUGIN_PAGE_UID = 10002;

    #[AsEventListener]
    public function __invoke(ModifyRecordsAfterFetchingContentEvent $event): void
    {
        $request = $GLOBALS['TYPO3_REQUEST'] ?? null;
        if (!$request instanceof ServerRequestInterface) {
            return;
        }

        $pageArguments = $request->getAttribute('routing');
        if (!$pageArguments instanceof PageArguments) {
            return;
        }

        $pageId = $pageArguments->getPageId();
        $queryParams = $request->getQueryParams();

        $filterCType = match ($pageId) {
            self::CTYPE_PAGE_UID => $this->readNonEmptyString($queryParams['smoke_ctype'] ?? null),
            self::PLUGIN_PAGE_UID => $this->readNonEmptyString($queryParams['smoke_plugin'] ?? $queryParams['smoke_ctype'] ?? null),
            default => null,
        };

        if ($filterCType === null) {
            return;
        }

        $filteredRecords = array_values(array_filter(
            $event->getRecords(),
            static fn(array $record): bool => ($record['CType'] ?? '') === $filterCType,
        ));

        $event->setRecords($filteredRecords);
    }

    private function readNonEmptyString(mixed $value): ?string
    {
        if (!is_string($value)) {
            return null;
        }

        $value = trim($value);

        return $value !== '' ? $value : null;
    }
}
