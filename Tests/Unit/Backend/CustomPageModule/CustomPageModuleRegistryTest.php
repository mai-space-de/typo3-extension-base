<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Backend\CustomPageModule;

use Maispace\MaiBase\Backend\CustomPageModule\CustomPageModuleRegistry;
use Maispace\MaiBase\Backend\CustomPageModule\DoktypeIds;
use Maispace\MaiBase\Controller\Backend\CustomPageModuleController;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class CustomPageModuleRegistryTest extends TestCase
{
    private CustomPageModuleRegistry $subject;

    protected function setUp(): void
    {
        $this->subject = new CustomPageModuleRegistry();
    }

    #[Test]
    public function getDefinitionsRegistersCustomPageModulesFromPagesCtrl(): void
    {
        $definitions = $this->subject->getDefinitions([
            'pages' => [
                'ctrl' => [
                    'EXT' => [
                        'mai_base' => [
                            'customPageModules' => [
                                'news' => [
                                    'doktype' => DoktypeIds::NEWS,
                                    'title' => 'News',
                                    'iconIdentifier' => 'content-news',
                                    'parentPidSetting' => 'customPages.news.parentPid',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ]);

        self::assertCount(1, $definitions);
        self::assertSame('news', $definitions[0]->key);
        self::assertSame('mai_pages_news', $definitions[0]->identifier);
        self::assertSame('News', $definitions[0]->title);
        self::assertSame('mai_pages', $definitions[0]->parent);
        self::assertSame([DoktypeIds::NEWS], $definitions[0]->doktypes);
        self::assertSame('content-news', $definitions[0]->iconIdentifier);
        self::assertSame('customPages.news.parentPid', $definitions[0]->parentPidSetting);
    }

    #[Test]
    public function getDefinitionsSkipsDisabledModules(): void
    {
        $definitions = $this->subject->getDefinitions([
            'pages' => [
                'ctrl' => [
                    'EXT' => [
                        'mai_base' => [
                            'customPageModules' => [
                                'news' => [
                                    'doktype' => DoktypeIds::NEWS,
                                    'enable' => false,
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ]);

        self::assertSame([], $definitions);
    }

    #[Test]
    public function getDefinitionsSkipsModulesWithoutDoktype(): void
    {
        $definitions = $this->subject->getDefinitions([
            'pages' => [
                'ctrl' => [
                    'EXT' => [
                        'mai_base' => [
                            'customPageModules' => [
                                'broken' => [
                                    'title' => 'Broken',
                                ],
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
            'pages' => [
                'ctrl' => [
                    'EXT' => [
                        'mai_base' => [
                            'customPageModules' => [
                                'event' => [
                                    'doktype' => DoktypeIds::EVENT,
                                    'sorting' => 20,
                                    'title' => 'Events',
                                ],
                                'news' => [
                                    'doktypes' => [DoktypeIds::NEWS],
                                    'sorting' => 10,
                                    'title' => 'News',
                                    'parent' => 'web',
                                    'pids' => '5,6',
                                    'identifier' => 'custom_news_mod',
                                    'iconIdentifier' => 'content-news',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ]);

        self::assertCount(2, $definitions);
        self::assertSame('news', $definitions[0]->key);
        self::assertSame('custom_news_mod', $definitions[0]->identifier);
        self::assertSame('web', $definitions[0]->parent);
        self::assertSame([5, 6], $definitions[0]->pids);
        self::assertSame('event', $definitions[1]->key);
    }

    #[Test]
    public function toModuleConfigurationBuildsExtbaseModuleWithoutPageTree(): void
    {
        $definitions = $this->subject->getDefinitions([
            'pages' => [
                'ctrl' => [
                    'EXT' => [
                        'mai_base' => [
                            'customPageModules' => [
                                'news' => [
                                    'doktype' => DoktypeIds::NEWS,
                                    'title' => 'News',
                                    'pids' => [12],
                                    'iconIdentifier' => 'content-news',
                                    'parentPidSetting' => 'customPages.news.parentPid',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ]);

        $configuration = $this->subject->toModuleConfiguration($definitions[0]);

        self::assertSame('mai_pages', $configuration['parent']);
        self::assertSame('', $configuration['navigationComponent']);
        self::assertFalse($configuration['inheritNavigationComponentFromMainModule']);
        self::assertSame(
            [CustomPageModuleController::class => ['index']],
            $configuration['controllerActions'],
        );
        self::assertSame('pages', $configuration['moduleData']['table']);
        self::assertSame([DoktypeIds::NEWS], $configuration['moduleData']['doktypes']);
        self::assertSame([12], $configuration['moduleData']['pids']);
        self::assertSame('customPages.news.parentPid', $configuration['moduleData']['parentPidSetting']);
        self::assertSame('content-news', $configuration['iconIdentifier']);
    }
}
