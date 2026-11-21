<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\EventListener;

use Maispace\MaiBase\EventListener\AddBasicAuthPaletteToPageTypes;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use TYPO3\CMS\Core\Configuration\Event\AfterTcaCompilationEvent;

final class AddBasicAuthPaletteToPageTypesTest extends TestCase
{
    /**
     * @return array<string, mixed>
     */
    private function tca(): array
    {
        return [
            'pages' => [
                'palettes' => [AddBasicAuthPaletteToPageTypes::PALETTE => ['showitem' => 'x']],
                'types' => [
                    '1' => ['showitem' => '--div--;Access, --palette--;;visibility, --palette--;;access, --div--;Notes, rowDescription'],
                    '120' => ['showitem' => '--palette--;Label;access, title'],
                    '254' => ['showitem' => 'title, hidden'],
                ],
            ],
        ];
    }

    #[Test]
    public function paletteFollowsTheAccessPaletteOfEveryTypeTest(): void
    {
        $event = new AfterTcaCompilationEvent($this->tca());
        (new AddBasicAuthPaletteToPageTypes())($event);
        $types = $event->getTca()['pages']['types'];

        self::assertSame(
            '--div--;Access, --palette--;;visibility, --palette--;;access, --palette--;;maiBaseBasicAuth, --div--;Notes, rowDescription',
            $types['1']['showitem'],
        );
        self::assertSame('--palette--;Label;access, --palette--;;maiBaseBasicAuth, title', $types['120']['showitem']);
        self::assertSame('title, hidden', $types['254']['showitem']);
    }

    #[Test]
    public function runningTwiceAddsThePaletteOnceTest(): void
    {
        $listener = new AddBasicAuthPaletteToPageTypes();
        $tca = $listener->addPalette($listener->addPalette($this->tca()));

        self::assertSame(1, substr_count($tca['pages']['types']['1']['showitem'], 'maiBaseBasicAuth'));
    }

    #[Test]
    public function nothingHappensWithoutThePaletteTest(): void
    {
        $tca = $this->tca();
        unset($tca['pages']['palettes']);

        self::assertSame($tca, (new AddBasicAuthPaletteToPageTypes())->addPalette($tca));
    }
}
