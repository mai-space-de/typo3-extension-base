<?php

namespace Maispace\Base\RegistrationHelper;

class CType extends AbstractTcaItem
{

    public function __construct(
        private readonly string $cType,
        private readonly string $label,
        private readonly string $iconIdentifier
    ) {
        $this->showItemConfig[] = '--div--;' . $this->ll_core('general');
        $this->showItemConfig['general'] = '--palette--;;general';
    }

    public function addDefaultHeaderPalette(): self
    {
        $this->showItemConfig[] = '--palette--;;header';

        return $this;
    }

    public function addDefaultHeadersPalette(): self
    {
        $this->showItemConfig[] = '--palette--;;headers';

        return $this;
    }

    public function addSubheaderField(): self
    {
        $this->showItemConfig[] = '--linebreak--, subheader;' . $this->ll_frontend('subheader_formlabel');

        return $this;
    }

    public function addDefaultImageTab(): self
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_frontend('tabs.images') .
            ', image, --palette--;;mediaAdjustments, --palette--;;gallerySettings, --palette--;;imagelinks';

        return $this;
    }

    public function addDefaultMediaTab(): self
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_frontend('tabs.media') .
            ', assets, --palette--;;mediaAdjustments, --palette--;;gallerySettings, --palette--;;imagelinks';

        return $this;
    }

    public function addPluginTab(bool $listType = true, bool $pages = true, bool $recursive = true): self
    {
        $this->showItemConfig['plugin'] = '--div--;' . $this->ll_frontend('tabs.plugin');

        if ($listType) {
            $this->showItemConfig[] = 'list_type;' . $this->ll_frontend('list_type_formlabel');
        }

        if ($pages) {
            $this->showItemConfig[] = 'pages;' . $this->ll_frontend('pages.ALT.list_formlabel');
        }

        if ($recursive) {
            $this->showItemConfig[] = 'recursive';
        }

        return $this;
    }

    public function addDefaultAppearanceTab(): self
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_frontend('tabs.appearance') . ', --palette--;;frames, --palette--;;appearanceLinks';

        return $this;
    }

    public function addDefaultAccessibilityTab(): self
    {
        $this->showItemConfig[] = '-div--;' . $this->ll_frontend('tabs.accessibility') . ', --palette--;;menu_accessibility';

        return $this;
    }

    public function addDefaultAccessTab(): self
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_core('access') . ', --palette--;;hidden, --palette--;;access';

        return $this;
    }

    public function addDefaultNotesTab(): self
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_core('notes');
        $this->showItemConfig[] = 'rowDescription';

        return $this;
    }

    public function register(): void
    {
        if (empty($this->cType)) {
            throw new \RuntimeException('CType is empty');
        }

        Helper::addCType($this->cType, $this->label, $this->iconIdentifier);

        $GLOBALS['TCA']['tt_content']['types'][$this->cType] = [
            'showitem' => $this->buildShowitem(),
            'columnsOverrides' => $this->columnsOverrides,
        ];
    }

    private function ll_frontend(string $llKey): string
    {
        return Helper::localLangHelperFactory('frontend', 'locallang_ttc.xlf')($llKey);
    }
}
