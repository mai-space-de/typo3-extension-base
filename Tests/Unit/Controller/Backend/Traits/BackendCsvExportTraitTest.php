<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Controller\Backend\Traits;

use Maispace\MaiBase\Controller\Backend\Traits\BackendCsvExportTrait;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\StreamFactoryInterface;
use Psr\Http\Message\StreamInterface;

final class BackendCsvExportTraitTest extends TestCase
{
    #[Test]
    public function csvDownloadResponseSetsCsvHeadersAndAttachmentDisposition(): void
    {
        $rows = [['Name', 'Email'], ['Alice', 'alice@example.com']];
        $filename = 'export.csv';

        $subject = $this->createTraitUser();
        $response = $subject->callCsvDownloadResponse($rows, $filename);

        self::assertSame(200, $response->getStatusCode());
        self::assertSame('text/csv; charset=utf-8', $response->getHeaderLine('Content-Type'));
        self::assertSame('attachment; filename="export.csv"', $response->getHeaderLine('Content-Disposition'));
    }

    #[Test]
    public function csvDownloadResponseIncludesContentLengthHeader(): void
    {
        $rows = [['a', 'b']];
        $subject = $this->createTraitUser();
        $response = $subject->callCsvDownloadResponse($rows, 'data.csv');

        self::assertNotEmpty($response->getHeaderLine('Content-Length'));
    }

    private function createTraitUser(): object
    {
        $responseFactory = $this->createMock(ResponseFactoryInterface::class);
        $streamFactory = $this->createMock(StreamFactoryInterface::class);

        $responseFactory->method('createResponse')->willReturnCallback(function (int $status) {
            return new class ($status) implements ResponseInterface {
                private array $headers = [];
                private StreamInterface $body;

                public function __construct(private readonly int $statusCode)
                {
                    $this->body = new class () implements StreamInterface {
                        private string $content = '';

                        public function __toString(): string { return $this->content; }
                        public function close(): void {}
                        public function detach() { return null; }
                        public function getSize(): ?int { return strlen($this->content); }
                        public function tell(): int { return 0; }
                        public function eof(): bool { return true; }
                        public function isSeekable(): bool { return false; }
                        public function seek(int $offset, int $whence = SEEK_SET): void {}
                        public function rewind(): void {}
                        public function isWritable(): bool { return true; }
                        public function write(string $string): int { $this->content .= $string; return strlen($string); }
                        public function isReadable(): bool { return true; }
                        public function read(int $length): string { return $this->content; }
                        public function getContents(): string { return $this->content; }
                        public function getMetadata(?string $key = null) { return null; }
                    };
                }

                public function getStatusCode(): int { return $this->statusCode; }
                public function withStatus(int $code, string $reasonPhrase = ''): ResponseInterface { return $this; }
                public function getReasonPhrase(): string { return ''; }
                public function getProtocolVersion(): string { return '1.1'; }
                public function withProtocolVersion(string $version): static { return $this; }
                public function getHeaders(): array { return $this->headers; }
                public function hasHeader(string $name): bool { return isset($this->headers[strtolower($name)]); }
                public function getHeader(string $name): array { return $this->headers[strtolower($name)] ?? []; }
                public function getHeaderLine(string $name): string { return implode(', ', $this->getHeader($name)); }
                public function withHeader(string $name, $value): static
                {
                    $clone = clone $this;
                    $clone->headers[strtolower($name)] = is_array($value) ? $value : [$value];
                    return $clone;
                }
                public function withAddedHeader(string $name, $value): static { return $this->withHeader($name, $value); }
                public function withoutHeader(string $name): static
                {
                    $clone = clone $this;
                    unset($clone->headers[strtolower($name)]);
                    return $clone;
                }
                public function getBody(): StreamInterface { return $this->body; }
                public function withBody(StreamInterface $body): static
                {
                    $clone = clone $this;
                    $clone->body = $body;
                    return $clone;
                }
            };
        });

        $streamFactory->method('createStream')->willReturnCallback(function (string $content) {
            $stream = $this->createMock(StreamInterface::class);
            $stream->method('__toString')->willReturn($content);
            return $stream;
        });

        return new class ($responseFactory, $streamFactory) {
            use BackendCsvExportTrait;

            protected ResponseFactoryInterface $responseFactory;
            protected StreamFactoryInterface $streamFactory;

            public function __construct(ResponseFactoryInterface $responseFactory, StreamFactoryInterface $streamFactory)
            {
                $this->responseFactory = $responseFactory;
                $this->streamFactory = $streamFactory;
            }

            public function callCsvDownloadResponse(
                array $rows,
                string $filename,
                string $separator = ';',
                bool $includeUtf8Bom = true,
            ): ResponseInterface {
                return $this->csvDownloadResponse($rows, $filename, $separator, $includeUtf8Bom);
            }
        };
    }
}
