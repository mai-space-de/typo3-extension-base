<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller;

use TYPO3\CMS\Extbase\Mvc\Controller\ActionController;

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
