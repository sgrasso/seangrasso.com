'use strict';

$(document).ready(function() {

	$('#mask').delay(1500).fadeOut('slow');
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
	/*add as necessary*/

	$('.circlestat', '#skills').appear(function(){
		$(this).circliful();
	});

	$('.tweets-list-container', '#twitter').owlCarousel({
		autoPlay: 6000,
		navigation : false,
		slideSpeed : 300,
		singleItem:true,
		pagination:false,
		stopOnHover:true
	});

	//onepage nav
	$('#navs,.nav').onePageNav({
		currentClass: 'active',
		filter: ':not(.external)',
		scrollThreshold: 0.25,
		scrollOffset: 0
	});
	
	var navActive = window.location.pathname;
	if (navActive !== '/'){
		$('a[href*="' + navActive + '"]', '.nav').addClass('active');
	}

	console.log(navActive)
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

	//Portfolio Isotope
	var $container = $('.portfolio-container', '#portfolio'),
		$optionSets = $('#options .option-set'),
		$optionLinks = $optionSets.find('a');

	setTimeout(function(){
		$container.isotope({
			itemSelector : '.portfolio-item',
			percentPosition: true,
			masonry: {columnWidth: 0, fitWidth: true}
		});
	}, 1);
	
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