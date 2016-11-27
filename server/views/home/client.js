'use strict';

;(function($){

	$('.mask').delay(2000).fadeOut('slow');

	//Sticky Navigation
	$('.main-nav', '#page-wrapper').sticky({ topSpacing: 0 });

	//Responsive Nav and tooltips
	$('.nav a.colapse-menu1').click(function () { $('.navbar-collapse').collapse('hide') });
	$('body')
		.on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); })
		.tooltip({ selector: 'a[data-toggle=tooltip]' }); 

	//Parallax
	$('#home').parallax('30%', 0.1);
	$('#status').parallax('30%', 0.1);
	$('#another').parallax('30%', 0.1);
	$('#wprocess').parallax('30%', 0.1);
	$('#hire').parallax('30%', 0.1);
	$('#twitter').parallax('30%', 0.1);
	//$('#parallax-1').parallax('30%', 0.1);
	/*add as necessary*/

	// Appear Animations 
	// TODO: proper selector.
	// $('*').each(function(){
	// 	var $this = $(this);
	// 	var $animationName = $this.attr('data-animation');
	// 	if($animationName) {
	// 		$this.appear(function() {
	// 			$this.addClass('animated').addClass($animationName);
	// 		});
	// 	}
	// });

	//Twitter
	$('.tweets-list-container', '#twitter').tweetscroll({ 
		username: 'spgrasso', 
		time: true, 
		limit: 11,
		replies: true, 
		position: 'append', 
		date_format: 'style2', 
		animation: 'slide_up', 
		visible_tweets: 1 
	});


	$('.circlestat').appear(function(){
		$(this).circliful();
	});

	//Animated Progress Bars
	// $('.skill li', '#skills').each(function () {
	// 	$(this).appear(function() {
	// 		var $this = $(this);
	// 		var b = $this.find('span').attr('data-width');
	// 		$this.animate({opacity:1,left:'0px'},1200);
	// 		$this.find('span').animate({
	// 			width: b + '%'
	// 		}, 1700, 'easeOutCirc');
	// 	});	
	// });

	//Animated Counters
	$('.count', '#status').each(function () {
		$('.total-numbers .sum', this).appear(function() {
			var $this = $(this);
			$this.countTo({
				from: 0,
				to: $this.html(),
				speed: 3000,
				refreshInterval: 60,
			});
		});
	});
	
$(window).load(function(){
	//Responsive slide For blog
	$('#blog-carousel').owlCarousel({
		autoPlay: 3000,
		navigation : false,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true
	});

	//Masonry Blog
	$('.blog-post-holder', '#blog').isotope({
		percentPosition: true,
		masonry: {}, 
		animationOptions: {
			duration: 750,
			easing: 'linear',
			queue: false
		}
	});

	//Portfolio Isotop
	var $container = $('.portfolio-container', '#portfolio'),
		$optionSets = $('#options .option-set'),
		$optionLinks = $optionSets.find('a');
	
	$container.isotope({
		itemSelector : '.portfolio-item',
		percentPosition: true,
		masonry: {columnWidth: 0, fitWidth: true}
	});
	
	$optionLinks.click(function(){
		var options = {}, $optionSet = '', $this = $(this), key = '', value = '';

		// don't proceed if already selected
		if ($this.hasClass('selected'))
			return false;

		$optionSet = $this.parents('.option-set');
		$optionSet.find('.selected').removeClass('selected');
		$this.addClass('selected');

		// make option object dynamically, i.e. { filter: '.my-filter-class' }
		key = $optionSet.attr('data-option-key');
		value = $this.attr('data-option-value');

		// parse 'false' as false boolean
		options[ key ] = (value === 'false') ? false : value;

		if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			// changes in layout modes need extra logic
			changeLayoutMode( $this, options );
		} else {
			// otherwise, apply new options
			$container.isotope( options );
		}

		return false;
	});
});

})(jQuery);