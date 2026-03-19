<?php

namespace Maispace\Base\EventListener;

use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Backend\Template\Components\ButtonBar;
use TYPO3\CMS\Backend\Template\Components\Buttons\InputButton;
use TYPO3\CMS\Backend\Template\Components\ModifyButtonBarEvent;
use TYPO3\CMS\Core\Database\Connection;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Database\Query\Restriction\DeletedRestriction;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Imaging\IconSize;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Utility\GeneralUtility;

final class ModifyButtonBarEventListener
{
    public function __construct(
        private readonly IconFactory $iconFactory,
        private readonly UriBuilder $uriBuilder,
        private readonly ConnectionPool $connectionPool,
    ) {}

    public function __invoke(ModifyButtonBarEvent $event): void
    {
        $buttons = $event->getButtons();
        $buttonBar = $event->getButtonBar();

        $this->addSaveAndCloseButton($buttons, $buttonBar);
        $this->addRecordNavigationButtons($buttons, $buttonBar);

        $event->setButtons($buttons);
    }

    private function addSaveAndCloseButton(array &$buttons, ButtonBar $buttonBar): void
    {
        $saveButton = $buttons[ButtonBar::BUTTON_POSITION_LEFT][2][0] ?? null;

        if (!$saveButton instanceof InputButton) {
            return;
        }

        $language = $this->getLanguageService();
        $title = $language?->sL(
            'LLL:EXT:core/Resources/Private/Language/locallang_core.xlf:rm.saveCloseDoc'
        ) ?? 'Save and close';

        $saveCloseButton = $buttonBar->makeInputButton()
            ->setName('_saveandclosedok')
            ->setValue('1')
            ->setForm($saveButton->getForm())
            ->setDataAttributes(['js' => 'save-and-close-button'])
            ->setTitle($title)
            ->setIcon($this->iconFactory->getIcon('actions-document-save-close', IconSize::SMALL))
            ->setShowLabelText(true);

        $buttons[ButtonBar::BUTTON_POSITION_LEFT][2][] = $saveCloseButton;

        /** @var PageRenderer $pageRenderer */
        $pageRenderer = GeneralUtility::makeInstance(PageRenderer::class);
        $pageRenderer->loadJavaScriptModule('@maispace/base/SaveAndClose.js');
    }

    private function addRecordNavigationButtons(array &$buttons, ButtonBar $buttonBar): void
    {
        $request = $GLOBALS['TYPO3_REQUEST'] ?? null;
        if ($request === null) {
            return;
        }

        $queryParams = $request->getQueryParams();
        $parsedBody = $request->getParsedBody() ?? [];
        $editConf = $queryParams['edit'] ?? $parsedBody['edit'] ?? [];

        if (empty($editConf) || !is_array($editConf)) {
            return;
        }

        $table = (string)key($editConf);
        $uidList = $editConf[$table] ?? [];

        if (!is_array($uidList) || empty($uidList)) {
            return;
        }

        $uid = (int)key($uidList);
        $action = (string)current($uidList);

        if ($uid <= 0 || $action !== 'edit') {
            return;
        }

        $siblings = $this->getSiblingRecords($table, $uid);
        if ($siblings === null) {
            return;
        }

        [$previousUid, $nextUid] = $siblings;

        $navigationGroup = 90;

        $language = $this->getLanguageService();

        if ($previousUid !== null) {
            $previousUrl = $this->buildEditUrl($table, $previousUid);
            $previousTitle = $language?->sL(
                'LLL:EXT:base/Resources/Private/Language/locallang.xlf:button.previousRecord'
            ) ?? 'Previous record';
            $previousButton = $buttonBar->makeLinkButton()
                ->setHref($previousUrl)
                ->setTitle($previousTitle)
                ->setIcon($this->iconFactory->getIcon('actions-view-go-back', IconSize::SMALL))
                ->setShowLabelText(true);

            $buttons[ButtonBar::BUTTON_POSITION_RIGHT][$navigationGroup][] = $previousButton;
        }

        if ($nextUid !== null) {
            $nextUrl = $this->buildEditUrl($table, $nextUid);
            $nextTitle = $language?->sL(
                'LLL:EXT:base/Resources/Private/Language/locallang.xlf:button.nextRecord'
            ) ?? 'Next record';
            $nextButton = $buttonBar->makeLinkButton()
                ->setHref($nextUrl)
                ->setTitle($nextTitle)
                ->setIcon($this->iconFactory->getIcon('actions-view-go-forward', IconSize::SMALL))
                ->setShowLabelText(true);

            $buttons[ButtonBar::BUTTON_POSITION_RIGHT][$navigationGroup][] = $nextButton;
        }
    }

