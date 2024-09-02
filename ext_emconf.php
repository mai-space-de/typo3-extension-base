<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'Base',
    'description' => 'Base Extension for Maispace Projects',
    'version' => '12.0.0',
    'state' => 'stable',
    'category' => 'templates',
    'author' => 'Joel Maximilian Mai',
    'author_email' => 'joel@maispace.de',
    'author_company' => 'Maispace',
    'constraints' => [
        'depends' => [
            'typo3' => '12.4.0-12.4.99',
        ],
        'conflicts' => [
        ],
    ],
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 1,
    'autoload' => [
        'psr-4' => [
            'Maispace\\Base\\' => 'Classes',
        ],
    ],
];
