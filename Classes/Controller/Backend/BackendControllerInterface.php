<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Backend;

use Psr\Http\Message\ResponseInterface;

interface BackendControllerInterface
{
    public function indexAction(): ResponseInterface;
}
