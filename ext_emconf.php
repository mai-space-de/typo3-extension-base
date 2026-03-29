<?php
$EM_CONF[$_EXTKEY] = [
    'title' => 'Mai Base',
    'description' => 'Base foundation extension for Maispace TYPO3 projects. Provides shared TypoScript configuration, page layout definitions, and pulls in all TYPO3 backend/infrastructure extensions that the project requires. Mail dispatch is handled by `mai_mail` — no external mail queue package is declared here.',
    'category' => 'module',
    'author' => 'Maispace',
    'author_email' => '',
    'state' => 'stable',
    'version' => '1.0.0',
    'constraints' => [
        'depends' => [
            'typo3' => '13.4.0-14.99.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
];
