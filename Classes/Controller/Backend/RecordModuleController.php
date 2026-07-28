<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Backend;

use Maispace\MaiBase\Backend\RecordModule\Event\AfterRecordModulePidsLoadedEvent;
use Maispace\MaiBase\Backend\RecordModule\Event\BeforeRecordModulePidsLoadedEvent;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Attribute\AsController;
use TYPO3\CMS\Backend\Clipboard\Clipboard;
use TYPO3\CMS\Backend\Context\PageContext;
use TYPO3\CMS\Backend\Context\PageContextFactory;
use TYPO3\CMS\Backend\Controller\Event\RenderAdditionalContentToRecordListEvent;
use TYPO3\CMS\Backend\Module\ModuleData;
use TYPO3\CMS\Backend\Module\ModuleInterface;
use TYPO3\CMS\Backend\RecordList\DatabaseRecordList;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Backend\Template\Components\ButtonBar;
use TYPO3\CMS\Backend\Template\Components\Buttons\GenericButton;
use TYPO3\CMS\Backend\Template\ModuleTemplate;
use TYPO3\CMS\Backend\Template\ModuleTemplateFactory;
use TYPO3\CMS\Backend\Utility\BackendUtility;
use TYPO3\CMS\Backend\View\RecordSearchBoxComponent;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\DataHandling\DataHandler;
use TYPO3\CMS\Core\Exception\SiteNotFoundException;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Imaging\IconSize;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Site\SiteFinder;
use TYPO3\CMS\Core\Type\Bitmask\Permission;
use TYPO3\CMS\Core\Type\ContextualFeedbackSeverity;
use TYPO3\CMS\Core\Utility\GeneralUtility;

#[AsController]
final class RecordModuleController extends AbstractBackendController
{
    private string $table = '';

    private string $searchTerm = '';

    private string $returnUrl = '';

    private array $modTSconfig = [];

    private ?ModuleData $moduleData = null;

    private int $pageId = 0;

    private array $pageInfo = [];

    private Permission $pagePermissions;

    public function __construct(
        ModuleTemplateFactory $moduleTemplateFactory,
        IconFactory $iconFactory,
        private readonly UriBuilder $backendUriBuilder,
        private readonly PageRenderer $pageRenderer,
        private readonly PageContextFactory $pageContextFactory,
        private readonly SiteFinder $siteFinder,
    ) {
        parent::__construct($moduleTemplateFactory, $iconFactory);
        $this->pagePermissions = new Permission(0);
    }

