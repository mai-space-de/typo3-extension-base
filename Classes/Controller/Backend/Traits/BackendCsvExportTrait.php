<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Backend\Traits;

use Maispace\MaiBase\Utility\CsvFormatter;
use Psr\Http\Message\ResponseInterface;

trait BackendCsvExportTrait
{
    protected function csvDownloadResponse(
        array $rows,
        string $filename,
        string $separator = ';',
        bool $includeUtf8Bom = true,
    ): ResponseInterface {
        $content = CsvFormatter::format($rows, $separator, $includeUtf8Bom);

        $stream = $this->streamFactory->createStream($content);

        return $this->responseFactory
            ->createResponse(200)
            ->withHeader('Content-Type', 'text/csv; charset=utf-8')
            ->withHeader('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->withHeader('Content-Length', (string) strlen($content))
            ->withBody($stream);
    }
}
