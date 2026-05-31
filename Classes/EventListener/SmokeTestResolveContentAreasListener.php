<?php

declare(strict_types=1);

namespace Maispace\MaiBase\EventListener;

use Maispace\MaiBase\SmokeTest\SmokeTestContentFilter;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Core\Page\ContentArea;
use TYPO3\CMS\Core\Page\ContentAreaClosure;
use TYPO3\CMS\Core\Page\ResolveContentAreasEvent;

/**
 * Wraps content-area closures so smoke_ctype / smoke_plugin query params render one CE/plugin only.
 */
final class SmokeTestResolveContentAreasListener
{
    public function __construct(
        private readonly SmokeTestContentFilter $smokeTestContentFilter,
    ) {}

    public function __invoke(ResolveContentAreasEvent $event): void
    {
        $wrapped = [];
        foreach ($event->getContentAreas() as $identifier => $area) {
            if (!$area instanceof ContentAreaClosure) {
                $wrapped[$identifier] = $area;
                continue;
            }

            $wrapped[$identifier] = new ContentAreaClosure(
                function (ServerRequestInterface $request) use ($area): ContentArea {
                    $contentArea = $area->instantiate($request);
                    $pageId = $request->getAttribute('routing')?->getPageId();
                    if ($pageId === null) {
                        return $contentArea;
                    }

                    $filterCType = $this->smokeTestContentFilter->resolveFilterCType(
                        $pageId,
                        $request->getQueryParams(),
                    );
                    if ($filterCType === null) {
                        return $contentArea;
                    }

                    $records = array_values(array_filter(
                        $contentArea->getRecords(),
                        static fn(mixed $record): bool => SmokeTestContentFilter::matchesCType($record, $filterCType),
                    ));

                    return $contentArea->withRecords($records);
                },
            );
        }

        $event->setContentAreas($wrapped);
    }
}
