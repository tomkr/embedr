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
 * Template Name: Viewer
 */
 add_filter('show_admin_bar', '__return_false');
 $imageId = get_query_var( 'image_id', '' );
 $url = 'http://media.embedr.eu/'.$imageId.'/manifest.json';
 $json = file_get_contents($url);
 $metadata = json_decode($json);
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
    <meta name="dc:title" content="<?php echo($metadata->label)?>"/>
    <?php foreach ($metadata->metadata as $item) {
      if($item->label == 'Author') {
        $name = "dc:creator";
        $creator = $item->value;
      }
      elseif($item->label == 'Source') {
        $name = "dc:source";
      }
      elseif($item->label == 'Institution') {
        $name = "dc:publisher";
        $publisher = $item->value;
      }
      elseif($item->label == 'Institution link') {
        break;
      }
      echo('<meta name="'.$name.'" content="'.$item->value.'"/>');
    }
	if($creator == '') {
	  $creator = 'unknown';
	}
	if ($metadata->label == '') {
	  $metadata->label = 'untitled';
	}
    ?>
    <meta name="dc:rights" content="<?php echo($metadata->license)?>"/>
    <meta name="dc:description" content="<?php echo($metadata->description)?>"/>
    <!-- Open Graph Integrations -->
    <meta property="og:title" content="<?php echo($metadata->label)?>"/>
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Embedr.eu | Image Embedding Done Right"/>
    <meta property="og:image" content="http://iiif.embedr.eu/<?php echo($imageId); ?>/full/1200,/0/native.jpg"/>
    <meta property="og:url" content="http://embedr.eu/<?php echo($imageId); ?>/"/>
    <meta property="og:description" content="<?php echo($metadata->label); ?> | <?php echo($creator); ?> | <?php echo $publisher; ?> | available under: <?php echo($metadata->license)?>"/>

    <!-- Twitter Integrations -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@embedr_eu">
    <meta name="twitter:creator" content="<?php echo($creator); ?>">
    <meta name="twitter:title" content="<?php echo($metadata->label)?>">
    <meta name="twitter:description" content="<?php echo($metadata->label); ?> | <?php echo($creator); ?> | <?php echo $publisher; ?> | available under: <?php echo($metadata->license); ?>">
    <meta name="twitter:image" content="http://iiif.embedr.eu/<?php echo($imageId); ?>/full/1200,/0/native.jpg"/>

    <link rel="alternate" type="application/json+oembed" href="<?php echo('http://media.embedr.eu/oembed?url=http%3A//media.embedr.eu/'.$imageId.'/0&format=json')?>" title="<?php echo($metadata->label)?>" />
    <link rel="alternate" type="text/xml+oembed" href="<?php echo('http://media.embedr.eu/oembed?url=http%3A//media.embedr.eu/'.$imageId.'/0&format=xml')?>" title="<?php echo($metadata->label)?>" />

    <title><?php echo($metadata->label)?></title>

    <?php wp_head(); ?>
  </head>

  <body>
    <div id="detail"></div>
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
