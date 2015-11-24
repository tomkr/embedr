<?php
/**
 * The template for displaying pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 *
 * @package Embedr.eu
 * @subpackage Embedr.eu
 * @since Embedr.eu 1.0
 */
 add_filter('show_admin_bar', '__return_false');
 $query = get_query_var( 'query', '' );
 $license = get_query_var( 'license', '');
 ?>
<!DOCTYPE html>
<html class="no-js" xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://ogp.me/ns#" xmlns:fb="https://www.facebook.com/2008/fbml" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <!--[if lt IE 9]>
    <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/html5.js"></script>
    <![endif]-->

    <title>Embedr | Search results for <?php echo($query)?></title>

    <?php wp_head(); ?>
  </head>

  <body>
    <div id="results"></div>
    <script>
      window.query = "<?php echo($query); ?>";
      window.license = "<?php echo($license); ?>";
    </script>
    <script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/results.js"></script>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-64494530-1', 'auto');
      ga('send', 'pageview');

    </script>
    <?php wp_footer(); ?>
  </body>
</html>