    public function indexAction(): ResponseInterface
    {
        $request = $this->request;
        $this->moduleData = $request->getAttribute('moduleData');
        if (!$this->moduleData instanceof ModuleData) {
            throw new \RuntimeException('ModuleData attribute is missing on the request.', 1753690001);
        }

        $route = $request->getAttribute('route');
        $module = $route?->getOption('module');
        $defaultModuleData = $module instanceof ModuleInterface
            ? $module->getDefaultModuleData()
            : [];
        $this->moduleData->set('table', $defaultModuleData['table'] ?? $this->moduleData->get('table'));
        $this->moduleData->set('pids', $defaultModuleData['pids'] ?? $this->moduleData->get('pids'));
        $this->moduleData->set('title', $defaultModuleData['title'] ?? $this->moduleData->get('title'));

        $backendUser = $this->getBackendUserAuthentication();
        $languageService = $this->getLanguageService();
        $parsedBody = $request->getParsedBody();
        $queryParams = $request->getQueryParams();
        $permsClause = $backendUser->getPagePermsClause(Permission::PAGE_SHOW);

        $this->table = (string) $this->moduleData->get('table');
        $this->pageId = (int) ($parsedBody['id'] ?? $queryParams['id'] ?? 0);
        $pids = $this->resolvePids($parsedBody, $queryParams);

        $this->pageRenderer->addInlineLanguageLabelFile(
            'EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf',
        );
        BackendUtility::lockRecords();

        $moduleTemplate = $this->createModuleTemplate();
        $moduleTitle = $this->resolveModuleTitle($languageService);

        if ($pids === []) {
            $this->flashError(
                $languageService->sL('LLL:EXT:mai_base/Resources/Private/Language/locallang_mod_records.xlf:noPagesForThisTable'),
            );
            $this->assignMultiple($moduleTemplate, [
                'pageId' => $this->pageId,
                'table' => $this->table,
                'tabs' => [],
                'moduleTitle' => $moduleTitle,
                'pageTitle' => '',
                'additionalContentTop' => '',
                'searchBoxHtml' => '',
                'tableListHtml' => '',
                'clipboardHtml' => '',
                'additionalContentBottom' => '',
            ]);

            return $this->renderModuleResponse($moduleTemplate, 'Index');
        }

        if (!$backendUser->isAdmin() && !$backendUser->check('tables_select', $this->table)) {
            $this->flashError(
                $languageService->sL('LLL:EXT:mai_base/Resources/Private/Language/locallang_mod_records.xlf:noAccess'),
            );
            $this->assignMultiple($moduleTemplate, [
                'pageId' => $this->pageId,
                'table' => $this->table,
                'tabs' => [],
                'moduleTitle' => $moduleTitle,
                'pageTitle' => '',
                'additionalContentTop' => '',
                'searchBoxHtml' => '',
                'tableListHtml' => '',
                'clipboardHtml' => '',
                'additionalContentBottom' => '',
            ]);

            return $this->renderModuleResponse($moduleTemplate, 'Index');
        }

        if ($this->pageId === 0) {
            $this->pageId = (int) reset($pids);
        }

        $request = $this->ensurePageContext($request, $backendUser);
        $pointer = max(0, (int) ($parsedBody['pointer'] ?? $queryParams['pointer'] ?? 0));
        $this->searchTerm = trim((string) ($parsedBody['searchTerm'] ?? $queryParams['searchTerm'] ?? ''));
        $this->returnUrl = GeneralUtility::sanitizeLocalUrl(
            (string) ($parsedBody['returnUrl'] ?? $queryParams['returnUrl'] ?? ''),
            $request,
        );
        $cmd = (string) ($parsedBody['cmd'] ?? $queryParams['cmd'] ?? '');
        $searchLevels = 0;

        $pageInfo = BackendUtility::readPageAccess($this->pageId, $permsClause);
        $access = is_array($pageInfo);
        $this->pageInfo = $access ? $pageInfo : [];
        $this->pagePermissions = new Permission($backendUser->calcPerms($pageInfo ?: []));

        $site = $request->getAttribute('site');
        $siteLanguages = $site !== null
            ? $site->getAvailableLanguages($backendUser, false, $this->pageId)
            : [];

        $this->modTSconfig = [
            'searchLevel.' => [
                'items.' => [
                    '0' => 'EXT:core/Resources/Private/Language/locallang_core.xlf:labels.searchLevel.0',
                ],
            ],
        ];

        if ($this->searchTerm !== '') {
            $this->moduleData->set('searchBox', true);
        }

        $dbList = GeneralUtility::makeInstance(DatabaseRecordList::class);
        $dbList->setRequest($request);
        $dbList->setModuleData($this->moduleData);
        $dbList->calcPerms = $this->pagePermissions;
        $dbList->returnUrl = $this->returnUrl;
        $dbList->showClipboardActions = true;
        $dbList->disableSingleTableView = false;
        $dbList->listOnlyInSingleTableMode = false;

        $tablesToHide = array_keys($GLOBALS['TCA'] ?? []);
        $currentIndex = array_search($this->table, $tablesToHide, true);
        if ($currentIndex !== false) {
            unset($tablesToHide[$currentIndex]);
        }
        $dbList->hideTables = implode(',', $tablesToHide);
        $dbList->allowedNewTables = [$this->table];
        $dbList->hideTranslations = '';
        $dbList->tableTSconfigOverTCA = [];
        $dbList->pageRow = $this->pageInfo;
        $dbList->modTSconfig = $this->modTSconfig;
        $dbList->setLanguagesAllowedForUser($siteLanguages);

        $clipboard = $this->initializeClipboard($request, (bool) $this->moduleData->get('clipBoard'));
        $dbList->clipObj = $clipboard;

        $additionalRecordListEvent = $this->eventDispatcher->dispatch(
            new RenderAdditionalContentToRecordListEvent($request),
        );

        $tableListHtml = '';
        if ($access || ($this->pageId === 0 && $this->searchTerm !== '')) {
            if ($cmd === 'delete' && $request->getMethod() === 'POST') {
                $this->deleteRecords($request, $clipboard);
            }
            $dbList->start($this->pageId, $this->table, $pointer, $this->searchTerm, $searchLevels);
            $tableListHtml = $dbList->generateList();
        }

        $searchBoxHtml = '';
        if (
            (bool) $this->moduleData->get('searchBox')
            && ($tableListHtml !== '' || $this->searchTerm !== '')
        ) {
            $searchBoxHtml = $this->renderSearchBox($request, $dbList, $this->searchTerm, $searchLevels);
        }

        $clipboardHtml = '';
        if ((bool) $this->moduleData->get('clipBoard') && ($tableListHtml !== '' || $clipboard->hasElements())) {
            $clipboardHtml = '<hr class="spacer"><typo3-backend-clipboard-panel return-url="'
                . htmlspecialchars((string) $dbList->listURL())
                . '"></typo3-backend-clipboard-panel>';
        }

        if ($tableListHtml === '') {
            $moduleTemplate->addFlashMessage(
                $languageService->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:noRecordsOfTypeOnThisPage'),
                '',
                ContextualFeedbackSeverity::INFO,
            );
            $newButton = $dbList->createActionButtonNewRecord($this->table);
            if ($newButton !== null) {
                $moduleTemplate->getDocHeaderComponent()->getButtonBar()->addButton($newButton);
            } else {
                $this->addNewRecordButton($moduleTemplate, (string) $dbList->listURL());
            }
        } else {
            $newButton = $dbList->createActionButtonNewRecord($this->table);
            if ($newButton !== null) {
                $moduleTemplate->getDocHeaderComponent()->getButtonBar()->addButton($newButton);
            } else {
                $this->addNewRecordButton($moduleTemplate, (string) $dbList->listURL());
            }
        }

        if ($this->pageInfo !== []) {
            $moduleTemplate->getDocHeaderComponent()->setMetaInformation($this->pageInfo);
        }

        $this->addShortcutButton(
            $moduleTemplate,
            $this->moduleData->getModuleIdentifier(),
            $moduleTitle,
            ['id' => $this->pageId],
        );

        $this->assignMultiple($moduleTemplate, [
            'pageId' => $this->pageId,
            'table' => $this->table,
            'tabs' => $this->buildPidTabs($pids),
            'pageTitle' => (string) ($this->pageInfo['title'] ?? ''),
            'moduleTitle' => $moduleTitle,
            'additionalContentTop' => $additionalRecordListEvent->getAdditionalContentAbove(),
            'searchBoxHtml' => $searchBoxHtml,
            'tableListHtml' => $tableListHtml,
            'clipboardHtml' => $clipboardHtml,
            'additionalContentBottom' => $additionalRecordListEvent->getAdditionalContentBelow(),
        ]);

        return $this->renderModuleResponse($moduleTemplate, 'Index');
    }

