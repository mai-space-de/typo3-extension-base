<?php

declare(strict_types=1);

namespace Maispace\MaiBase\Controller\Traits;

use TYPO3\CMS\Core\Error\Http\PageNotFoundException;
use TYPO3\CMS\Extbase\Persistence\RepositoryInterface;

trait DetailActionTrait
{
    protected function resolveDetailOrNotFound(
        RepositoryInterface $repository,
        string $argumentName = 'uid',
    ): object {
        if (!$this->request->hasArgument($argumentName)) {
            throw new PageNotFoundException('No record identifier provided.', 1745000001);
        }

        $uid = (int)$this->request->getArgument($argumentName);
        $object = $repository->findByUid($uid);

        if ($object === null) {
            throw new PageNotFoundException(
                sprintf('Record with UID %d not found.', $uid),
                1745000002,
            );
        }

        return $object;
    }
}
