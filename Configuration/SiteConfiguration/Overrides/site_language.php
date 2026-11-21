<?php

declare(strict_types=1);

use Maispace\MaiBase\HttpBasicAuth\SiteProtectionResolver;

defined('TYPO3') or die();

// HTTP Basic Auth for a single site language (site configuration → Languages).
$ll = 'LLL:EXT:mai_base/Resources/Private/Language/locallang_basic_auth.xlf:';

$GLOBALS['SiteConfiguration']['site_language']['columns'][SiteProtectionResolver::LANGUAGE_ENABLED] = [
    'label' => $ll . 'site_language.basic_auth_enabled',
    'onChange' => 'reload',
    'config' => [
        'type' => 'check',
        'renderType' => 'checkboxToggle',
        'default' => 0,
    ],
];
$GLOBALS['SiteConfiguration']['site_language']['columns'][SiteProtectionResolver::LANGUAGE_CREDENTIALS] = [
    'label' => $ll . 'site_language.basic_auth_credentials',
    'description' => $ll . 'site_language.basic_auth_credentials.description',
    'displayCond' => 'FIELD:' . SiteProtectionResolver::LANGUAGE_ENABLED . ':REQ:true',
    'config' => [
        'type' => 'text',
        'rows' => 3,
        'cols' => 40,
        'placeholder' => 'username:password',
    ],
];

$GLOBALS['SiteConfiguration']['site_language']['palettes']['maiBaseBasicAuth'] = [
    'label' => $ll . 'palette.basic_auth',
    'showitem' => SiteProtectionResolver::LANGUAGE_ENABLED . ', --linebreak--, ' . SiteProtectionResolver::LANGUAGE_CREDENTIALS,
];

$languageShowitem = (string) ($GLOBALS['SiteConfiguration']['site_language']['types']['1']['showitem'] ?? '');
if (!str_contains($languageShowitem, 'maiBaseBasicAuth')) {
    $GLOBALS['SiteConfiguration']['site_language']['types']['1']['showitem'] = str_contains($languageShowitem, 'flag,')
        ? str_replace('flag,', 'flag, --palette--;;maiBaseBasicAuth,', $languageShowitem)
        : $languageShowitem . ', --palette--;;maiBaseBasicAuth';
}
