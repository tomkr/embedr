<?php
/**
 * The template for displaying pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
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
    <!--[if lt IE 9]>
    <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/html5.js"></script>
    <![endif]-->

    <link rel=stylesheet href="/styles/detail.css">
  </head>

  <body>
    <div id="detail"></div>
    <script src="/scripts/vendor.js"></script>
    <script>
      window.imageId = '<?php echo(get_query_var( "image_id", "" )) ?>';
    </script>
    <script src="/scripts/detail.js"></script>

    <?php wp_footer(); ?>
  </body>
</html>
