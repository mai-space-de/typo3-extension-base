<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Backend\RecordModule;

use Maispace\MaiBase\Backend\RecordModule\RecordModuleRegistry;
use Maispace\MaiBase\Controller\Backend\RecordModuleController;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class RecordModuleRegistryTest extends TestCase
{
    private RecordModuleRegistry $subject;

    protected function setUp(): void
    {
        $this->subject = new RecordModuleRegistry();
    }

    #[Test]
    public function getDefinitionsRegistersTxMaiTables(): void
    {
        $definitions = $this->subject->getDefinitions([
            'tx_mainews_news' => [
                'ctrl' => [
                    'title' => 'News',
                    'iconfile' => 'EXT:mai_base/Resources/Public/Icons/generic_table.svg',
                ],
            ],
            'pages' => [
                'ctrl' => [
                    'title' => 'Page',
                ],
            ],
            'tt_content' => [
                'ctrl' => [
                    'title' => 'Content',
                ],
            ],
        ]);

        self::assertCount(1, $definitions);
        self::assertSame('tx_mainews_news', $definitions[0]->table);
        self::assertSame('mai_records_tx_mainews_news', $definitions[0]->identifier);
        self::assertSame('News', $definitions[0]->title);
        self::assertSame('mai_records', $definitions[0]->parent);
        self::assertSame([], $definitions[0]->pids);
        self::assertSame('EXT:mai_base/Resources/Public/Icons/generic_table.svg', $definitions[0]->icon);
    }

    #[Test]
    public function getDefinitionsSkipsHiddenTables(): void
    {
        $definitions = $this->subject->getDefinitions([
            'tx_maitheme_slider_item' => [
                'ctrl' => [
                    'title' => 'Slide',
                    'hideTable' => true,
                ],
            ],
        ]);

        self::assertSame([], $definitions);
    }

    #[Test]
    public function getDefinitionsSkipsDisabledRecordModules(): void
    {
        $definitions = $this->subject->getDefinitions([
            'tx_maimail_queue' => [
                'ctrl' => [
                    'title' => 'Mail Queue',
                    'EXT' => [
                        'mai_base' => [
                            'recordModule' => [
                                'enable' => false,
                            ],
                        ],
                    ],
                ],
            ],
        ]);

        self::assertSame([], $definitions);
    }

    #[Test]
    public function getDefinitionsAppliesOverridesAndSorts(): void
    {
        $definitions = $this->subject->getDefinitions([
            'tx_maib_second' => [
                'ctrl' => [
                    'title' => 'Second',
                    'EXT' => [
                        'mai_base' => [
                            'recordModule' => [
                                'sorting' => 20,
                            ],
                        ],
                    ],
                ],
            ],
            'tx_maia_first' => [
                'ctrl' => [
                    'title' => 'Default Title',
                    'EXT' => [
                        'mai_base' => [
                            'recordModule' => [
                                'sorting' => 10,
                                'title' => 'Custom First',
                                'parent' => 'web',
                                'pids' => '5,6',
                                'iconIdentifier' => 'mai-table',
                            ],
                        ],
                    ],
                ],
            ],
        ]);

        self::assertCount(2, $definitions);
        self::assertSame('tx_maia_first', $definitions[0]->table);
        self::assertSame('Custom First', $definitions[0]->title);
        self::assertSame('web', $definitions[0]->parent);
        self::assertSame([5, 6], $definitions[0]->pids);
        self::assertSame('mai-table', $definitions[0]->iconIdentifier);
        self::assertSame(10, $definitions[0]->sorting);
        self::assertSame('tx_maib_second', $definitions[1]->table);
    }

    #[Test]
    public function getDefinitionsUsesRootLevelAsPidZero(): void
    {
        $definitions = $this->subject->getDefinitions([
            'tx_maiaccount_interest' => [
                'ctrl' => [
                    'title' => 'Interest',
                    'EXT' => [
                        'mai_base' => [
                            'recordModule' => [
                                'root_level' => 1,
                            ],
                        ],
                    ],
                ],
            ],
        ]);

        self::assertSame([0], $definitions[0]->pids);
    }

    #[Test]
    public function toModuleConfigurationBuildsExtbaseModule(): void
    {
        $definitions = $this->subject->getDefinitions([
            'tx_mainews_news' => [
                'ctrl' => [
                    'title' => 'News',
                    'EXT' => [
                        'mai_base' => [
                            'recordModule' => [
                                'pids' => [12],
                                'iconIdentifier' => 'mai-table',
                            ],
                        ],
                    ],
                ],
            ],
        ]);

        $configuration = $this->subject->toModuleConfiguration($definitions[0]);

        self::assertSame('mai_records', $configuration['parent']);
        self::assertSame('', $configuration['navigationComponent']);
        self::assertSame(
            [RecordModuleController::class => ['index']],
            $configuration['controllerActions'],
        );
        self::assertSame('tx_mainews_news', $configuration['moduleData']['table']);
        self::assertSame([12], $configuration['moduleData']['pids']);
        self::assertSame('mai-table', $configuration['iconIdentifier']);
    }

    #[Test]
    public function toModuleConfigurationUsesPageTreeWithoutPids(): void
    {
        $definitions = $this->subject->getDefinitions([
            'tx_mainews_news' => [
                'ctrl' => [
                    'title' => 'News',
                ],
            ],
        ]);

        $configuration = $this->subject->toModuleConfiguration($definitions[0]);

        self::assertSame('@typo3/backend/tree/page-tree-element', $configuration['navigationComponent']);
    }

    #[Test]
    public function shouldRegisterRejectsNonMaiTables(): void
    {
        self::assertFalse($this->subject->shouldRegister('tt_content', ['ctrl' => []]));
        self::assertTrue($this->subject->shouldRegister('tx_mainews_news', ['ctrl' => []]));
    }
}
