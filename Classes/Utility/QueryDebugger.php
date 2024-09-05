<?php

namespace Maispace\Base\Utility;

use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Persistence\Generic\Storage\Typo3DbQueryParser;
use TYPO3\CMS\Extbase\Persistence\QueryInterface;
use TYPO3\CMS\Extbase\Utility\DebuggerUtility;

class QueryDebugger
{
    public static function debug(QueryInterface $query, bool $die = false): void
    {
        $queryParser = GeneralUtility::makeInstance(Typo3DbQueryParser::class);
        DebuggerUtility::var_dump($queryParser->convertQueryToDoctrineQueryBuilder($query)->getSQL());
        DebuggerUtility::var_dump($queryParser->convertQueryToDoctrineQueryBuilder($query)->getParameters());
        if ($die) {
            exit();
        }
    }
}
