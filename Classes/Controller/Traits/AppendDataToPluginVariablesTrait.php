<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

use TYPO3\CMS\Core\View\ViewInterface;

trait AppendDataToPluginVariablesTrait
{
    protected function initializeView(ViewInterface $view): void
    {
        $contentObject = $this->request->getAttribute('currentContentObject');
        $view->assign('data', $contentObject?->data ?? []);
    }
}
