<?php

declare(strict_types=1);

namespace Maispace\MaiBase\EventListener;

use Maispace\MaiBase\SmokeTest\SmokeTestContentFilter;
use TYPO3\CMS\Frontend\Event\AfterContentHasBeenFetchedEvent;

/**
 * Renders a single CType or plugin on smoke-test pages when smoke_ctype / smoke_plugin is set.
 */
final class SmokeTestContentFilterListener
{
    public function __invoke(AfterContentHasBeenFetchedEvent $event): void
    {
        $request = $event->request;
        $pageId = $request->getAttribute('routing')?->getPageId();
        if ($pageId === null) {
            return;
        }

        $event->groupedContent = (new SmokeTestContentFilter())->filterGroupedContent(
            $event->groupedContent,
            $pageId,
            $request->getQueryParams(),
        );
    }
}
