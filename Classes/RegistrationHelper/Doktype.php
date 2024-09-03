<?php

namespace Maispace\Base\RegistrationHelper;

class Doktype extends AbstractTcaItem
{
    public function __construct(
        private readonly string $doktype,
        private readonly string $label,
        private readonly string $iconIdentifier
    ) {
        $this->showItemConfig[] = '--div--;' . $this->ll_core('general');
        $this->showItemConfig['general'] = '--palette--;;standard';
    }

    public function addDefaultTitlePalette(): self
    {
        $this->showItemConfig[] = '--palette--;;title';

        return $this;
    }

    public function addDefaultExternalPalette(): self
    {
        $this->showItemConfig[] = '--palette--;;external';

        return $this;
    }

    public function addDefaultSeoTab(): self
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_seo('pages.tabs.seo') .
            ', --palette--;;seo, --palette--;;robots, --palette--;;canonical, --palette--;;sitemap';

        return $this;
    }

    public function addDefaultSocialMediaTab(): self
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_seo('pages.tabs.socialmedia') .
            ', --palette--;;opengraph, --palette--;;twittercards';

        return $this;
    }

    public function addDefaultMetadataTab(): self
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_frontend('pages.tabs.metadata') .
            ', --palette--;;abstract, --palette--;;metatags, --palette--;;editorial';

        return $this;
    }

    public function addDefaultAppearanceTab(): self
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_frontend('pages.tabs.appearance') .
            ', --palette--;;layout, --palette--;;replace';

        return $this;
    }

    public function addDefaultBehaviourTab(): self
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_frontend('pages.tabs.behaviour') .
            ', --palette--;;links, --palette--;;caching, --palette--;;miscellaneous, --palette--;;module';

        return $this;
    }

    public function addDefaultResourcesTab(): self
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_frontend('pages.tabs.resources') .
            ', --palette--;;media, --palette--;;config';

        return $this;
    }

    public function addDefaultAccessTab(): self
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_frontend('pages.tabs.access') .
            ', --palette--;;visibility, --palette--;;access';

        return $this;
    }

    public function addDefaultNotesTab(): self
    {
        $this->showItemConfig[] = '--div--;' . $this->ll_core('notes') . ', rowDescription';

        return $this;
    }

    public function register(): void
    {
        if (empty($this->doktype)) {
            throw new \RuntimeException('Doktype is empty');
        }

        Helper::addDoktype($this->doktype, $this->label, $this->iconIdentifier);

        $GLOBALS['TCA']['pages']['types'][$this->doktype] = [
            'showitem' => $this->buildShowitem(),
            'columnsOverrides' => $this->columnsOverrides,
        ];
    }

    private function ll_frontend(string $llKey): string
    {
        return Helper::localLangHelperFactory('frontend', 'locallang_tca.xlf')($llKey);
    }

    private function ll_seo(string $llKey): string
    {
        return Helper::localLangHelperFactory('seo', 'locallang_tca.xlf')($llKey);
    }
}
