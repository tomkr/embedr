<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
 add_filter('show_admin_bar', '__return_false');
?>
<!DOCTYPE html>
<html class="no-js">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<!--[if lt IE 9]>
	<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/html5.js"></script>
	<![endif]-->
	
	<!-- Open Graph for generic site -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Embedr.eu | Image Embedding Done Right"/>
	<meta property="og:image" content=""/>
	<meta property="og:site_name" content="Embedr.eu"/>
	<meta property="og:description" content="Embedr.eu is an image embedding platform that allows easy embedding of reusable cultural heritage images."/>
	
	<?php //wp_head(); ?>
	<link rel=stylesheet href="/styles/main.css">
</head>

<body>
