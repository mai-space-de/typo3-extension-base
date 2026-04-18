<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

/**
 * Appends the current content element's tt_content row as `data` to every
 * Fluid template rendered by the consuming controller.
 *
 * Usage in a frontend ActionController:
 *
 *   use AppendDataToPluginVariablesTrait {
 *       AppendDataToPluginVariablesTrait::initializeAction as initializeAppendData;
 *   }
 *
 *   protected function initializeAction(): void
 *   {
 *       parent::initializeAction();
 *       $this->initializeAppendData();
 *   }
 *
 * @require-extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController
 */
trait AppendDataToPluginVariablesTrait
{
    protected function initializeAction(): void
    {
        /** @var \TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer|null $contentObject */
        $contentObject = $this->request->getAttribute('currentContentObject');
        $this->view->assign('data', $contentObject?->data ?? []);
    }
}
