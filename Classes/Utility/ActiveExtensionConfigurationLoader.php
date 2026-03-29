<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Utility;

use Symfony\Component\Yaml\Yaml;
use TYPO3\CMS\Core\Package\PackageManager;
use TYPO3\CMS\Core\Utility\ArrayUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class ActiveExtensionConfigurationLoader
{
    private PackageManager $packageManager;

    /**
     * @return array<string, mixed>
     */
    public static function getMergedConfigurationByFilename(
        string $filename,
        ConfigurationFileType $fileType = ConfigurationFileType::PHP,
    ): array {
        $configuration = [];

        foreach (GeneralUtility::makeInstance(PackageManager::class)->getActivePackages() as $activePackage) {
            $configurationFile =
                $activePackage->getPackagePath() .
                'Configuration/' .
                $filename . '.' . $fileType->value;

            if (file_exists($configurationFile)) {
                $configArray = self::loadFile($configurationFile, $fileType);
                if (is_array($configArray)) {
                    ArrayUtility::mergeRecursiveWithOverrule(
                        $configuration,
                        $configArray,
                    );
                }
            }
        }

        return $configuration;
    }

    /**
     * @return mixed
     */
    private static function loadFile(string $filePath, ConfigurationFileType $fileType): mixed
    {
        return match ($fileType) {
            ConfigurationFileType::PHP => require $filePath,
            ConfigurationFileType::YAML => Yaml::parseFile($filePath),
        };
    }
}
