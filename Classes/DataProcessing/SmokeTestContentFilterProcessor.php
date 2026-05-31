<?php

declare(strict_types=1);

namespace Maispace\MaiBase\DataProcessing;

use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;

final class SmokeTestContentFilterProcessor implements DataProcessorInterface
{
    public function process(
        ContentObjectRenderer $cObj,
        array $contentObjectConfiguration,
        array $processorConfiguration,
        array $processedData,
    ): array {
        return $processedData;
    }
}
