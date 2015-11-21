<?php
/**
 * Embedr.eu->Twenty Fifteen back compat functionality
 *
 * Prevents Embedr.eu from running on WordPress versions prior to 4.1,
 * since this theme is not meant to be backward compatible beyond that and
 * relies on many newer functions and markup changes introduced in 4.1.
 *
 * @package Embedr.eu
 * @subpackage Embedr.eu
 * @since Embedr.eu 1.0
 */

/**
 * Prevent switching to Embedr.eu on old versions of WordPress.
 *
 * Switches to the default theme.
 *
 * @since embedr.eu 1.0
 */
function embedr_switch_theme() {
	switch_theme( WP_DEFAULT_THEME, WP_DEFAULT_THEME );
	unset( $_GET['activated'] );
	add_action( 'admin_notices', 'embedr_upgrade_notice' );
}
add_action( 'after_switch_theme', 'embedr_switch_theme' );

/**
 * Add message for unsuccessful theme switch.
 *
 * Prints an update nag after an unsuccessful attempt to switch to
 * Embedr.eu on WordPress versions prior to 4.1.
 *
 * @since embedr.eu 1.0
 */
function embedr_upgrade_notice() {
	$message = sprintf( __( 'Embedr.eu requires at least WordPress version 4.1. You are running version %s. Please upgrade and try again.', 'embedr' ), $GLOBALS['wp_version'] );
	printf( '<div class="error"><p>%s</p></div>', $message );
}

/**
 * Prevent the Customizer from being loaded on WordPress versions prior to 4.1.
 *
 * @since embedr.eu 1.0
 */
function embedr_customize() {
	wp_die( sprintf( __( 'Embedr.eu requires at least WordPress version 4.1. You are running version %s. Please upgrade and try again.', 'embedr' ), $GLOBALS['wp_version'] ), '', array(
		'back_link' => true,
	) );
}
add_action( 'load-customize.php', 'embedr_customize' );

/**
 * Prevent the Theme Preview from being loaded on WordPress versions prior to 4.1.
 *
 * @since embedr.eu 1.0
 */
function embedr_preview() {
	if ( isset( $_GET['preview'] ) ) {
		wp_die( sprintf( __( 'Embedr.eu requires at least WordPress version 4.1. You are running version %s. Please upgrade and try again.', 'embedr' ), $GLOBALS['wp_version'] ) );
	}
}
add_action( 'template_redirect', 'embedr_preview' );
