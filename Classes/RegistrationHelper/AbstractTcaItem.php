<?php

namespace Maispace\Base\RegistrationHelper;

abstract class AbstractTcaItem
{
    /** @var array<string|int, string> */
    protected array $showItemConfig = [];
    /** @var array<string, mixed> */
    protected array $columnsOverrides = [];

    public function disableGeneralPalette(): static
    {
        unset($this->showItemConfig['general']);

        return $this;
    }

    public function addDefaultLanguageTab(): static
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_core('language') . ', --palette--;;language';

        return $this;
    }

    public function addDefaultCategoriesTab(): static
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_core('categories') . ', categories';

        return $this;
    }

    public function addDefaultExtendedTab(): static
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_core('extended');

        return $this;
    }

    public function addCustomFields(string $customFields): static
    {
        $this->showItemConfig[] = $customFields;

        return $this;
    }

    /**
     * Example:
     *  ->addColumnOverride('bodytext', [
     *      'exclude' => true,
     *      'label' => 'Alternativer Bodytext',
     *      'config' => [
     *          'eval' => 'trim',
     *      ],
     *  ]).
     *
     * @param array<string, mixed> $columnTcaOverride
     */
    public function addColumnOverride(string $columnName, array $columnTcaOverride): static
    {
        $this->columnsOverrides[$columnName] = $columnTcaOverride;

        return $this;
    }

    protected function buildShowitem(): string
    {
        $showitem = '';
        foreach ($this->showItemConfig as $showitemText) {
            $showitem .= trim($showitemText, ", \n\r\t") . ',';
        }

        return rtrim($showitem, ',');
    }

    protected function ll_core(string $llKey): string
    {
        return Helper::localLangHelperFactory('core', 'Form/locallang_tabs.xlf')($llKey);
    }
}
