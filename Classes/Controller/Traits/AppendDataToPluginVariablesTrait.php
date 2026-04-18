<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

trait AppendDataToPluginVariablesTrait
{
    protected function initializeAction(): void
    {
        $contentObject = $this->request->getAttribute('currentContentObject');
        $this->view->assign('data', $contentObject?->data ?? []);
    }
}
