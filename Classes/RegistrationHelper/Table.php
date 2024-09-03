<?php

namespace Maispace\Base\RegistrationHelper;

class Table
{
    private array $config = [];

    public function __construct(
        string $title,
    )
    {
        $this->config['ctrl']['title'] = $title;
    }

    public function setDefaultConfig(): self
    {
        $this->setDefaultStampFields();
        $this->setDefaultLanguageConfig();
        $this->recordsAreOnlyAllowedInThePageTree();

        $this->setDeleteField();
        $this->setDefaultEnabledFields();

        return $this;
    }

    public function getConfig(): array
    {
        return $this->config;
    }

    public function setAccessableOnlyByAdmins(): self
    {
        $this->config['ctrl']['adminOnly'] = 1;

        return $this;
    }

    public function enrichContainer(array $container): self
    {
        $this->config['ctrl']['container'] = $container;

        return $this;
    }

    public function setFieldsToCopy(string $fields): self
    {
        $this->config['ctrl']['copyAfterDuplFields'] = $fields;

        return $this;
    }

    public function setCreationDateField(string $field = 'crdate'): self
    {
        $this->config['ctrl']['crdate'] = $field;

        return $this;
    }

    public function setDefaultSorting(string $sorting): self
    {
        $this->config['ctrl']['default_sortby'] = $sorting;

        return $this;
    }

    public function setDeleteField(string $field = 'deleted'): self
    {
        $this->config['ctrl']['delete'] = $field;

        return $this;
    }

    public function setDescriptionField(string $field): self
    {
        $this->config['ctrl']['descriptionColumn'] = $field;

        return $this;
    }

    public function setEditLockField(string $field): self
    {
        $this->config['ctrl']['enablecolumns']['editlock'] = $field;

        return $this;
    }

    public function setDisabledField(string $field): self
    {
        $this->config['ctrl']['enablecolumns']['disabled'] = $field;

        return $this;
    }

    public function setStarttimeField(string $field): self
    {
        $this->config['ctrl']['enablecolumns']['starttime'] = $field;

        return $this;
    }

    public function setEndtimeField(string $field): self
    {
        $this->config['ctrl']['enablecolumns']['endtime'] = $field;

        return $this;
    }

    public function setFeGroupField(string $field): self
    {
        $this->config['ctrl']['enablecolumns']['fe_group'] = $field;

        return $this;
    }

    public function setDefaultEnabledFields(): self
    {
        $this->config['ctrl']['enablecolumns']['disabled'] = 'hidden';
        $this->config['ctrl']['enablecolumns']['starttime'] = 'starttime';
        $this->config['ctrl']['enablecolumns']['endtime'] = 'endtime';
        $this->config['ctrl']['enablecolumns']['fe_group'] = 'fe_group';

        return $this;
    }

    public function addCustomCtrlConfig(string $extensionKey, mixed $value): self
    {
        $this->config['ctrl']['EXT'][$extensionKey] = $value;

        return $this;
    }

    public function setFormattedLabelUserFunction(string $userFunc, array $userFuncOptions): self
    {
        $this->config['ctrl']['formattedLabel_userFunc'] = $userFunc;
        $this->config['ctrl']['formattedLabel_userFunc_options'] = $userFuncOptions;

        return $this;
    }

    public function setGroupName(string $groupName): self
    {
        $this->config['ctrl']['groupName'] = $groupName;

        return $this;
    }

    public function hideRecordWhenCopied(bool $hide = true): self
    {
        $this->config['ctrl']['hideAtCopy'] = $hide;

        return $this;
    }

    public function hideTableInLists(bool $hide = false): self
    {
        $this->config['ctrl']['hideTable'] = $hide;

        return $this;
    }

    public function setIconFile(string $iconFile): self
    {
        $this->config['ctrl']['iconfile'] = $iconFile;

        return $this;
    }

    public function recordIsStatic(bool $isStatic = true): self
    {
        $this->config['ctrl']['is_static'] = $isStatic;

        return $this;
    }

    public function setLabel(string $label): self
    {
        $this->config['ctrl']['label'] = $label;

        return $this;
    }

    public function setAlternativeLabelFields(string $fields): self
    {
        $this->config['ctrl']['label_alt'] = $fields;

        return $this;
    }

    public function appendAlternativeLabelToLabel(bool $append = true): self
    {
        $this->config['ctrl']['label_alt_force'] = $append;

        return $this;
    }

    public function setLabelUserFunction(string $userFunc, array $userFuncOptions): self
    {
        $this->config['ctrl']['label_userFunc'] = $userFunc;
        $this->config['ctrl']['label_userFunc_options'] = $userFuncOptions;

        return $this;
    }

    public function setLanguageField(string $field = 'sys_language_uid'): self
    {
        $this->config['ctrl']['languageField'] = $field;

        return $this;
    }

    public function setOriginalField(string $field = 't3_origuid'): self
    {
        $this->config['ctrl']['origUid'] = $field;

        return $this;
    }

    public function setTextToBePrependedOnCopy(string $text): self
    {
        $this->config['ctrl']['prependAtCopy'] = $text;

        return $this;
    }

    public function setPreviewRenderer(string $renderer): self
    {
        $this->config['ctrl']['previewRenderer'] = $renderer;

        return $this;
    }