    /**
     * Find previous and next sibling records based on sorting within the same parent.
     *
     * @return array{0: int|null, 1: int|null}|null [previousUid, nextUid] or null if not applicable
     */
    private function getSiblingRecords(string $table, int $uid): ?array
    {
        $sortField = $GLOBALS['TCA'][$table]['ctrl']['sortby'] ?? null;
        if ($sortField === null) {
            $defaultSortBy = $GLOBALS['TCA'][$table]['ctrl']['default_sortby'] ?? null;
            if (is_string($defaultSortBy)) {
                $parts = preg_split('/[\s,]+/', $defaultSortBy, 2);
                $sortField = $parts[0] ?? null;
            }
        }

        if ($sortField === null) {
            $sortField = 'uid';
        }

        $queryBuilder = $this->connectionPool->getQueryBuilderForTable($table);
        $queryBuilder->getRestrictions()->removeAll()->add(new DeletedRestriction());

        $currentRecord = $queryBuilder
            ->select('uid', 'pid', $sortField)
            ->from($table)
            ->where(
                $queryBuilder->expr()->eq('uid', $queryBuilder->createNamedParameter($uid, Connection::PARAM_INT))
            )
            ->executeQuery()
            ->fetchAssociative();

        if ($currentRecord === false) {
            return null;
        }

        $pid = (int)$currentRecord['pid'];
        $sortValue = $currentRecord[$sortField];

        $previousUid = $this->findAdjacentRecord($table, $pid, $sortField, $sortValue, $uid, 'previous');
        $nextUid = $this->findAdjacentRecord($table, $pid, $sortField, $sortValue, $uid, 'next');

        if ($previousUid === null && $nextUid === null) {
            return null;
        }

        return [$previousUid, $nextUid];
    }

    private function findAdjacentRecord(
        string $table,
        int $pid,
        string $sortField,
        mixed $sortValue,
        int $currentUid,
        string $direction
    ): ?int {
        $qb = $this->connectionPool->getQueryBuilderForTable($table);
        $qb->getRestrictions()->removeAll()->add(new DeletedRestriction());

        $qb->select('uid')
            ->from($table)
            ->where(
                $qb->expr()->eq('pid', $qb->createNamedParameter($pid, Connection::PARAM_INT)),
                $qb->expr()->neq('uid', $qb->createNamedParameter($currentUid, Connection::PARAM_INT))
            )
            ->setMaxResults(1);

        if ($direction === 'previous') {
            $qb->andWhere(
                $qb->expr()->or(
                    $qb->expr()->lt($sortField, $qb->createNamedParameter($sortValue)),
                    $qb->expr()->and(
                        $qb->expr()->eq($sortField, $qb->createNamedParameter($sortValue)),
                        $qb->expr()->lt('uid', $qb->createNamedParameter($currentUid, Connection::PARAM_INT))
                    )
                )
            );
            $qb->orderBy($sortField, 'DESC')->addOrderBy('uid', 'DESC');
        } else {
            $qb->andWhere(
                $qb->expr()->or(
                    $qb->expr()->gt($sortField, $qb->createNamedParameter($sortValue)),
                    $qb->expr()->and(
                        $qb->expr()->eq($sortField, $qb->createNamedParameter($sortValue)),
                        $qb->expr()->gt('uid', $qb->createNamedParameter($currentUid, Connection::PARAM_INT))
                    )
                )
            );
            $qb->orderBy($sortField, 'ASC')->addOrderBy('uid', 'ASC');
        }

        $record = $qb->executeQuery()->fetchAssociative();

        return $record ? (int)$record['uid'] : null;
    }

    private function buildEditUrl(string $table, int $uid): string
    {
        $request = $GLOBALS['TYPO3_REQUEST'] ?? null;
        $returnUrl = $request?->getQueryParams()['returnUrl'] ?? '';

        $params = [
            'edit' => [
                $table => [
                    $uid => 'edit',
                ],
            ],
        ];

        if ($returnUrl !== '') {
            $params['returnUrl'] = $returnUrl;
        }

        return (string)$this->uriBuilder->buildUriFromRoute('record_edit', $params);
    }

    private function getLanguageService(): ?LanguageService
    {
        return $GLOBALS['LANG'] ?? null;
    }
}
