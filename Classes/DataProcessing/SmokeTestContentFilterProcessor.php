<?php

declare(strict_types=1);

namespace Maispace\MaiBase\DataProcessing;

use Maispace\MaiBase\SmokeTest\SmokeTestContentFilter;
use TYPO3\CMS\Core\Page\ContentAreaCollection;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;

/**
 * Applies smoke_ctype / smoke_plugin isolation to the page-content variable for Fluid.
 *
 * Record filtering for rendered output is handled by SmokeTestContentFilterListener
 * on AfterContentHasBeenFetchedEvent (see f:mark.contentArea).
 */
final class SmokeTestContentFilterProcessor implements DataProcessorInterface
{
    public function process(
        ContentObjectRenderer $cObj,
        array $contentObjectConfiguration,
        array $processorConfiguration,
        array $processedData,
    ): array {
        $request = $cObj->getRequest();
        $pageId = $request->getAttribute('routing')?->getPageId();
        if ($pageId === null) {
            return $processedData;
        }

        $targetVariableName = $cObj->stdWrapValue('as', $processorConfiguration, 'content');
        $content = $processedData[$targetVariableName] ?? null;
        if (!$content instanceof ContentAreaCollection) {
            return $processedData;
        }

        $filter = new SmokeTestContentFilter();
        $groupedContent = $content->getGroupedRecords($request);
        $filtered = $filter->filterGroupedContent(
            $groupedContent,
            $pageId,
            $request->getQueryParams(),
        );
        $processedData[$targetVariableName] = $content->withUpdatedRecords($filtered);

        return $processedData;
    }
}
