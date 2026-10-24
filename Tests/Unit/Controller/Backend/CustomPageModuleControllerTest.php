<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Tests\Unit\Controller\Backend;

use Maispace\MaiBase\Backend\CustomPageModule\CustomPageModuleListingContext;
use Maispace\MaiBase\Controller\Backend\AbstractBackendController;
use Maispace\MaiBase\Controller\Backend\CustomPageModuleController;
use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;
use Psr\Http\Message\ResponseInterface;
use TYPO3\CMS\Backend\Context\PageContextFactory;
use TYPO3\CMS\Backend\Routing\UriBuilder;
use TYPO3\CMS\Backend\Template\ModuleTemplateFactory;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Page\PageRenderer;
use TYPO3\CMS\Core\Site\SiteFinder;

final class CustomPageModuleControllerTest extends TestCase
{
    #[Test]
    public function controllerExtendsAbstractBackendController(): void
    {
        self::assertTrue(
            is_subclass_of(CustomPageModuleController::class, AbstractBackendController::class),
        );
    }

    #[Test]
    public function indexActionReturnsResponseInterface(): void
    {
        $returnType = (new \ReflectionMethod(CustomPageModuleController::class, 'indexAction'))
            ->getReturnType();

        self::assertInstanceOf(\ReflectionNamedType::class, $returnType);
        self::assertSame(ResponseInterface::class, $returnType->getName());
    }

    #[Test]
    public function constructorDeclaresExpectedCollaborators(): void
    {
        $params = (new \ReflectionMethod(CustomPageModuleController::class, '__construct'))
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
        self::assertSame(CustomPageModuleListingContext::class, $typesByName['listingContext'] ?? null);
    }

    #[Test]
    public function resolvePidsIsPrivateHelper(): void
    {
        $method = new \ReflectionMethod(CustomPageModuleController::class, 'resolvePids');
        self::assertTrue($method->isPrivate());
    }
}
