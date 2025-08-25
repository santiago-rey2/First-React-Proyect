<?php
/**
 * Init Configuration
 *
 * @author Jegstudio
 * @package sovy
 */

namespace Sovy;

use WP_Query;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Init Class
 *
 * @package sovy
 */
class Init {

	/**
	 * Instance variable
	 *
	 * @var $instance
	 */
	private static $instance;

	/**
	 * Class instance.
	 *
	 * @return Init
	 */
	public static function instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	/**
	 * Class constructor.
	 */
	private function __construct() {
		$this->init_instance();
		$this->load_hooks();
	}

	/**
	 * Load initial hooks.
	 */
	private function load_hooks() {
		add_action( 'init', array( $this, 'register_block_patterns' ), 9 );
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'dashboard_scripts' ) );

		add_action( 'wp_ajax_sovy_set_admin_notice_viewed', array( $this, 'notice_closed' ) );

		add_action( 'after_switch_theme', array( $this, 'update_global_styles_after_theme_switch' ) );
		add_filter( 'gutenverse_block_config', array( $this, 'default_font' ), 10 );
		add_filter( 'gutenverse_font_header', array( $this, 'default_header_font' ) );
		add_filter( 'gutenverse_global_css', array( $this, 'global_header_style' ) );

		add_filter( 'gutenverse_themes_template', array( $this, 'add_template' ), 10, 2 );
		add_filter( 'gutenverse_themes_override_mechanism', '__return_true' );

		add_filter( 'gutenverse_show_theme_list', '__return_false' );
		add_filter( 'gutenverse_companion_essential_assets_directory', function () { return SOVY_DIR . 'assets'; });
		add_filter( 'gutenverse_companion_essential_assets_url', function () { return SOVY_URI . 'assets'; } );
		add_filter( 'gutenverse_companion_essential_mode_on', '__return_true' );
	}

	/**
	 * Add Template to Editor.
	 *
	 * @param array $template_files Path to Template File.
	 * @param array $template_type Template Type.
	 *
	 * @return array
	 */
	public function add_template( $template_files, $template_type ) {
		if ( 'wp_template' === $template_type ) {
			$new_templates = array(
				'blank-canvas',
			);

			foreach ( $new_templates as $template ) {
				$template_files[] = array(
					'slug'  => $template,
					'path'  => SOVY_DIR . "templates/{$template}.html",
					'theme' => get_template(),
					'type'  => 'wp_template',
				);
			}
		}

		return $template_files;
	}

	/**
	 * Initialize Instance.
	 */
	public function init_instance() {
		new Asset_Enqueue();
		new Themeforest_Data();
	}

	/**
	 * Update Global Styles After Theme Switch
	 */
	public function update_global_styles_after_theme_switch() {
		// Get the path to the current theme's theme.json file
		$theme_json_path = get_template_directory() . '/theme.json';
		$theme_slug      = get_option( 'stylesheet' ); // Get the current theme's slug
		$args            = array(
			'post_type'      => 'wp_global_styles',
			'post_status'    => 'publish',
			'name'           => 'wp-global-styles-' . $theme_slug,
			'posts_per_page' => 1,
		);

		$global_styles_query = new WP_Query( $args );
		// Check if the theme.json file exists
		if ( file_exists( $theme_json_path ) && $global_styles_query->have_posts() ) {
			$global_styles_query->the_post();
			$global_styles_post_id = get_the_ID();
			// Step 2: Get the existing global styles (color palette)
			$global_styles_content = json_decode( get_post_field( 'post_content', $global_styles_post_id ), true );
			if ( isset( $global_styles_content['settings']['color']['palette']['theme'] ) ) {
				$existing_colors = $global_styles_content['settings']['color']['palette']['theme'];
			} else {
				$existing_colors = array();
			}

			// Step 3: Extract slugs from the existing colors
			$existing_slugs = array_column( $existing_colors, 'slug' );
			// Step 4:Read the contents of the theme.json file

			$theme_json_content = file_get_contents( $theme_json_path );
			$theme_json_data    = json_decode( $theme_json_content, true );

			// Access the color palette from the theme.json file
			if ( isset( $theme_json_data['settings']['color']['palette'] ) ) {

				$theme_colors = $theme_json_data['settings']['color']['palette'];

				// Step 5: Loop through theme.json colors and add them if they don't exist
				foreach ( $theme_colors as $theme_color ) {
					if ( ! in_array( $theme_color['slug'], $existing_slugs ) ) {
						$existing_colors[] = $theme_color; // Add new color to the existing palette
					}
				}
				foreach ( $theme_colors as $theme_color ) {
					$theme_slug = $theme_color['slug'];

					// Step 6: Use in_array to check if the slug already exists in the global palette
					if ( ! in_array( $theme_slug, $existing_slugs ) ) {
						// If the slug does not exist, add the theme color to the global palette
						$global_colors[] = $theme_color;
					}
				}
				// Step 6: Update the global styles content with the new colors
				$global_styles_content['settings']['color']['palette']['theme'] = $existing_colors;

				// Step 7: Save the updated global styles back to the post
				wp_update_post(
					array(
						'ID'           => $global_styles_post_id,
						'post_content' => wp_json_encode( $global_styles_content ),
					)
				);

			}
			wp_reset_postdata(); // Reset the query
		}
	}

	/**
	 * Notice Closed
	 */
	public function notice_closed() {
		if ( isset( $_POST['nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'sovy_admin_notice' ) ) {
			update_user_meta( get_current_user_id(), 'gutenverse_install_notice', 'true' );
		}
		die;
	}

	/**
	 * Generate Global Font
	 *
	 * @param string $value  Value of the option.
	 *
	 * @return string
	 */
	public function global_header_style( $value ) {
		$theme_name      = get_stylesheet();
		$global_variable = get_option( 'gutenverse-global-variable-font-' . $theme_name );

		if ( empty( $global_variable ) && function_exists( 'gutenverse_global_font_style_generator' ) ) {
			$font_variable = $this->default_font_variable();
			$value        .= \gutenverse_global_font_style_generator( $font_variable );
		}

		return $value;
	}

	/**
	 * Header Font.
	 *
	 * @param mixed $value  Value of the option.
	 *
	 * @return mixed Value of the option.
	 */
	public function default_header_font( $value ) {
		if ( ! $value ) {
			$value = array(
				array(
					'value'  => 'Alfa Slab One',
					'type'   => 'google',
					'weight' => 'bold',
				),
			);
		}

		return $value;
	}

	/**
	 * Alter Default Font.
	 *
	 * @param array $config Array of Config.
	 *
	 * @return array
	 */
	public function default_font( $config ) {
		if ( empty( $config['globalVariable']['fonts'] ) ) {
			$config['globalVariable']['fonts'] = $this->default_font_variable();

			return $config;
		}

		if ( ! empty( $config['globalVariable']['fonts'] ) ) {
			// Handle existing fonts.
			$theme_name   = get_stylesheet();
			$initial_font = get_option( 'gutenverse-font-init-' . $theme_name );

			if ( ! $initial_font ) {
				$result = array();
				$array1 = $config['globalVariable']['fonts'];
				$array2 = $this->default_font_variable();
				foreach ( $array1 as $item ) {
					$result[ $item['id'] ] = $item;
				}
				foreach ( $array2 as $item ) {
					$result[ $item['id'] ] = $item;
				}
				$fonts = array();
				foreach ( $result as $key => $font ) {
					$fonts[] = $font;
				}
				$config['globalVariable']['fonts'] = $fonts;

				update_option( 'gutenverse-font-init-' . $theme_name, true );
			}
		}

		return $config;
	}

	/**
	 * Default Font Variable.
	 *
	 * @return array
	 */
	public function default_font_variable() {
		return array(
            array (
  'id' => 'WYk55r',
  'name' => 'H1',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '85',
        'unit' => 'px',
      ),
      'Tablet' => 
      array (
        'point' => '',
        'unit' => 'px',
      ),
      'Mobile' => 
      array (
        'point' => '45',
        'unit' => 'px',
      ),
    ),
    'weight' => '800',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.2',
      ),
    ),
  ),
),array (
  'id' => '1dcJQ2',
  'name' => 'H2',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '56',
        'unit' => 'px',
      ),
      'Mobile' => 
      array (
        'point' => '40',
        'unit' => 'px',
      ),
    ),
    'weight' => '800',
    'transform' => 'capitalize',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1',
      ),
      'Mobile' => 
      array (
        'unit' => 'em',
        'point' => '1',
      ),
    ),
  ),
),array (
  'id' => '67zOMB',
  'name' => 'H3',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '40',
        'unit' => 'px',
      ),
    ),
    'weight' => '600',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.2',
      ),
    ),
  ),
),array (
  'id' => 'gikX78',
  'name' => 'H4',
  'font' => 
  array (
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '32',
        'unit' => 'px',
      ),
    ),
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.3',
      ),
    ),
    'weight' => '600',
  ),
),array (
  'id' => 'Ca6AIG',
  'name' => 'H5',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '24',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.5',
      ),
    ),
    'weight' => '600',
    'style' => 'default',
  ),
),array (
  'id' => 'Fv7E7c',
  'name' => 'H6',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '20',
        'unit' => 'px',
      ),
      'Mobile' => 
      array (
        'point' => '20',
        'unit' => 'px',
      ),
      'Tablet' => 
      array (
        'point' => '20',
        'unit' => 'px',
      ),
    ),
    'weight' => '600',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.6',
      ),
      'Mobile' => 
      array (
        'unit' => 'em',
        'point' => '1.5',
      ),
      'Tablet' => 
      array (
        'unit' => 'em',
        'point' => '1.5',
      ),
    ),
  ),
),array (
  'id' => '9lek3I',
  'name' => 'Text',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '16',
        'unit' => 'px',
      ),
    ),
    'weight' => '300',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.5',
      ),
    ),
  ),
),array (
  'id' => '99qEWf',
  'name' => 'Nav',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '14',
        'unit' => 'px',
      ),
    ),
    'weight' => '400',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.5',
      ),
    ),
    'transform' => 'uppercase',
    'spacing' => 
    array (
      'Desktop' => '0.08',
    ),
  ),
),array (
  'id' => 'QiqSBU',
  'name' => 'Button',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '14',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.6',
      ),
    ),
    'weight' => '400',
    'transform' => 'uppercase',
    'spacing' => 
    array (
      'Desktop' => '0.25',
    ),
  ),
),array (
  'id' => 's8AVLj',
  'name' => 'H1 Alt',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '85',
        'unit' => 'px',
      ),
      'Mobile' => 
      array (
        'point' => '50',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1',
      ),
      'Mobile' => 
      array (
        'unit' => 'em',
        'point' => '1',
      ),
    ),
    'weight' => '800',
  ),
),array (
  'id' => 'lLL3Ky',
  'name' => 'Button Alt',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '20',
        'unit' => 'px',
      ),
      'Mobile' => 
      array (
        'point' => '16',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1',
      ),
    ),
    'weight' => '500',
  ),
),array (
  'id' => '7EIrO9',
  'name' => 'Text 20',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '20',
        'unit' => 'px',
      ),
    ),
    'weight' => '300',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.5',
      ),
    ),
  ),
),array (
  'id' => 'bLSfG6',
  'name' => 'Sub Nav',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '14',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.5',
      ),
    ),
    'weight' => '400',
  ),
),array (
  'id' => 'UZgeWN',
  'name' => 'INTER 16',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '16',
        'unit' => 'px',
      ),
    ),
    'weight' => '400',
    'spacing' => 
    array (
      'Desktop' => '0.12',
    ),
    'transform' => 'uppercase',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.6',
      ),
    ),
  ),
),array (
  'id' => 'zxpg2O',
  'name' => 'Quote',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '24',
        'unit' => 'px',
      ),
      'Mobile' => 
      array (
        'point' => '22',
        'unit' => 'px',
      ),
    ),
    'weight' => '600',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.9',
      ),
      'Mobile' => 
      array (
        'unit' => 'em',
        'point' => '1.6',
      ),
    ),
    'style' => 'italic',
  ),
),array (
  'id' => 'PM6GMF',
  'name' => 'SUBTITLE',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '16',
        'unit' => 'px',
      ),
    ),
    'weight' => '500',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1',
      ),
      'Tablet' => 
      array (
        'unit' => 'px',
        'point' => '',
      ),
    ),
    'transform' => 'uppercase',
    'spacing' => 
    array (
      'Desktop' => '0.2',
      'Tablet' => '0.18',
    ),
  ),
),array (
  'id' => 'IdlpaU',
  'name' => 'Text List',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '16',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.5',
      ),
    ),
    'weight' => '300',
    'spacing' => 
    array (
      'Desktop' => '0.06',
    ),
  ),
),array (
  'id' => 'GidBco',
  'name' => 'Text 14',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '14',
        'unit' => 'px',
      ),
    ),
    'weight' => '300',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.6',
      ),
    ),
  ),
),array (
  'id' => 'qC7znI',
  'name' => 'CTA',
  'font' => 
  array (
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '74',
        'unit' => 'px',
      ),
      'Mobile' => 
      array (
        'point' => '40',
        'unit' => 'px',
      ),
      'Tablet' => 
      array (
        'point' => '74',
        'unit' => 'px',
      ),
    ),
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'weight' => '800',
    'transform' => 'capitalize',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.2',
      ),
    ),
  ),
),array (
  'id' => 'f0WAAb',
  'name' => 'Super 22',
  'font' => 
  array (
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '22',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '2.2',
      ),
    ),
    'weight' => '600',
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
  ),
),array (
  'id' => 'FxHNWS',
  'name' => 'Testimonial',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '24',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.5',
      ),
    ),
    'weight' => '500',
    'style' => 'italic',
  ),
),array (
  'id' => 'iLeOE3',
  'name' => 'RALEWAY 20',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '20',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.6',
      ),
    ),
    'weight' => '600',
    'transform' => 'uppercase',
    'spacing' => 
    array (
      'Desktop' => '0.07',
    ),
  ),
),array (
  'id' => 'tW8Vy9',
  'name' => 'SUBTITLE 14',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '14',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '2.5',
      ),
    ),
    'weight' => '300',
    'transform' => 'uppercase',
    'spacing' => 
    array (
      'Desktop' => '0.15',
    ),
  ),
),array (
  'id' => 'XZzITP',
  'name' => 'Text Footer',
  'font' => 
  array (
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '13',
        'unit' => 'px',
      ),
    ),
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'weight' => '300',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.6',
      ),
    ),
  ),
),array (
  'id' => 'OR4v7W',
  'name' => 'Text 14 - 200',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '14',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.6',
      ),
    ),
    'weight' => '200',
  ),
),array (
  'id' => 'pV9o3R',
  'name' => 'Inter 16 - Call',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '16',
        'unit' => 'px',
      ),
    ),
    'weight' => '300',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.5',
      ),
    ),
    'spacing' => 
    array (
      'Desktop' => '0',
    ),
  ),
),array (
  'id' => 'MnJjef',
  'name' => 'Text Hero',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '80',
        'unit' => 'px',
      ),
      'Tablet' => 
      array (
        'point' => '',
        'unit' => 'px',
      ),
      'Mobile' => 
      array (
        'point' => '40',
        'unit' => 'px',
      ),
    ),
    'weight' => '800',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.2',
      ),
      'Tablet' => 
      array (
        'unit' => 'em',
        'point' => '',
      ),
    ),
    'spacing' => 
    array (
      'Tablet' => '0.08',
      'Mobile' => '0.15',
      'Desktop' => '0.08',
    ),
    'transform' => 'uppercase',
  ),
),array (
  'id' => 'Ji7Dy5',
  'name' => 'Super 25',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '25',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.5',
      ),
    ),
    'weight' => '400',
  ),
),array (
  'id' => 'fdWFTG',
  'name' => 'Inter 16 - 500',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '16',
        'unit' => 'px',
      ),
    ),
    'weight' => '500',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.5',
      ),
    ),
  ),
),array (
  'id' => 'qkrHiu',
  'name' => 'RALEWAY 20 - 500',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '20',
        'unit' => 'px',
      ),
      'Mobile' => 
      array (
        'point' => '20',
        'unit' => 'px',
      ),
    ),
    'weight' => '500',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.2',
      ),
      'Mobile' => 
      array (
        'unit' => 'em',
        'point' => '1.2',
      ),
    ),
    'transform' => 'uppercase',
    'spacing' => 
    array (
      'Desktop' => '0.3',
      'Mobile' => '0.34',
    ),
  ),
),array (
  'id' => 'E279sk',
  'name' => 'Form Title',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '45',
        'unit' => 'px',
      ),
      'Mobile' => 
      array (
        'point' => '40',
        'unit' => 'px',
      ),
    ),
    'weight' => '800',
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.2',
      ),
    ),
  ),
),array (
  'id' => 'MrcivH',
  'name' => 'Text - 200',
  'font' => 
  array (
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '16',
        'unit' => 'px',
      ),
    ),
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.2',
      ),
    ),
    'weight' => '200',
    'spacing' => 
    array (
      'Desktop' => '0.08',
    ),
  ),
),array (
  'id' => 'I2NNb8',
  'name' => 'SUB 14',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '14',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '2.5',
      ),
    ),
    'weight' => '300',
    'spacing' => 
    array (
      'Desktop' => '0.25',
    ),
    'transform' => 'uppercase',
  ),
),array (
  'id' => 'MIyHzu',
  'name' => 'CTA 85',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Mobile' => 
      array (
        'point' => '40',
        'unit' => 'px',
      ),
      'Desktop' => 
      array (
        'point' => '85',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Mobile' => 
      array (
        'unit' => 'em',
        'point' => '',
      ),
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.2',
      ),
    ),
    'weight' => '800',
    'transform' => 'capitalize',
  ),
),array (
  'id' => 'njCVhu',
  'name' => 'Funfact Number',
  'font' => 
  array (
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '70',
        'unit' => 'px',
      ),
    ),
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.4',
      ),
    ),
    'weight' => '400',
  ),
),array (
  'id' => 'EgwDtE',
  'name' => 'Super Open Sans',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Open Sans',
      'value' => 'Open Sans',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '32',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.6',
      ),
    ),
    'weight' => '400',
  ),
),array (
  'id' => 'JoQRLP',
  'name' => 'Funfact Title',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '16',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.2',
      ),
    ),
    'weight' => '400',
    'spacing' => 
    array (
      'Desktop' => '0.06',
    ),
  ),
),array (
  'id' => 'ALXll7',
  'name' => '404 Title',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '29',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.3',
      ),
    ),
    'weight' => '800',
    'transform' => 'uppercase',
    'spacing' => 
    array (
      'Desktop' => '0.2',
    ),
  ),
),array (
  'id' => 'KCFyqE',
  'name' => 'CATEGORY',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '10',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1',
      ),
    ),
    'weight' => '400',
    'transform' => 'uppercase',
    'spacing' => 
    array (
      'Desktop' => '0.2',
    ),
  ),
),array (
  'id' => '0P2J13',
  'name' => 'Quote Single',
  'font' => 
  array (
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '18',
        'unit' => 'px',
      ),
      'Mobile' => 
      array (
        'point' => '',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.4',
      ),
    ),
    'weight' => '400',
    'style' => 'italic',
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
  ),
),array (
  'id' => 'Pu5UFe',
  'name' => 'TEXT LINK',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Inter',
      'value' => 'Inter',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '14',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '0.8',
      ),
    ),
    'weight' => '400',
    'transform' => 'uppercase',
    'decoration' => 'default',
    'spacing' => 
    array (
      'Desktop' => '0.05',
    ),
  ),
),array (
  'id' => 'IjKYHt',
  'name' => 'Hero Single',
  'font' => 
  array (
    'font' => 
    array (
      'label' => 'Raleway',
      'value' => 'Raleway',
      'type' => 'google',
    ),
    'size' => 
    array (
      'Desktop' => 
      array (
        'point' => '80',
        'unit' => 'px',
      ),
      'Tablet' => 
      array (
        'point' => '60',
        'unit' => 'px',
      ),
      'Mobile' => 
      array (
        'point' => '40',
        'unit' => 'px',
      ),
    ),
    'lineHeight' => 
    array (
      'Desktop' => 
      array (
        'unit' => 'em',
        'point' => '1.2',
      ),
    ),
    'weight' => '800',
  ),
),
		);
	}

	/**
	 * Register Block Pattern.
	 */
	public function register_block_patterns() {
		new Block_Patterns();
	}

	/**
	 * Enqueue scripts and styles.
	 */
	public function dashboard_scripts() {
		$screen = get_current_screen();
		wp_enqueue_script('wp-api-fetch');

		if ( is_admin() ) {
			// enqueue css.
			wp_enqueue_style(
				'sovy-dashboard',
				SOVY_URI . '/assets/css/theme-dashboard.css',
				array(),
				SOVY_VERSION
			);

			// enqueue js.
			wp_enqueue_script(
				'sovy-dashboard',
				SOVY_URI . '/assets/js/theme-dashboard.js',
				array( 'wp-api-fetch' ),
				SOVY_VERSION,
				true
			);

			wp_localize_script( 'sovy-dashboard', 'GutenThemeConfig', $this->theme_config() );
		}
	}

	/**
	 * Check if plugin is installed.
	 *
	 * @param string $plugin_slug plugin slug.
	 * 
	 * @return boolean
	 */
	public function is_installed( $plugin_slug ) {
		$all_plugins = get_plugins();
		foreach ( $all_plugins as $plugin_file => $plugin_data ) {
			$plugin_dir = dirname($plugin_file);

			if ($plugin_dir === $plugin_slug) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Register static data to be used in theme's js file
	 */
	public function theme_config() {
		$active_plugins = get_option( 'active_plugins' );
		$plugins = array();
		foreach( $active_plugins as $active ) {
			$plugins[] = explode( '/', $active)[0];
		}

		$config = array(
			'home_url'      => home_url(),
			'version'       => SOVY_VERSION,
			'images'        => SOVY_URI . '/assets/img/',
			'title'         => esc_html__( 'Sovy', 'sovy' ),
			'description'   => esc_html__( 'Sovy is a clean and modern WordPress theme specially designed for restaurants, cafes, bars, culinary ventures, and any food-related business. Fully compatible with the WordPress block editor, Sovy makes customization easy and provides all the essential tools to build a website that perfectly represents your brand.', 'sovy' ),
			'pluginTitle'   => esc_html__( 'Plugin Requirement', 'sovy' ),
			'pluginDesc'    => esc_html__( 'This theme require some plugins. Please make sure all the plugin below are installed and activated.', 'sovy' ),
			'note'          => esc_html__( '', 'sovy' ),
			'note2'         => esc_html__( '', 'sovy' ),
			'demo'          => esc_html__( '', 'sovy' ),
			'demoUrl'       => esc_url( 'https://gutenverse.com/demo?name=sovy' ),
			'install'       => '',
			'installText'   => esc_html__( 'Install Gutenverse Plugin', 'sovy' ),
			'activateText'  => esc_html__( 'Activate Gutenverse Plugin', 'sovy' ),
			'doneText'      => esc_html__( 'Gutenverse Plugin Installed', 'sovy' ),
			'dashboardPage' => admin_url( 'themes.php?page=sovy-dashboard' ),
			'logo'          => SOVY_URI . 'assets/img/sovy.png',
			'slug'          => 'sovy',
			'upgradePro'    => 'https://gutenverse.com/pro',
			'supportLink'   => 'https://support.jegtheme.com/forums/forum/fse-themes/',
			'libraryApi'    => 'https://gutenverse.com//wp-json/gutenverse-server/v1',
			'docsLink'      => 'https://support.jegtheme.com/theme/fse-themes/',
			'pages'         => array(
				
			),
			'plugins'      => array(
				array(
					'slug'       		=> 'gutenverse',
					'title'      		=> 'Gutenverse',
					'short_desc' 		=> 'GUTENVERSE – GUTENBERG BLOCKS AND WEBSITE BUILDER FOR SITE EDITOR, TEMPLATE LIBRARY, POPUP BUILDER, ADVANCED ANIMATION EFFECTS, 45+ FREE USER-FRIENDLY BLOCKS',
					'active'    		=> in_array( 'gutenverse', $plugins, true ),
					'installed'  		=> $this->is_installed( 'gutenverse' ),
					'icons'      		=> array (
  '1x' => 'https://ps.w.org/gutenverse/assets/icon-128x128.gif?rev=3132408',
  '2x' => 'https://ps.w.org/gutenverse/assets/icon-256x256.gif?rev=3132408',
),
					'download_url'      => '',
				),
				array(
					'slug'       		=> 'gutenverse-form',
					'title'      		=> 'Gutenverse Form',
					'short_desc' 		=> 'GUTENVERSE FORM – FORM BUILDER FOR GUTENBERG BLOCK EDITOR, MULTI-STEP FORMS, CONDITIONAL LOGIC, PAYMENT, CALCULATION, 15+ FREE USER-FRIENDLY FORM BLOCKS',
					'active'    		=> in_array( 'gutenverse-form', $plugins, true ),
					'installed'  		=> $this->is_installed( 'gutenverse-form' ),
					'icons'      		=> array (
  '1x' => 'https://ps.w.org/gutenverse-form/assets/icon-128x128.png?rev=3135966',
),
					'download_url'      => '',
				),
				array(
					'slug'       		=> 'gutenverse-companion',
					'title'      		=> 'Gutenverse Companion',
					'short_desc' 		=> 'A companion plugin designed specifically to enhance and extend the functionality of Gutenverse base themes. This plugin integrates seamlessly with the base themes, providing additional features, customization options, and advanced tools to optimize the overall user experience and streamline the development process.',
					'active'    		=> in_array( 'gutenverse-companion', $plugins, true ),
					'installed'  		=> $this->is_installed( 'gutenverse-companion' ),
					'icons'      		=> array (
  '1x' => 'https://ps.w.org/gutenverse-companion/assets/icon-128x128.png?rev=3162415',
),
					'download_url'      => '',
				)
			),
			'assign'       => array(
				array(
						'title' => 'Home - Style 1',
						'page'  => 'Home - Style 1',
						'demo'  => 'https://fse.jegtheme.com/sovy/home-style-1/',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-home.webp',
					),
				array(
						'title' => 'Home - Style 2',
						'page'  => 'Home - Style 2',
						'demo'  => 'https://fse.jegtheme.com/sovy/home-style-2/',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-home-alt.webp',
					),
				array(
						'title' => 'Home - Style 3',
						'page'  => 'Home - Style 3',
						'demo'  => 'https://fse.jegtheme.com/sovy/home-style-3/',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-home-three.webp',
					),
				array(
						'title' => 'Home - Style 4',
						'page'  => 'Home - Style 4',
						'demo'  => 'https://fse.jegtheme.com/sovy/home-style-4/',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-home-four-1.webp',
					),
				array(
						'title' => 'About Us',
						'page'  => 'About Us',
						'demo'  => 'https://fse.jegtheme.com/sovy/about-us/',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-about-us.webp',
					),
				array(
						'title' => 'Menu - Style 1',
						'page'  => 'Menu - Style 1',
						'demo'  => 'https://fse.jegtheme.com/sovy/menu-style-1/',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-menu.webp',
					),
				array(
						'title' => 'Menu - Style 2',
						'page'  => 'Menu - Style 2',
						'demo'  => 'https://fse.jegtheme.com/sovy/menu-style-2/',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-menu-alt.webp',
					),
				array(
						'title' => 'Reservation - Style 1',
						'page'  => 'Reservation - Style 1',
						'demo'  => 'https://fse.jegtheme.com/sovy/reservation-style-1/',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-reservation.webp',
					),
				array(
						'title' => 'Reservation - Style 2',
						'page'  => 'Reservation - Style 2',
						'demo'  => 'https://fse.jegtheme.com/sovy/reservation-style-2/',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-reservation-alt.webp',
					),
				array(
						'title' => 'Services',
						'page'  => 'Services',
						'demo'  => 'https://fse.jegtheme.com/sovy/services/',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-services.webp',
					),
				array(
						'title' => 'Our Chef',
						'page'  => 'Our Chef',
						'demo'  => 'https://fse.jegtheme.com/sovy/our-chef/',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-our-chef.webp',
					),
				array(
						'title' => 'Gallery',
						'page'  => 'Gallery',
						'demo'  => 'https://fse.jegtheme.com/sovy/gallery',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-gallery.webp',
					),
				array(
						'title' => 'Contact Us',
						'page'  => 'Contact Us',
						'demo'  => 'https://fse.jegtheme.com/sovy/contact-us/',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-contact-us.webp',
					),
				array(
						'title' => 'Blog',
						'page'  => 'Blog',
						'demo'  => 'https://fse.jegtheme.com/sovy/blog',
						'slug'  => 'blank-canvas',
						'thumb' => SOVY_URI . 'assets/img/ss-cover-sovy-blog.webp',
					)
			),
			'dashboardData'=> array(
				
			),
			'isThemeforest' => true,
		);

		if ( isset( $config['assign'] ) && $config['assign'] ) {
			$assign = $config['assign'];
			foreach ( $assign as $key => $value ) {
				$query = new \WP_Query(
					array(
						'post_type'      => 'page',
						'post_status'    => 'publish',
						'title'          => '' !== $value['page'] ? $value['page'] : $value['title'],
						'posts_per_page' => 1,
					)
				);

				if ( $query->have_posts() ) {
					$post                     = $query->posts[0];
					$page_template            = get_page_template_slug( $post->ID );
					$assign[ $key ]['status'] = array(
						'exists'         => true,
						'using_template' => $page_template === $value['slug'],
					);

				} else {
					$assign[ $key ]['status'] = array(
						'exists'         => false,
						'using_template' => false,
					);
				}

				wp_reset_postdata();
			}
			$config['assign'] = $assign;
		}

		return $config;
	}

	/**
	 * Add Menu
	 */
	public function admin_menu() {
		add_theme_page(
			'Sovy Dashboard',
			'Sovy Dashboard',
			'manage_options',
			'sovy-dashboard',
			array( $this, 'load_dashboard' ),
			1
		);
	}

	/**
	 * Template page
	 */
	public function load_dashboard() {
		?>
			<div id="gutenverse-theme-dashboard">
			</div>
		<?php
	}
}
