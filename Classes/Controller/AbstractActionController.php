<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller;

use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;

/**
 * Abstract base for frontend Extbase controllers.
 *
 * Inherits from ActionController and adds project-specific convenience helpers.
 *
 * Available (inherited) response methods:
 *   - htmlResponse(?string $html = null): ResponseInterface
 *   - jsonResponse(?string $json = null): ResponseInterface
 *   - redirect(?string $actionName, ...): ResponseInterface
 *   - redirectToUri(string $uri, ...): ResponseInterface
 *   - forward(string $actionName, ...): ResponseInterface
 *
 * Override initializeAction() to run code before every action.
 * Override errorAction() to customise validation-error behaviour (default: 400 + flash message).
 */
abstract class AbstractActionController extends ActionController
{
    protected function initializeAction(): void
    {
    }

    protected function getContentObjectData(): array
    {
        return $this->request->getAttribute('currentContentObject')?->data ?? [];
    }

    protected function getSettings(): array
    {
        return $this->settings;
    }
}
