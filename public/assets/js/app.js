
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
			// url will be nested work/home
			.state('work.home', {
				url: '/home',
				templateUrl: 'views/pages/work-home.html'
			})

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
})();
