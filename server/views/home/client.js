'use strict';

;(function($){

	$(".mask").delay(1000).fadeOut("slow");

	$('#home').parallax("30%", 0.1);
	$('#status').parallax("30%", 0.1);
	$('#another').parallax("30%", 0.1);
	$('#wprocess').parallax("30%", 0.1);
	$('#hire').parallax("30%", 0.1);
	$('#twitter').parallax("30%", 0.1);
	//$('#parallax-1').parallax("30%", 0.1);
	//$('#parallax-2').parallax("30%", 0.1);
		/*add as necessary*/

	//Slide Panel    
	var navistatus = 0;
	$("#open-nav").click(function(){
		if(navistatus==0){
			$("#header")
				.clearQueue()
				.animate({
					left: '0'
			},500,'swing');

			$("#page-wrapper")
				.clearQueue()
				.animate({
					left: '260px'
			},500,'swing');

			navistatus = 1;
		} else {
			$("#page-wrapper")
				.clearQueue()
				.animate({
					left: '0'
			},600,'easeOutBounce');

			$("#header")
				.clearQueue()
				.animate({
					left: '-260px'
			},600,'easeOutBounce');

			navistatus = 0;
		}
	});

	$('#open-nav ').click(function () {
		var $this = $(this);
		if ($this.hasClass('fa fa-bars')) {
			$this.removeClass('ffa fa-bars').addClass('fa fa-times');
		} else {
			$this.removeClass('fa fa-times').addClass('fa fa-bars');
		}
	});
	//End Slide Panel

	//onepage nav
	$('#navs,.nav').onePageNav({
		currentClass: 'active',
		filter: ':not(.external)',
		scrollThreshold: 0.25,
		scrollOffset: 0
	});

	//Twitter
	$('.tweets-list-container').tweetscroll({ 
		username: 'envatowebdesign', 
		time: true, 
		limit: 11,
		replies: true, 
		position: 'append', 
		date_format: 'style2', 
		animation: 'slide_up', 
		visible_tweets: 1 
	});

	//tooltips
	$('body').tooltip({
		selector: "a[data-toggle=tooltip]"
	});

	//Animated Progress Bars
	$('.skill li').each(function () {
		$(this).appear(function() {

			$(this).animate({opacity:1,left:"0px"},1200);
			var b = $(this).find("span").attr("data-width");
			$(this).find("span").animate({
			width: b + "%"
			}, 1700, "easeOutCirc");
		});	
	});

	//Animated Counters
	$('.count').each(function () {
		$(".total-numbers .sum").appear(function() {
		var counter = $(this).html();
		$(this).countTo({
			from: 0,
			to: counter,
			speed: 2000,
			refreshInterval: 60,
			});
		});
	});

	//Responsive slide For blog
	$("#blog-carousel").owlCarousel({
		autoPlay: 3000,
		navigation : false, // Show next and prev buttons
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true
									 
		// "singleItem:true" is a shortcut for:
		// items : 1,
		// itemsDesktop : false,
		// itemsDesktopSmall : false,
		// itemsTablet: false,
		// itemsMobile : false
	});

})(jQuery);