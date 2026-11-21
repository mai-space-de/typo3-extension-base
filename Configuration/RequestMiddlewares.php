<?php

declare(strict_types=1);

use Maispace\MaiBase\Middleware\HttpBasicAuth\PageBasicAuthMiddleware;
use Maispace\MaiBase\Middleware\HttpBasicAuth\SiteBasicAuthMiddleware;

return [
    'frontend' => [
        // Whole site or single language: before any routing, so 404 pages,
        // static routes and /api/… endpoints are locked as well.
        'maispace/mai-base/basic-auth-site' => [
            'target' => SiteBasicAuthMiddleware::class,
            'after' => [
                'typo3/cms-frontend/site',
                'typo3/cms-frontend/backend-user-authentication',
            ],
            'before' => [
                'typo3/cms-frontend/static-route-resolver',
                'typo3/cms-frontend/page-resolver',
            ],
        ],
        // Single pages (and subpages): needs the resolved page and rootline.
        'maispace/mai-base/basic-auth-page' => [
            'target' => PageBasicAuthMiddleware::class,
            'after' => [
                'typo3/cms-frontend/prepare-tsfe-rendering',
            ],
        ],
    ],
];