    private function resolvePids(?array $parsedBody, array $queryParams): array
    {
        $pids = [];
        $beforeEvent = new BeforeRecordModulePidsLoadedEvent($pids, $this->table);
        $this->eventDispatcher->dispatch($beforeEvent);

        if ($beforeEvent->getPids() !== []) {
            $pids = $beforeEvent->getPids();
        } elseif (is_array($this->moduleData?->get('pids')) && $this->moduleData->get('pids') !== []) {
            foreach ($this->moduleData->get('pids') as $pid) {
                $pids[] = (int) $pid;
            }
        } elseif (
            (isset($parsedBody['id']) && $parsedBody['id'] !== '')
            || (isset($queryParams['id']) && $queryParams['id'] !== '')
        ) {
            $pids = [$this->pageId];
        }

        $afterEvent = new AfterRecordModulePidsLoadedEvent($pids, $this->table);
        $this->eventDispatcher->dispatch($afterEvent);
        $pids = $afterEvent->getPids();

        if ($pids === []) {
            $defaultPid = $this->resolveDefaultStoragePid();
            if ($defaultPid > 0) {
                $pids = [$defaultPid];
            }
        }

        $backendUser = $this->getBackendUserAuthentication();
        $permsClause = $backendUser->getPagePermsClause(Permission::PAGE_SHOW);
        $accessible = [];
        foreach ($pids as $pid) {
            $pageInfo = BackendUtility::readPageAccess((int) $pid, $permsClause);
            if (is_array($pageInfo) || (int) $pid === 0) {
                $accessible[] = (int) $pid;
            }
        }

        return $accessible;
    }

    private function resolveDefaultStoragePid(): int
    {
        foreach ($this->siteFinder->getAllSites() as $site) {
            $settings = $site->getSettings();
            if (!$settings->has('records.defaultStoragePid')) {
                continue;
            }

            $pid = (int) $settings->get('records.defaultStoragePid');
            if ($pid > 0) {
                return $pid;
            }
        }

        return 0;
    }

    private function ensurePageContext(
        ServerRequestInterface $request,
        BackendUserAuthentication $backendUser,
    ): ServerRequestInterface {
        $pageContext = $request->getAttribute('pageContext');
        if ($pageContext instanceof PageContext) {
            return $request;
        }

        $pageId = $this->pageId > 0 ? $this->pageId : 0;
        $pageContext = $this->pageContextFactory->createFromRequest($request, $pageId, $backendUser);

        return $request->withAttribute('pageContext', $pageContext);
    }

