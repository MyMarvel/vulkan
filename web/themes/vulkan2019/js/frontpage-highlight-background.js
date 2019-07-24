(function ($, Drupal, drupalSettings) {
	'use strict';
	var right_image = drupalSettings.path.baseUrl + 'themes/vulkan2019/img/main-right.jpg';
	var left_image = drupalSettings.path.baseUrl + 'themes/vulkan2019/img/main-left.jpg';
	Drupal.behaviors.handle_background_highlight = {
		attach: function (context, settings) {
			$("#page-header:not(processed)").addClass('processed').on('mousemove', function(event ) {
				if ($(this).hasClass('main-left') && event.pageX > $(window).width() / 2) {
					document.getElementById("page-header").style.backgroundImage = 'url("' + right_image + '")';
					$(this).removeClass('main-left');
					$(this).addClass('main-right');
					$(this).attr('title', 'Перейти на страницу, посвященную Металлоконструкциям');
				}
				if ($(this).hasClass('main-right') && event.pageX < $(window).width() / 2) {
					document.getElementById("page-header").style.backgroundImage = 'url("' + left_image + '")';
					$(this).removeClass('main-right');
					$(this).addClass('main-left');
					$(this).attr('title', 'Перейти на страницу, посвященную Ковке');
				}
				if (!$(this).hasClass('main-left') && !$(this).hasClass('main-right')) {
					$(this).addClass('main-left');
					document.getElementById("page-header").style.backgroundImage = 'url("' + left_image + '")';
					$(this).attr('title', 'Перейти на страницу, посвященную Ковке');
				}
			}).css('cursor', 'pointer').click(function(e) {
				if($(e.target).is('#edit-submit')) {
					$(e.target).parents('form').submit();
					return false;
				}
				if($(e.target).is('input')){
					e.preventDefault();
					return;
				}
				if (event.pageX > $(window).width() / 2) {
					location.href = '/node/2';
				}
				else {
					location.href = '/node/1';
				}
			});
		}
	};

	$(document).ready(function() {
		// Graceful preload additional background images
		var img1 = new Image();
		var img2 = new Image();
		img1.src = right_image;
		img1.src = left_image;
	});
})(jQuery, Drupal, drupalSettings);