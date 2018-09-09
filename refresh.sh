#!/bin/bash
php ./composer.phar dump-autoload
php artisan migrate:refresh
php artisan db:seed
php artisan passport:install
