.. _installation:

============
Installation
============

Composer Installation
=====================

Install the extension via Composer:

.. code-block:: bash

    composer require maispace/mai-base

Activate the extension:

.. code-block:: bash

    vendor/bin/typo3 extension:activate mai_base

TypoScript Setup
================

Include the "MaiSpace Base" site set in your site configuration to activate
TypoScript setup, constants, and page TSconfig. The set depends on
``typo3/fluid-styled-content``.
