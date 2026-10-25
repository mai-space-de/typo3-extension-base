<?php

declare(strict_types=1);

use Maispace\MaiBase\Backend\CustomPageModule\DoktypeIds;
use Maispace\MaiBase\TableConfigurationArray\Doktype;
use Maispace\MaiBase\TableConfigurationArray\Helper;

defined('TYPO3') or die();

$ll = Helper::localLangHelperFactory('mai_base', 'locallang_mod_pages.xlf');

(new Doktype((string) DoktypeIds::NEWS, $ll('doktype.news'), 'content-news'))
    ->addDefaultTitlePalette()
    ->addDefaultSeoTab()
    ->addDefaultSocialMediaTab()
    ->addDefaultMetadataTab()
    ->addDefaultAppearanceTab()
    ->addDefaultBehaviourTab()
    ->addDefaultResourcesTab()
    ->addDefaultAccessTab()
    ->addDefaultLanguageTab()
    ->addDefaultCategoriesTab()
    ->addDefaultNotesTab()
    ->addDefaultExtendedTab()
    ->register();

(new Doktype((string) DoktypeIds::EVENT, $ll('doktype.event'), 'apps-pagetree-page-content-from-page'))
    ->addDefaultTitlePalette()
    ->addDefaultSeoTab()
    ->addDefaultSocialMediaTab()
    ->addDefaultMetadataTab()
    ->addDefaultAppearanceTab()
    ->addDefaultBehaviourTab()
    ->addDefaultResourcesTab()
    ->addDefaultAccessTab()
    ->addDefaultLanguageTab()
    ->addDefaultCategoriesTab()
    ->addDefaultNotesTab()
    ->addDefaultExtendedTab()
    ->register();

(new Doktype((string) DoktypeIds::JOB, $ll('doktype.job'), 'mai-jobs'))
    ->addDefaultTitlePalette()
    ->addDefaultSeoTab()
    ->addDefaultSocialMediaTab()
    ->addDefaultMetadataTab()
    ->addDefaultAppearanceTab()
    ->addDefaultBehaviourTab()
    ->addDefaultResourcesTab()
    ->addDefaultAccessTab()
    ->addDefaultLanguageTab()
    ->addDefaultCategoriesTab()
    ->addDefaultNotesTab()
    ->addDefaultExtendedTab()
    ->register();

(new Doktype((string) DoktypeIds::MEMBER, $ll('doktype.member'), 'mai-member'))
    ->addDefaultTitlePalette()
    ->addDefaultSeoTab()
    ->addDefaultSocialMediaTab()
    ->addDefaultMetadataTab()
    ->addDefaultAppearanceTab()
    ->addDefaultBehaviourTab()
    ->addDefaultResourcesTab()
    ->addDefaultAccessTab()
    ->addDefaultLanguageTab()
    ->addDefaultCategoriesTab()
    ->addDefaultNotesTab()
    ->addDefaultExtendedTab()
    ->register();

$GLOBALS['TCA']['pages']['ctrl']['EXT']['mai_base']['customPageModules'] = array_replace(
    $GLOBALS['TCA']['pages']['ctrl']['EXT']['mai_base']['customPageModules'] ?? [],
    [
        'news' => [
            'doktype' => DoktypeIds::NEWS,
            'title' => $ll('module.news'),
            'sorting' => 10,
            'iconIdentifier' => 'content-news',
            'parentPidSetting' => 'customPages.news.parentPid',
        ],
        'event' => [
            'doktype' => DoktypeIds::EVENT,
            'title' => $ll('module.event'),
            'sorting' => 20,
            'iconIdentifier' => 'apps-pagetree-page-content-from-page',
            'parentPidSetting' => 'customPages.event.parentPid',
        ],
        'job' => [
            'doktype' => DoktypeIds::JOB,
            'title' => $ll('module.job'),
            'sorting' => 30,
            'iconIdentifier' => 'mai-jobs',
            'parentPidSetting' => 'customPages.job.parentPid',
        ],
        'member' => [
            'doktype' => DoktypeIds::MEMBER,
            'title' => $ll('module.member'),
            'sorting' => 40,
            'iconIdentifier' => 'mai-member',
            'parentPidSetting' => 'customPages.member.parentPid',
        ],
    ],
);
