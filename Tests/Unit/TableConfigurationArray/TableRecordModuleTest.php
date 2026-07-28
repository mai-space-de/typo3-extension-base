<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\TableConfigurationArray;

use Maispace\MaiBase\TableConfigurationArray\Table;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class TableRecordModuleTest extends TestCase
{
    #[Test]
    public function disableRecordModuleWritesEnableFalse(): void
    {
        $config = (new Table('My Table'))
            ->disableRecordModule()
            ->getConfig();

        self::assertSame(
            ['enable' => false],
            $config['ctrl']['EXT']['mai_base']['recordModule'],
        );
    }

    #[Test]
    public function configureRecordModuleMergesOptionsAndDefaultsEnableTrue(): void
    {
        $config = (new Table('My Table'))
            ->configureRecordModule([
                'pids' => [12, 34],
                'parent' => 'web',
                'sorting' => 20,
                'title' => 'Custom Title',
                'iconIdentifier' => 'mai-table',
            ])
            ->getConfig();

        self::assertSame(
            [
                'pids' => [12, 34],
                'parent' => 'web',
                'sorting' => 20,
                'title' => 'Custom Title',
                'iconIdentifier' => 'mai-table',
                'enable' => true,
            ],
            $config['ctrl']['EXT']['mai_base']['recordModule'],
        );
    }

    #[Test]
    public function configureRecordModuleCanDisableExplicitly(): void
    {
        $config = (new Table('My Table'))
            ->configureRecordModule(['enable' => false, 'sorting' => 5])
            ->getConfig();

        self::assertFalse($config['ctrl']['EXT']['mai_base']['recordModule']['enable']);
        self::assertSame(5, $config['ctrl']['EXT']['mai_base']['recordModule']['sorting']);
    }

    #[Test]
    public function disableRecordModulePreservesExistingOptions(): void
    {
        $config = (new Table('My Table'))
            ->configureRecordModule(['sorting' => 10, 'parent' => 'web'])
            ->disableRecordModule()
            ->getConfig();

        self::assertSame(
            [
                'sorting' => 10,
                'parent' => 'web',
                'enable' => false,
            ],
            $config['ctrl']['EXT']['mai_base']['recordModule'],
        );
    }
}
