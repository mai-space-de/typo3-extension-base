<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Utility;

final class CsvFormatter
{
    public static function format(
        array $rows,
        string $separator = ';',
        bool $includeUtf8Bom = true,
    ): string {
        $handle = fopen('php://temp', 'r+');
        foreach ($rows as $row) {
            fputcsv($handle, $row, $separator);
        }
        rewind($handle);
        $csv = stream_get_contents($handle);
        fclose($handle);

        if ($includeUtf8Bom) {
            $csv = "\xEF\xBB\xBF" . $csv;
        }

        return $csv;
    }
}
