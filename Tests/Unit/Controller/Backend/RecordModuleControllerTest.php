<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Controller\Backend;

use Maispace\MaiBase\Controller\Backend\AbstractBackendController;
use Maispace\MaiBase\Controller\Backend\RecordModuleController;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Backend\Context\PageContextFactory;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Backend\Template\ModuleTemplateFactory;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Site\SiteFinder;

final class RecordModuleControllerTest extends TestCase
{
    #[Test]
    public function controllerExtendsAbstractBackendController(): void
    {
        self::assertTrue(
            is_subclass_of(RecordModuleController::class, AbstractBackendController::class),
        );
    }

    #[Test]
    public function indexActionMethodExists(): void
    {
        self::assertTrue(method_exists(RecordModuleController::class, 'indexAction'));
    }

    #[Test]
    public function indexActionReturnsResponseInterface(): void
    {
        $returnType = (new \ReflectionMethod(RecordModuleController::class, 'indexAction'))
            ->getReturnType();

        self::assertInstanceOf(\ReflectionNamedType::class, $returnType);
        self::assertSame(ResponseInterface::class, $returnType->getName());
    }

    #[Test]
    public function constructorDeclaresExpectedCollaborators(): void
    {
        $params = (new \ReflectionMethod(RecordModuleController::class, '__construct'))
            ->getParameters();

        $typesByName = [];
        foreach ($params as $param) {
            $type = $param->getType();
            $typesByName[$param->getName()] = $type instanceof \ReflectionNamedType ? $type->getName() : null;
        }

        self::assertSame(ModuleTemplateFactory::class, $typesByName['moduleTemplateFactory'] ?? null);
        self::assertSame(IconFactory::class, $typesByName['iconFactory'] ?? null);
        self::assertSame(UriBuilder::class, $typesByName['backendUriBuilder'] ?? null);
        self::assertSame(PageRenderer::class, $typesByName['pageRenderer'] ?? null);
        self::assertSame(PageContextFactory::class, $typesByName['pageContextFactory'] ?? null);
        self::assertSame(SiteFinder::class, $typesByName['siteFinder'] ?? null);
    }

    #[Test]
    public function resolvePidsIsPrivateHelper(): void
    {
        $method = new \ReflectionMethod(RecordModuleController::class, 'resolvePids');
        self::assertTrue($method->isPrivate());
    }

    #[Test]
    public function resolveDefaultStoragePidIsPrivateHelper(): void
    {
        $method = new \ReflectionMethod(RecordModuleController::class, 'resolveDefaultStoragePid');
        self::assertTrue($method->isPrivate());
        self::assertSame('int', $method->getReturnType()?->getName());
    }
}
