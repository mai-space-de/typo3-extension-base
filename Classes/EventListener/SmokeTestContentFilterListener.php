<?php

declare(strict_types=1);

namespace Maispace\MaiBase\EventListener;

use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Attribute\AsEventListener;
use TYPO3\CMS\Frontend\Event\AfterContentHasBeenFetchedEvent;

/**
 * Renders a single CType or plugin on smoke-test pages when smoke_ctype / smoke_plugin is set.
 */
#[AsEventListener(identifier: 'mai-base/smoke-test-filter')]
final class SmokeTestContentFilterListener
{
    private const CTYPE_PAGE_UID = 10001;
    private const PLUGIN_PAGE_UID = 10002;

    public function __invoke(AfterContentHasBeenFetchedEvent $event): void
    {
        $request = $event->request;
        $pageId = $request->getAttribute('routing')?->getPageId();
        if ($pageId === null) {
            return;
        }

        $queryParams = $request->getQueryParams();

        $filterCType = match ($pageId) {
            self::CTYPE_PAGE_UID => $this->readNonEmptyString($queryParams['smoke_ctype'] ?? null),
            self::PLUGIN_PAGE_UID => $this->readNonEmptyString($queryParams['smoke_plugin'] ?? $queryParams['smoke_ctype'] ?? null),
            default => null,
        };

        if ($filterCType === null) {
            return;
        }

        foreach ($event->groupedContent as $columnIdentifier => $column) {
            if (!isset($column['records'])) {
                continue;
            }

            $filteredRecords = array_values(array_filter(
                $column['records'],
                static fn(\TYPO3\CMS\Core\Domain\Record $record): bool => ($record->get('CType') ?? '') === $filterCType,
            ));

            $event->groupedContent[$columnIdentifier]['records'] = $filteredRecords;
        }
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
