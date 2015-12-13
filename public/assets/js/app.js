
(function(){
	var fadareakApp = angular.module('fadareakApp', ['ui.router', 'chocolat']);

	fadareakApp.controller('chocolatCtrl', ['$scope', function($scope) {
		
		$scope.configInScope = { loop: true, imageSize: 'cover' }

		$scope.configOnScope = { loop: true, imageSize: 'contain' }

		$scope.instance = {};

		$scope.open = function() {
	        console.log('open start');
	        var def = $scope.instance.api().open();
	        def.done(function() {
	            console.log('open done');
	        });
	    };

	    $scope.close = function() {
	        console.log('close start');
	        var def = $scope.instance.api().close();

	        def.done(function(){
	            console.log('close done');
	        });
	    };


	    $scope.prev = function() {
	        console.log('prev start');
	        var def = $scope.instance.api().prev();

	        def.done(function() {
	            console.log('prev done');
	        });
	    };

	    $scope.next = function() {
	        console.log('next start');
	        var def = $scope.instance.api().next();

	        def.done(function() {
	            console.log('next done');
	        });
	    };

	    $scope.cover = function() {
	        console.log('cover mode start');
	        $scope.instance.api().set('imageSize', 'cover');
	        var def = $scope.instance.api().place();

	        def.done(function() {
	            console.log('cover mode done');
	        })
	    };

	    $scope.contain = function() {
	        console.log('contain mode start');
	        $scope.instance.api().set('imageSize', 'contain');
	        var def = $scope.instance.api().place();

	        def.done(function() {
	            console.log('contain mode done');
	        })
	    };
	}]);

	fadareakApp.config(function($stateProvider, $urlRouterProvider) {
		
		$urlRouterProvider.otherwise('/home');

		$stateProvider

			.state('/', {
				url: '/home',
				templateUrl: 'views/pages/home.html'
			})

			.state('about', {
				url: '/about',
				templateUrl: 'views/pages/about.html'
			})

			.state('contact', {
				url: '/contact',
				templateUrl: 'views/pages/contact.html'
			})

			.state('work', {
				url: '/work',
				templateUrl: 'views/pages/work.html'
			})

			// nested states
			//each of these section will have their own views

			.state('work.art', {
				url: '/art',
				templateUrl: 'views/pages/work-art.html'
			})

			.state('work.concert', {
				url: '/concert',
				templateUrl: 'views/pages/work-concerts.html'
			})

			.state('work.event', {
				url: '/event',
				templateUrl: 'views/pages/work-events.html'
			})

			.state('work.potraitart', {
				url: '/potraitart',
				templateUrl: 'views/pages/work-potraitart.html'
			});
	});

	fadareakApp.controller('carouselController', function($scope) {
		$scope.images = [
			{
				src: "/assets/img/sliders/11.png"
			},
			{
				src: "/assets/img/sliders/2.jpg"
			},
			{
				src: "/assets/img/sliders/33.png"
			},
			{
				src: "/assets/img/sliders/44.png"
			},
			{
				src: "/assets/img/sliders/55.png"
			},
			{
				src: "/assets/img/sliders/6.png"
			}
		]
	});
})();

/*Masonry JS*/
(function(){
	var $container = $('#container');
	$container.imagesLoaded(function(){
	  $container.masonry({
	    itemSelector : '.item',
	    columnWidth : 370
	  });
});
})();

/*Full page CSS menu JS*/
(function() {
	var triggerBttn = document.getElementById( 'trigger-overlay' ),
		overlay = document.querySelector( 'div.overlay' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' );
	transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'oTransitionEnd',
		'msTransition': 'MSTransitionEnd',
		'transition': 'transitionend'
	},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );
})();

$(function() {

	// Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
			.done(function(response) {
				// Make sure that the formMessages div has the 'success' class.
				$(formMessages).removeClass('error');
				$(formMessages).addClass('success');

				// Set the message text.
				$(formMessages).text(response);

				// Clear the form.
				$('#name').val('');
				$('#email').val('');
				$('#message').val('');
			})
			.fail(function(data) {
				// Make sure that the formMessages div has the 'error' class.
				$(formMessages).removeClass('success');
				$(formMessages).addClass('error');

				// Set the message text.
				if (data.responseText !== '') {
					$(formMessages).text(data.responseText);
				} else {
					$(formMessages).text('Oops! An error occured and your message could not be sent.');
				}
			});

	});

});