    private function initializeClipboard(ServerRequestInterface $request, bool $isClipboardShown): Clipboard
    {
        $clipboard = GeneralUtility::makeInstance(Clipboard::class);
        $cmd = (string) ($request->getParsedBody()['cmd'] ?? $request->getQueryParams()['cmd'] ?? '');
        $clipboard->initializeClipboard($request);
        $clipboardCommandArray = array_replace_recursive(
            $request->getQueryParams()['CB'] ?? [],
            $request->getParsedBody()['CB'] ?? [],
        );
        if ($cmd === 'copyMarked' || $cmd === 'removeMarked') {
            $CBC = array_map(
                static fn(): bool => $cmd === 'copyMarked',
                (array) ($request->getParsedBody()['CBC'] ?? []),
            );
            $cmdTable = (string) ($request->getParsedBody()['cmd_table'] ?? $request->getQueryParams()['cmd_table'] ?? '');
            $clipboardCommandArray['el'] = $clipboard->cleanUpCBC($CBC, $cmdTable);
        }
        if (!$isClipboardShown) {
            $clipboardCommandArray['setP'] = 'normal';
        }
        $clipboard->setCmd($clipboardCommandArray);
        $clipboard->cleanCurrent();
        $clipboard->endClipboard();

        return $clipboard;
    }

    private function deleteRecords(ServerRequestInterface $request, Clipboard $clipboard): void
    {
        $parsedBody = $request->getParsedBody();
        $items = $clipboard->cleanUpCBC(
            (array) ($parsedBody['CBC'] ?? []),
            (string) ($parsedBody['cmd_table'] ?? ''),
            true,
        );
        if ($items === []) {
            return;
        }

        $dataHandlerCmd = [];
        foreach ($items as $identifier => $value) {
            $parts = explode('|', (string) $identifier);
            $dataHandlerCmd[$parts[0]][$parts[1]]['delete'] = 1;
        }
        $dataHandler = GeneralUtility::makeInstance(DataHandler::class);
        $dataHandler->start([], $dataHandlerCmd);
        $dataHandler->process_cmdmap();
        $dataHandler->printLogErrorMessages();
    }

    private function renderSearchBox(
        ServerRequestInterface $request,
        DatabaseRecordList $dbList,
        string $searchWord,
        int $searchLevels,
    ): string {
        return GeneralUtility::makeInstance(RecordSearchBoxComponent::class)
            ->setAllowedSearchLevels((array) ($this->modTSconfig['searchLevel.']['items.'] ?? []))
            ->setSearchWord($searchWord)
            ->setSearchLevel($searchLevels)
            ->render($request, $dbList->listURL('', null, 'pointer,searchTerm'));
    }

    private function addNewRecordButton(ModuleTemplate $moduleTemplate, string $returnUrl): void
    {
        $href = (string) $this->backendUriBuilder->buildUriFromRoute('record_edit', [
            'edit' => [
                $this->table => [
                    $this->pageId => 'new',
                ],
            ],
            'returnUrl' => $returnUrl,
        ]);

        $button = GeneralUtility::makeInstance(GenericButton::class);
        $button->setTag('a');
        $button->setLabel(
            $this->getLanguageService()->sL('LLL:EXT:core/Resources/Private/Language/locallang_mod_web_list.xlf:new'),
        );
        $button->setShowLabelText(true);
        $button->setIcon($this->iconFactory->getIcon('actions-plus', IconSize::SMALL));
        $button->setAttributes([
            'href' => $href,
            'data-recordlist-action' => 'new',
        ]);

        $moduleTemplate->getDocHeaderComponent()->getButtonBar()->addButton(
            $button,
            ButtonBar::BUTTON_POSITION_LEFT,
            10,
        );
    }

    /**
     * @param list<int> $pids
     * @return array<string, array<int, array<string, mixed>>>
     */
    private function buildPidTabs(array $pids): array
    {
        $tabs = [];
        foreach ($pids as $pid) {
            try {
                $site = $this->siteFinder->getSiteByPageId($pid);
                $identifier = $site->getIdentifier();
            } catch (SiteNotFoundException) {
                $identifier = '_default';
            }

            $page = BackendUtility::getRecord('pages', $pid) ?? ['uid' => $pid, 'title' => (string) $pid];
            $rootLine = BackendUtility::BEgetRootLine($pid, '', true);
            ksort($rootLine);
            $page['rootLine'] = $rootLine;
            $page['active'] = $pid === $this->pageId;
            $page['url'] = (string) $this->backendUriBuilder->buildUriFromRoute(
                $this->moduleData?->getModuleIdentifier() ?? '',
                ['id' => $pid],
            );

            $tabs[$identifier][$pid] = $page;
        }

        return $tabs;
    }

    private function resolveModuleTitle(LanguageService $languageService): string
    {
        $moduleTitle = (string) (
            $this->moduleData?->get('title')
            ?? $GLOBALS['TCA'][$this->table]['ctrl']['title']
            ?? $this->table
        );
        if (str_starts_with($moduleTitle, 'LLL:')) {
            $moduleTitle = $languageService->sL($moduleTitle);
        }

        return $moduleTitle;
    }

    private function getBackendUserAuthentication(): BackendUserAuthentication
    {
        return $GLOBALS['BE_USER'];
    }

    private function getLanguageService(): LanguageService
    {
        return $GLOBALS['LANG'];
    }
}
