<?php

declare(strict_types=1);

use Maispace\MaiBase\Backend\CustomPageModule\DoktypeIds;
use Maispace\MaiBase\EventListener\AddBasicAuthPaletteToPageTypes;
use Maispace\MaiBase\HttpBasicAuth\PageProtectionResolver;
use Maispace\MaiBase\TableConfigurationArray\Doktype;
use Maispace\MaiBase\TableConfigurationArray\Field;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\InputConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\PasswordConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\SelectSingleConfig;
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

// HTTP Basic Auth per page. The palette is added to every page type by
// AddBasicAuthPaletteToPageTypes, after all extensions registered their doktypes.
$basicAuthLl = Helper::localLangHelperFactory('mai_base', 'locallang_basic_auth.xlf');

(new Field('pages', PageProtectionResolver::FIELD_MODE, $basicAuthLl('pages.basic_auth'), true))
    ->setDescription($basicAuthLl('pages.basic_auth.description'))
    ->setOnChange('reload')
    ->setL10nMode('exclude')
    ->setConfig(
        (new SelectSingleConfig())
            ->setItems([
                ['label' => $basicAuthLl('pages.basic_auth.off'), 'value' => PageProtectionResolver::MODE_OFF],
                ['label' => $basicAuthLl('pages.basic_auth.page'), 'value' => PageProtectionResolver::MODE_PAGE],
                ['label' => $basicAuthLl('pages.basic_auth.subpages'), 'value' => PageProtectionResolver::MODE_PAGE_AND_SUBPAGES],
            ])
            ->setDefault(PageProtectionResolver::MODE_OFF),
    )
    ->registerField();

(new Field('pages', PageProtectionResolver::FIELD_USERNAME, $basicAuthLl('pages.basic_auth_username'), true))
    ->setDisplayCondition('FIELD:' . PageProtectionResolver::FIELD_MODE . ':>:0')
    ->setL10nMode('exclude')
    ->setConfig((new InputConfig())->setSize(30)->setMax(255)->setEval('trim'))
    ->registerField();

(new Field('pages', PageProtectionResolver::FIELD_PASSWORD, $basicAuthLl('pages.basic_auth_password'), true))
    ->setDescription($basicAuthLl('pages.basic_auth_password.description'))
    ->setDisplayCondition('FIELD:' . PageProtectionResolver::FIELD_MODE . ':>:0')
    ->setL10nMode('exclude')
    ->setConfig((new PasswordConfig())->setHashed()->setSize(30))
    ->registerField();

$GLOBALS['TCA']['pages']['palettes'][AddBasicAuthPaletteToPageTypes::PALETTE] = [
    'label' => $basicAuthLl('palette.basic_auth'),
    'showitem' => PageProtectionResolver::FIELD_MODE . ', --linebreak--, '
        . PageProtectionResolver::FIELD_USERNAME . ', ' . PageProtectionResolver::FIELD_PASSWORD,
];
