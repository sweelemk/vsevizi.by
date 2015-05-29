$(window).load(function(){	



	var $fullHeight = $(".full-height"),
		$wrapper = $('#wrapper'),
		$section = $('#section'),
		$valign = $('.valign'),
		$imgFit = $('.img-fit'),
		$header = $('#header'),
		$owl = $('.owl-carousel');
	
	
	//init Device
	function initDevice(){
		var isTouchDevice = (function() {
			try {
				return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
			} catch (e) {
				return false;
			}
		}());
		if(isTouchDevice){
			jQuery('body').addClass('touch-device');
			jQuery('body').attr('id', 'touch-device');
		}
	};

	//placeholder 
	$('input[placeholder], textarea[placeholder]').placeholder();

	function initSearch(){
		var parent = $('.middle-box'),
			input = $('.search-line');

		input.focus(function(){	 
			var time = setTimeout(function(){
			 	$('.search-line').attr("placeholder", "Введите страну или шенген");
			},150);
			$(document).on('click', function(){
				clearTimeout(time);
			});
		});
		input.blur(function(){			
			$(this).attr("placeholder", "Найти визу");
		});
		input.on('click', function(e){
			parent.addClass('is-open');
			e.stopPropagation();
		});
		$(".btn-close").on("click", function(){
			$(this).parents(".js-search").find(".search-line").val("");
			parent.removeClass('is-open');
			$('.js-overlay').fadeOut(300);
			$header.removeClass('fixed');
			$('.js-resalt').fadeOut(300);
			$('.header-nav').removeClass('hidden');
			if ($('#wrapper').hasClass("full")) {
				$('#section').css('margin-top', $header.height());
			}else {
				$('#section').css('margin-top', 0);
			}
		});
		$(document).on("click", function(){
			$(".js-search").find(".search-line").val("");
			parent.removeClass('is-open');
			$('.js-overlay').fadeOut(300);
			$header.removeClass('fixed');
			$('.js-resalt').fadeOut(300);
			$('.header-nav').removeClass('hidden');
			if ($('#wrapper').hasClass("full")) {
				$('#section').css('margin-top', $header.height());
			}else {
				$('#section').css('margin-top', 0);
			}
		});
		$(".js-resalt").on("click", function(){
			return false;
		});
	};

	function mobileSearch() {
		var input = $('.search-line');

		$('.js-search').on("click", function() {
			$('body').addClass('modal-visible modal-iframe-visible')
			$('.modal').addClass('visible');
			$wrapper.addClass('hidden');
			_one();

		});
	}
	function _one() {
        var all_meta = document.getElementsByTagName("meta")
        var a = "width=device-width, initial-scale=1, user-scalable=no"
        var d = "width=1024,user-scalable=yes"
        for (var i=0; i<all_meta.length; i++) {
            if (all_meta[i].name.toLowerCase() != "viewport") continue;
            all_meta[i].content = "width=device-width, initial-scale=1, user-scalable=no";
        }
		var iframe = document.getElementsByTagName('iframe')[0];
		var iframeDoc = iframe.contentWindow.document;
		iframeDoc.getElementById("loc").focus();
    }
	
	function findElements() {
		var find_val = $('.search-line').val().length,
			close = $('.btn-close'),
			overlay = $('.overlay');
		if (find_val > 0){
			$header.addClass('fixed');
			overlay.fadeIn(300);
			$('.js-resalt').fadeIn(300);
			$('.header-nav').addClass('hidden');
			$('#section').css('margin-top', $header.height());
		} else {
			$header.removeClass('fixed');
			overlay.fadeOut(300);
			$('.js-resalt').fadeOut(300);
			$('.header-nav').removeClass('hidden');
			if ($('#wrapper').hasClass("full")) {
				$('#section').css('margin-top', $header.height());
			}else {
				$('#section').css('margin-top', 0);
			}
			
		};
	};

	function initHeader() {
		if ($('#wrapper').hasClass("full")) {
			$('#section').css('margin-top', $header.height());
			$('#header').css('top', -$header.height());
		}
	};

	initHeader();
	initDevice();
	posContent();
	initOwl();	

	if(!$('body').hasClass('touch-device')){
		findElements();
		$(".search-line").on('input', function(){
			findElements();
		});
		initSearch();
		$(window).resize(function(){
			posContent();
			initOwl();
			$owl.on('refresh.owl.carousel');
		});
		$(window).scroll(function(){
			//scrollContent();
		});
	} else {
		mobileSearch();
	}

	

	function posContent(){
		
		$('#quote').each(function(){
			$('.bg-gallery', this)
				.width($wrapper.width())
				.css('margin-left', - ($wrapper.width() / 2 - $('.homepage').width() / 2));
		});
		//FULL HEIGHT
		$fullHeight.height($(window).height() - $('#header').height());

		// Centered Vertically
		$valign.each(function(){
			$(this).css('padding-top', ($(this).parents('.bg-gallery').height()/6.19));
			var left = ($(this).parents('.bg-gallery').width()/2 - $('.homepage').width()/2);
			if (left <=50) left = 50;
			$(this).css('left', left);

			$(this).css('width', ($('.homepage').width()));
		});

		// Fit Images
		$imgFit.each(function(){
			var bg_main = $(this);
			var wrapper = $(this).parents('.bg-gallery');
			var wrapperWidth = wrapper.width();
			var wrapperHeight = wrapper.height();

			bg_main
				.width(wrapperWidth)
				.height(wrapperHeight)
		});

		scrollContent();
	};

	function scrollContent(){
		var totalScroll = $(document).height() - $(window).height(),
			newScroll = $('body, html').scrollTop();
		
		$('#quote').each(function(){
			var scrolled = $(window).scrollTop();
			var tempOpacity = 1 - (scrolled / ($(window).height() / 2));

			$('.item-img').css('top', (0 + (scrolled * .25)) + 'px');
			$('.content').css('opacity',tempOpacity);

			$('.owl-controls').css('bottom', (70 - (scrolled * .25)) + 'px');
			$('.owl-controls').css('opacity',tempOpacity);
		});
	};
	
	//slick init
	function initOwl() {		
		$owl.owlCarousel({
			items: 1,
			startPosition: 1,
			animateOut: 'container--animOutLeft',
    		animateIn: 'container--animInRight',
    		nav: true,
    		dots: true,
    		touchDrag: false,
    		mouseDrag: false,
    		pullDrag: false
		});
	};

	//sliders
	if ($('.js-slider-box').length){
		$('.js-slider-box').owlCarousel({
			items: 1,
			nav: true,
    		dots: true,
    		loop: true,
    		startPosition: 1,
		});
	}

		$('.slide-image').slick({
			arrows: false,
			dots: true,
			fade: true,
			initialSlide: 1,
			cssEase: 'ease',
			asNavFor: '.reviews-text'
		});
		$('.reviews-text').slick({
			arrows: false,
			dots: false,
			asNavFor: '.slide-image',
			initialSlide: 1,
			adaptiveHeight: true
		});

	// popups
	$(".js-popup-link").on("click", function(){
		$('html').addClass('open-popup');
		$(".js-popup-overlay").fadeIn(300);
		var popup = $(this).data("href");
		$('[data-popup="'+popup+'"]').addClass('open');
		return false; 
	});

	$(".js-popup-close, .popup-wrap").on("click", function(){
		$(".js-popup-overlay").fadeOut(300); 
		$(".js-popup").removeClass('open');
		$('form').trigger('reset');		
		setTimeout(function(){
			$('html').removeClass('open-popup');
		}, 150);
		return false;
	});

	$(".popup").on("click", function(){
		return false;
	});


	//docs popup
	$('.fancybox').fancybox({
		padding: 0
	});

	//fake price
	if ($('.price-box').length){
		function fakePrice() {
			var priceBox = $('.price-box'),
				fakeBox = $('.fake-price'),
				scrollWindow = $(window).scrollTop();

			var priceBoxTop = priceBox.offset().top + priceBox.height();
			if(scrollWindow >= priceBoxTop) {
				fakeBox.addClass('fixed');
			}else {
				fakeBox.removeClass('fixed');
			}
		};
		fakePrice();
		$(window).scroll(function(){
			fakePrice();
		});
	}

	//map
	if ($('.map').length) {
		ymaps.ready(function () {
		var myMap = new ymaps.Map('YMapsID', {
			center: [53.925758,27.507495],
			zoom: 14,
			controls: []
		});
		myMap.behaviors.disable('scrollZoom');
		var zoomControl = new ymaps.control.ZoomControl({
			options: {
				size: "small"
			}
		});
		myMap.controls.add(zoomControl);
		myPlacemark1 = new ymaps.Placemark([53.925758,27.507495], {
			balloonContent: '',
			hintContent: ''
        },{
        	preset: 'islands#redDotIcon'
        });
        myMap.geoObjects.add(myPlacemark1)
		});
	};
	
	//accordion
	$( ".accordion" ).accordion({
		header: ".accordion-section",
		collapsible: true,
		active: true,
		heightStyle: "content",
		autoHeight: false,
		clearStyle: true
	});

	//validation
    var form_validate = $('.js-validate');
    if (form_validate.length) {
        form_validate.each(function () {
        	var form_this = $(this);
	        $.validate({
	            form : form_this,
	            borderColorOnError : '#fca9a5'
            });
        });
    };
    //autoresize textarea
    if($('.item-textarea').length){
    	var area = $('.js-resize');

    	area.autoResize({
    		extraSpace : 0,
    		animate: true
    	});
    };
});

