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
 $imageId = get_query_var( 'image_id', '' );
 $url = 'http://media.embedr.eu/'.$imageId.'/manifest.json';
 $json = file_get_contents($url);
 $metadata = json_decode($json);

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
    <meta name="dc:title" content="<?php echo($metadata->label)?>"/>
    <?php foreach ($metadata->metadata as $item) {
      if($item->label == 'Author') {
        $name = "dc:creator";
      }
      elseif($item->label == 'Source') {
        $name = "dc:source";
      }
      elseif($item->label == 'Institution') {
        $name = "dc:publisher";
      }
      elseif($item->label == 'Institution link') {
        break;
      }
      echo('<meta name="'.$name.'" content="'.$item->value.'"/>');
    }
    ?>
    <meta name="dc:rights" content="<?php echo($metadata->license)?>"/>
    <meta name="dc:description" content="<?php echo($metadata->description)?>"/>

    <link rel="alternate" type="application/json+oembed" href="<?php echo('application/json+oembed" href="http://media.embedr.eu/oembed?url=http%3A//media.embedr.eu/'.$imageId.'/0&format=json')?>" title="<?php echo($metadata->label)?>" />
    <link rel="alternate" type="text/xml+oembed" href="<?php echo('application/json+oembed" href="http://media.embedr.eu/oembed?url=http%3A//media.embedr.eu/'.$imageId.'/0&format=xml')?>" title="<?php echo($metadata->label)?>" />

    <title><?php echo($metadata->label)?></title>

    <link rel=stylesheet href="/styles/detail.css">
  </head>

  <body>
    <div id="detail"></div>
    <script src="/scripts/vendor.js"></script>
    <script>
      window.imageId = '<?php echo(get_query_var( "image_id", "" )) ?>';
    </script>
    <script src="/scripts/detail.js"></script>
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
