<?php

declare(strict_types=1);

namespace Maispace\MaiBase\DataProcessing;

use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\ContentObject\DataProcessorInterface;

class DebugProcessor implements DataProcessorInterface
{
    public function process(
        ContentObjectRenderer $cObj,
        array $contentObjectConfiguration,
        array $processorConfiguration,
        array $processedData,
    ): array {
        error_log('DebugProcessor called!');
        file_put_contents(
            '/tmp/debug-processor.log',
            sprintf(
                "[%s] DebugProcessor called! Keys: %s\n",
                date('Y-m-d H:i:s'),
                implode(', ', array_keys($processedData)),
            ),
            FILE_APPEND,
        );

        return $processedData;
    }
}
