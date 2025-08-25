<?php
/**
 * Theme Functions
 *
 * @author Jegstudio
 * @package sovy
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

defined( 'SOVY_VERSION' ) || define( 'SOVY_VERSION', '1.0.0' );
defined( 'SOVY_DIR' ) || define( 'SOVY_DIR', trailingslashit( get_template_directory() ) );
defined( 'SOVY_URI' ) || define( 'SOVY_URI', trailingslashit( get_template_directory_uri() ) );

require get_parent_theme_file_path( 'inc/autoload.php' );

Sovy\Init::instance();
