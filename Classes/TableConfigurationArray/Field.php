<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray;

use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

class Field
{
    private string $description;
    private string $onChange;
    private string $l10n_display;
    private string $l10n_mode;
    private string|array $displayCond;
    private array $config;

    public function __construct(
        private readonly string $tableName,
        private readonly string $fieldName,
        private readonly string $label,
        private readonly bool $exclude = false,
    ) {
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function setOnChange(string $onChange): self
    {
        $this->onChange = $onChange;

        return $this;
    }

    public function setL10nDisplay(string $l10n_display): self
    {
        $this->setLocalizationDisplay($l10n_display);

        return $this;
    }

    public function setLocalizationDisplay(string $l10n_display): self
    {
        $this->l10n_display = $l10n_display;

        return $this;
    }

    public function setL10nMode(string $l10n_mode): self
    {
        $this->setBehaviourWhenTranslated($l10n_mode);

        return $this;
    }

    public function setBehaviourWhenTranslated(string $l10n_mode): self
    {
        $this->l10n_mode = $l10n_mode;

        return $this;
    }

    public function setDisplayCondition(string|array $displayCond): self
    {
        $this->displayCond = $displayCond;

        return $this;
    }

    public function setConfig(array $config): self
    {
        $this->config = $config;

        return $this;
    }

    public function registerField(): void
    {
        $field = [];
        $field['label'] = $this->label;
        $field['exclude'] = $this->exclude;

        if (isset($this->description)) {
            $field['description'] = $this->description;
        }

        if (isset($this->onChange)) {
            $field['onChange'] = $this->onChange;
        }

        if (isset($this->l10n_display)) {
            $field['l10n_display'] = $this->l10n_display;
        }

        if (isset($this->l10n_mode)) {
            $field['l10n_mode'] = $this->l10n_mode;
        }

        if (isset($this->displayCond)) {
            $field['displayCond'] = $this->displayCond;
        }

        if (isset($this->config)) {
            $field['config'] = $this->config;
        }

        ExtensionManagementUtility::addTCAcolumns($this->tableName, [$this->fieldName => $field]);
    }
}
