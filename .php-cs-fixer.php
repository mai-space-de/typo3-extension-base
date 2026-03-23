<?php

declare(strict_types=1);

use PhpCsFixer\Config;
use PhpCsFixer\Finder;

$finder = Finder::create()
    ->in([
        __DIR__ . '/Classes',
        __DIR__ . '/Tests',
    ])
    ->name('*.php');

return (new Config())
    ->setRules([
        '@PSR2' => true,
        '@Symfony' => true,
        '@PHP82Migration' => true,
    ])
    ->setFinder($finder);