    public function recordsCanOnlyBeRead(bool $readOnly = true): self
    {
        $this->config['ctrl']['readOnly'] = $readOnly;

        return $this;
    }

    public function recordsAreOnlyAllowedInThePageTree(): self
    {
        $this->config['ctrl']['rootLevel'] = 0;

        return $this;
    }

    public function recordsAreOnlyAllowedInRoot(): self
    {
        $this->config['ctrl']['rootLevel'] = 1;

        return $this;
    }

    public function recordsAreAllowedEverywhere(): self
    {
        $this->config['ctrl']['rootLevel'] = -1;

        return $this;
    }

    public function setSearchFields(string $fields): self
    {
        $this->config['ctrl']['searchFields'] = $fields;

        return $this;
    }

    public function setIgnoreWebMountRestriction(bool $ignore = true): self
    {
        $this->config['ctrl']['security']['setIgnoreWebMountRestriction'] = $ignore;

        return $this;
    }

    public function setIgnoreRootLevelRestriction(bool $ignore = true): self
    {
        $this->config['ctrl']['security']['setIgnoreRootLevelRestriction'] = $ignore;

        return $this;
    }

    public function setIgnorePageTypeRestriction(bool $ignore = true): self
    {
        $this->config['ctrl']['security']['setIgnorePageTypeRestriction'] = $ignore;

        return $this;
    }

    public function setThumbnailField(string $field): self
    {
        $this->config['ctrl']['selicon_field'] = $field;

        return $this;
    }

    public function setSortingField(string $field = 'sorting'): self
    {
        $this->config['ctrl']['sortby'] = $field;

        return $this;
    }

    public function setTranslationOriginDiffSourceField(string $field = 'l10n_diffsource'): self
    {
        $this->config['ctrl']['transOrigDiffSourceField'] = $field;

        return $this;
    }

    public function setTranslationOriginField(string $field = 'l10n_source'): self
    {
        $this->config['ctrl']['transOrigPointerField'] = $field;

        return $this;
    }

    public function setTranslationSourceField(string $field = 'l10n_source'): self
    {
        $this->config['ctrl']['transOrigPointerSource'] = $field;

        return $this;
    }

    public function setDefaultLanguageConfig(): self
    {
        $this->setLanguageField();
        $this->setTranslationOriginField();
        $this->setTranslationSourceField();
        $this->setTranslationOriginDiffSourceField();

        return $this;
    }

    public function setModifiedDateField(string $field = 'tstamp'): self
    {
        $this->config['ctrl']['tstamp'] = $field;

        return $this;
    }

    public function setDefaultStampFields(): self
    {
        $this->setCreationDateField();
        $this->setModifiedDateField();
        $this->setOriginalField();

        return $this;
    }

    public function setTypeDefinitionField(string $field): self
    {
        $this->config['ctrl']['type'] = $field;

        return $this;
    }

    public function setIconForType(string $type, string $iconIdentifier): self
    {
        $this->config['ctrl']['typeicon_classes'][$type] = $iconIdentifier;

        return $this;
    }

    public function setFieldForTypeIcons(string $field): self
    {
        $this->config['ctrl']['typeicon_column'] = $field;

        return $this;
    }

    public function setFieldsToCopyToNewRecord(string $fields): self
    {
        $this->config['ctrl']['useColumnsForDefaultValues'] = $fields;

        return $this;
    }

    public function enableVersioning(bool $enable = true): self
    {
        $this->config['ctrl']['versioningWS'] = $enable;

        return $this;
    }

    public function alwaysAllowLiveEditing(bool $allow = true): self
    {
        $this->config['ctrl']['versioningWS_alwaysAllowLiveEdit'] = $allow;

        return $this;
    }

    public function addTypeShowItem(string $type, string $showItem): self
    {
        $this->config['types'][$type]['showitem'] = $showItem;

        return $this;
    }

    public function addPalette(string $paletteName, string $label, string $showItem): self
    {
        $this->config['palettes'][$paletteName]['label'] = $label;
        $this->config['palettes'][$paletteName]['showitem'] = $showItem;

        return $this;
    }

    public function addColumn(
        string $columnName,
        string $label,
        array $columnConfig,
        string $description = '',
        string|array $displayCond = '',
        bool $exclude = false,
        string $localizationDisplay = '',
        string $localizationMode = '',
        string $onChange = '',
    ): self
    {
        $this->config['columns'][$columnName]['label'] = $label;
        $this->config['columns'][$columnName]['config'] = $columnConfig;

        if ($description !== '') {
            $this->config['columns'][$columnName]['description'] = $description;
        }

        if ($displayCond !== '') {
            $this->config['columns'][$columnName]['displayCond'] = $displayCond;
        }

        if ($exclude) {
            $this->config['columns'][$columnName]['exclude'] = $exclude;
        }

        if ($localizationDisplay !== '') {
            $this->config['columns'][$columnName]['l10n_display'] = $localizationDisplay;
        }

        if ($localizationMode !== '') {
            $this->config['columns'][$columnName]['l10n_mode'] = $localizationMode;
        }

        if ($onChange !== '') {
            $this->config['columns'][$columnName]['onChange'] = $onChange;
        }

        return $this;
    }

}
