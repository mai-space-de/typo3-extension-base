<?php

declare(strict_types=1);

namespace Maispace\MaiBase\TableConfigurationArray\Traits;

trait LocalizationTrait
{
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
}
