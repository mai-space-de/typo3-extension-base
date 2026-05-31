<?php

declare(strict_types=1);

namespace Maispace\MaiBase\SmokeTest;

use TYPO3\CMS\Core\Domain\Record;

/**
 * Filters tt_content records on smoke-test pages when smoke_ctype / smoke_plugin is set.
 */
final class SmokeTestContentFilter
{
    private const CTYPE_PAGE_UID = 10001;
    private const PLUGIN_PAGE_UID = 10002;

    public function resolveFilterCType(int $pageId, array $queryParams): ?string
    {
        return match ($pageId) {
            self::CTYPE_PAGE_UID => $this->readNonEmptyString($queryParams['smoke_ctype'] ?? null),
            self::PLUGIN_PAGE_UID => $this->readNonEmptyString(
                $queryParams['smoke_plugin'] ?? $queryParams['smoke_ctype'] ?? null,
            ),
            default => null,
        };
    }

    public static function matchesCType(mixed $record, string $filterCType): bool
    {
        return self::recordCType($record) === $filterCType;
    }

    /**
     * @param array<string, array<string, mixed>> $groupedContent
     * @return array<string, array<string, mixed>>
     */
    public function filterGroupedContent(array $groupedContent, int $pageId, array $queryParams): array
    {
        $filterCType = $this->resolveFilterCType($pageId, $queryParams);

        if ($filterCType === null) {
            return $groupedContent;
        }

        foreach ($groupedContent as $columnIdentifier => $column) {
            if (!isset($column['records']) || !is_array($column['records'])) {
                continue;
            }

            $groupedContent[$columnIdentifier]['records'] = array_values(array_filter(
                $column['records'],
                static fn(mixed $record): bool => self::recordCType($record) === $filterCType,
            ));
        }

        return $groupedContent;
    }

    private static function recordCType(mixed $record): string
    {
        if ($record instanceof Record) {
            $recordType = $record->getRecordType();
            if (is_string($recordType) && $recordType !== '') {
                return $recordType;
            }

            try {
                return (string) $record->get('CType');
            } catch (\Throwable) {
                return '';
            }
        }

        if (is_array($record)) {
            return (string) ($record['CType'] ?? $record['cType'] ?? '');
        }

        return '';
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
