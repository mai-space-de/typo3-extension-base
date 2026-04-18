<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

use Psr\Http\Message\ResponseInterface;

/**
 * Provides raw-data response helpers for Extbase ActionControllers.
 *
 * Uses $this->responseFactory and $this->streamFactory which are injected
 * by ActionController automatically in TYPO3 14.
 *
 * @require-extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
 */
trait ResponseHelpersTrait
{
    /**
     * Encodes $data to JSON and returns an application/json response.
     *
     * @param array<string, mixed> $data
     */
    protected function dataAsJsonResponse(array $data, int $status = 200): ResponseInterface
    {
        $json = json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

        return $this->responseFactory
            ->createResponse($status)
            ->withHeader('Content-Type', 'application/json; charset=utf-8')
            ->withBody($this->streamFactory->createStream($json));
    }

    /**
     * Returns an application/xml response from a pre-built XML string.
     */
    protected function xmlResponse(string $xml, int $status = 200): ResponseInterface
    {
        return $this->responseFactory
            ->createResponse($status)
            ->withHeader('Content-Type', 'application/xml; charset=utf-8')
            ->withBody($this->streamFactory->createStream($xml));
    }

    /**
     * Returns an application/pdf download response.
     *
     * $filename is the suggested browser download name, e.g. "report-2024.pdf".
     */
    protected function pdfResponse(string $content, string $filename, int $status = 200): ResponseInterface
    {
        return $this->responseFactory
            ->createResponse($status)
            ->withHeader('Content-Type', 'application/pdf')
            ->withHeader('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->withHeader('Content-Length', (string) strlen($content))
            ->withBody($this->streamFactory->createStream($content));
    }
}
