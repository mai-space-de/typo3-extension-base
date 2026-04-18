<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\TableConfigurationArray\FieldConfig;

use Maispace\MaiBase\TableConfigurationArray\Field;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\AbstractFieldConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\CategoryConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\CheckboxConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\ColorConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\CountryConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\DatetimeConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\EmailConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\FileConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\FieldConfigInterface;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\FlexConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\FolderConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\GroupConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\ImageManipulationConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\InputConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\InlineConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\JsonConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\LanguageConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\LinkConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\NoneConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\NumberConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\PassthroughConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\PasswordConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\RadioConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\SelectMultipleConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\SelectSingleConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\SelectTreeConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\SlugConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\TextConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\UserConfig;
use Maispace\MaiBase\TableConfigurationArray\FieldConfig\UuidConfig;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class FieldConfigTest extends TestCase
{
    #[Test]
    public function testFileConfigHasCorrectType(): void
    {
        self::assertSame('file', (new FileConfig())->toArray()['type']);
    }

    #[Test]
    public function testFileConfigSetAllowedAddsToArray(): void
    {
        self::assertSame('jpg', (new FileConfig())->setAllowed('jpg')->toArray()['allowed']);
    }

    #[Test]
    public function testFileConfigSetMaxItems(): void
    {
        self::assertSame(5, (new FileConfig())->setMaxItems(5)->toArray()['maxitems']);
    }

    #[Test]
    public function testFileConfigSetCropVariants(): void
    {
        self::assertSame(
            ['desktop' => ['title' => 'Desktop']],
            (new FileConfig())->setCropVariants(['desktop' => ['title' => 'Desktop']])->toArray()['overrideChildTca']['columns']['crop']['config']['cropVariants']
        );
    }

    #[Test]
    public function testInlineConfigHasCorrectType(): void
    {
        self::assertSame('inline', (new InlineConfig())->toArray()['type']);
    }

    #[Test]
    public function testInlineConfigFluentChaining(): void
    {
        $config = (new InlineConfig())
            ->setForeignTable('tt_content')
            ->setMinItems(1)
            ->setMaxItems(2)
            ->toArray();

        self::assertSame('tt_content', $config['foreign_table']);
        self::assertSame(1, $config['minitems']);
        self::assertSame(2, $config['maxitems']);
    }

    #[Test]
    public function testSelectSingleConfigHasSelectTypeAndRenderType(): void
    {
        $config = (new SelectSingleConfig())->toArray();

        self::assertSame('select', $config['type']);
        self::assertSame('selectSingle', $config['renderType']);
    }

    #[Test]
    public function testSelectMultipleConfigHasCorrectRenderType(): void
    {
        self::assertSame('selectMultipleSideBySide', (new SelectMultipleConfig())->toArray()['renderType']);
    }

    #[Test]
    public function testSelectTreeConfigHasCorrectRenderType(): void
    {
        self::assertSame('selectTree', (new SelectTreeConfig())->toArray()['renderType']);
    }

    #[Test]
    public function testTextConfigEnableRte(): void
    {
        self::assertTrue((new TextConfig())->enableRte()->toArray()['enableRichtext']);
    }

    #[Test]
    public function testCategoryConfigSetRelationship(): void
    {
        self::assertSame('manyToMany', (new CategoryConfig())->setRelationship('manyToMany')->toArray()['relationship']);
    }

    #[Test]
    public function testCountryConfigSetPrioritizedCountries(): void
    {
        self::assertSame(['de', 'en'], (new CountryConfig())->setPrioritizedCountries(['de', 'en'])->toArray()['prioritizedCountries']);
    }

    #[Test]
    public function testDatetimeConfigSetFormatAndNullable(): void
    {
        $config = (new DatetimeConfig())->setFormat('datetime')->setNullable(true)->toArray();

        self::assertSame('datetime', $config['format']);
        self::assertTrue($config['nullable']);
    }

    #[Test]
    public function testBehaviourTraitAllowLanguageSynchronization(): void
    {
        self::assertTrue((new InputConfig())->setAllowLanguageSynchronization()->toArray()['behaviour']['allowLanguageSynchronization']);
    }

    #[Test]
    public function testImplementsFieldConfigInterface(): void
    {
        self::assertInstanceOf(FieldConfigInterface::class, new FileConfig());
    }

    #[Test]
    public function testAbstractFieldConfigSetsTypeFromConstant(): void
    {
        self::assertSame(FileConfig::TYPE, (new FileConfig())->toArray()['type']);
    }

    #[Test]
    #[DataProvider('configClassesProvider')]
    public function testAllConfigClassesReturnTypeKey(string $configClass): void
    {
        self::assertArrayHasKey('type', (new $configClass())->toArray());
    }

    #[Test]
    public function testFlexConfigAddDataStructure(): void
    {
        self::assertSame('bar', (new FlexConfig())->addDataStructure('foo', 'bar')->toArray()['ds']['foo']);
    }

    #[Test]
    public function testUserConfigSetParameters(): void
    {
        self::assertSame(['key' => 'val'], (new UserConfig())->setParameters(['key' => 'val'])->toArray()['config']['parameters']);
    }

    #[Test]
    public function testFieldSetConfigWithArray(): void
    {
        $field = $this->createField()->setConfig(['type' => 'input']);

        self::assertSame(['type' => 'input'], $this->readFieldConfig($field));
    }

    #[Test]
    public function testFieldSetConfigWithFieldConfigInterface(): void
    {
        $config = new InputConfig();
        $field = $this->createField()->setConfig($config);

        self::assertSame($config->toArray(), $this->readFieldConfig($field));
    }

    public static function configClassesProvider(): iterable
    {
        yield 'file' => [FileConfig::class];
        yield 'inline' => [InlineConfig::class];
        yield 'input' => [InputConfig::class];
        yield 'text' => [TextConfig::class];
        yield 'selectSingle' => [SelectSingleConfig::class];
        yield 'selectMultiple' => [SelectMultipleConfig::class];
        yield 'selectTree' => [SelectTreeConfig::class];
        yield 'checkbox' => [CheckboxConfig::class];
        yield 'group' => [GroupConfig::class];
        yield 'datetime' => [DatetimeConfig::class];
        yield 'link' => [LinkConfig::class];
        yield 'number' => [NumberConfig::class];
        yield 'email' => [EmailConfig::class];
        yield 'password' => [PasswordConfig::class];
        yield 'slug' => [SlugConfig::class];
        yield 'color' => [ColorConfig::class];
        yield 'flex' => [FlexConfig::class];
        yield 'uuid' => [UuidConfig::class];
        yield 'category' => [CategoryConfig::class];
        yield 'country' => [CountryConfig::class];
        yield 'folder' => [FolderConfig::class];
        yield 'imageManipulation' => [ImageManipulationConfig::class];
        yield 'json' => [JsonConfig::class];
        yield 'language' => [LanguageConfig::class];
        yield 'none' => [NoneConfig::class];
        yield 'passthrough' => [PassthroughConfig::class];
        yield 'radio' => [RadioConfig::class];
        yield 'user' => [UserConfig::class];
    }

    private function createField(): Field
    {
        $reflectionClass = new \ReflectionClass(Field::class);
        $constructor = $reflectionClass->getConstructor();

        if ($constructor === null) {
            return new Field();
        }

        $arguments = [];

        foreach ($constructor->getParameters() as $parameter) {
            if ($parameter->isDefaultValueAvailable()) {
                $arguments[] = $parameter->getDefaultValue();
                continue;
            }

            $type = $parameter->getType();

            if ($type instanceof \ReflectionNamedType) {
                if ($type->allowsNull()) {
                    $arguments[] = null;
                    continue;
                }

                $arguments[] = match ($type->getName()) {
                    'string' => 'field',
                    'int' => 1,
                    'float' => 1.0,
                    'bool' => false,
                    'array' => [],
                    default => null,
                };

                continue;
            }

            $arguments[] = null;
        }

        return $reflectionClass->newInstanceArgs($arguments);
    }

    private function readFieldConfig(Field $field): array
    {
        $property = new \ReflectionProperty(Field::class, 'config');
        $property->setAccessible(true);

        /** @var array $config */
        $config = $property->getValue($field);

        return $config;
    }
}
