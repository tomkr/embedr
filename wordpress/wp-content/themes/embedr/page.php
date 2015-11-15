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

get_header(); ?>

	<div id="search"></div>
	<div class="content__wrapper">
		<div class="content__left">
			<aside>
				<?php
					if($post->post_parent)
						$children = wp_list_pages("title_li=&child_of=".$post->post_parent."&echo=0");
					else
						$children = wp_list_pages("title_li=&child_of=".$post->ID."&echo=0");
					if ($children) { ?>
						<ul>
							<?php echo $children; ?>
						</ul>
				<?php } ?>
			</aside>
		</div>
		<div class="content__page">

		<?php
		// Start the loop.
		while ( have_posts() ) : the_post();

			// Include the page content template.
			get_template_part( 'content', 'page' );

			// If comments are open or we have at least one comment, load up the comment template.
			// if ( comments_open() || get_comments_number() ) :
			// 	comments_template();
			// endif;

		// End the loop.
		endwhile;
		?>
		</div>
	</div>

<?php get_footer(); ?>
