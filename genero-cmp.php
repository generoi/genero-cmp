<?php
/*
Plugin Name:        Genero CMP
Plugin URI:         http://genero.fi
Description:        CMP Plugin
Version:            1.1.0
Author:             Genero
Author URI:         http://genero.fi/
License:            MIT License
License URI:        http://opensource.org/licenses/MIT
Text Domain:        genero-cmp
Domain Path:        /languages
*/

use GeneroWP\GeneroCmp\Plugin;

if (!defined('ABSPATH')) {
    exit;
}

if (file_exists($composer = __DIR__ . '/vendor/autoload.php')) {
    require_once $composer;
}

Plugin::getInstance();
