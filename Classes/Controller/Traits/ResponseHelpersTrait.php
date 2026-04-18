<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

use Maispace\MaiBase\Utility\CsvFormatter;
use Psr\Http\Message\ResponseInterface;

trait ResponseHelpersTrait
{
    protected function dataAsJsonResponse(array $data, int $status = 200): ResponseInterface
    {
        $json = json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        return $this->responseFactory
            ->createResponse($status)
            ->withHeader('Content-Type', 'application/json; charset=utf-8')
            ->withBody($this->streamFactory->createStream($json));
    }

    protected function xmlResponse(string $xml, int $status = 200): ResponseInterface
    {
        return $this->responseFactory
            ->createResponse($status)
            ->withHeader('Content-Type', 'application/xml; charset=utf-8')
            ->withBody($this->streamFactory->createStream($xml));
    }

    protected function pdfResponse(string $content, string $filename, int $status = 200): ResponseInterface
    {
        return $this->responseFactory
            ->createResponse($status)
            ->withHeader('Content-Type', 'application/pdf')
            ->withHeader('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->withHeader('Content-Length', (string) strlen($content))
            ->withBody($this->streamFactory->createStream($content));
    }

    protected function fileDownloadResponse(
        string $content,
        string $filename,
        string $contentType,
        bool $inline = false,
        int $status = 200,
    ): ResponseInterface {
        $disposition = $inline ? 'inline' : 'attachment';

        return $this->responseFactory
            ->createResponse($status)
            ->withHeader('Content-Type', $contentType)
            ->withHeader('Content-Disposition', $disposition . '; filename="' . $filename . '"')
            ->withHeader('Content-Length', (string) strlen($content))
            ->withBody($this->streamFactory->createStream($content));
    }

    protected function csvResponse(
        array $rows,
        string $filename,
        string $separator = ';',
        bool $includeUtf8Bom = true,
        int $status = 200,
    ): ResponseInterface {
        $content = CsvFormatter::format($rows, $separator, $includeUtf8Bom);

        return $this->fileDownloadResponse($content, $filename, 'text/csv; charset=utf-8', false, $status);
    }
}
