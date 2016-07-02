;(function(angular) {

    'use strict';

    // Options for Phonon
    phonon.options({
        navigator: {
            defaultPage: 'home',
            hashPrefix: '/!', // important! Use AngularJS's URL manipulation
            animatePages: true,
            enableBrowserBackButton: true,
            templateRootDirectory: './tpl'
        },
        i18n: null // for this example, we do not use internationalization
    });

    var myApp = angular.module('myApp', []);  

    /**
     * Home's Controller
    */
	myApp.controller('HomeCtrl', ['$scope', function HomeCtrl($scope) {

        $scope.pageName = 'SHIVAM ITCS';
        $scope.pizzas = [
        	{name: 'Mobile Development', url: '#/!pagetwo/mobile'},
        	{name: 'Web Development', url: '#/!pagetwo/calzone'},
        	{ name: 'Asp.net MVC', url: '#/!pagetwo/pesto' },
        	{name: 'Cloud Computing', url: '#/!pagetwo/roma'}
        	
        ];

        $scope.pages = [
            { name: 'Home', url: '#/!home' },
        	{ name: 'About Us', url: '#/!aboutus' },
        	{ name: 'Demo', url: '#/!demo' },
        	{ name: 'Services', url: '#/!services' },
        	{ name: 'Contact', url: '#/!contact' }
        	 
        ];
        
        $scope.captureImage = function (event) {
            phonon.alert('I am in', 'Camera');
            event.preventDefault();
            if (!navigator.camera) {
                
                phonon.alert('Camera API not supported', 'Error');
                return;
            }
          
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: 1,      // 0:Photo Library, 1=Camera, 2=Saved Album
                encodingType: 0     // 0=JPG 1=PNG
            };

            navigator.camera.getPicture(
                function (imgData) {
                    $('#capturedImage', this.$el).attr('src', "data:image/jpeg;base64," + imgData);
                    $('#capturedImage').style("display", "block");
                },
                function () {
                    
                    phonon.alert('Error taking picture', 'Error');
                },
                options);

            return false;
        };

        /**
         * The activity scope is not mandatory.
         * For the home page, we do not need to perform actions during
         * page events such as onCreate, onReady, etc
        */
        phonon.navigator().on({ page: 'home', preventClose: false, content: null }, function (activity) {


        });

	}]);

    /**
     * PageTwo's Controller
    */
	myApp.controller('PageTwoCtrl', ['$scope', function PageTwoCtrl($scope) {   

        $scope.pageName = 'Page Two';

        /**
         * However, on the second page, we want to define the activity scope.
         * [1] On the create callback, we add tap events on buttons. The OnCreate callback is called once.
         * [2] If the user does not tap on buttons, we cancel the page transition. preventClose => true
         * [3] The OnReady callback is called every time the user comes on this page,
         * here we did not implement it, but if you do, you can use readyDelay to add a small delay
         * between the OnCreate and the OnReady callbacks
        */
		phonon.navigator().on({page: 'pagetwo', preventClose: true, content: null, readyDelay: 1}, function(activity) {

		    var action = null;

		    var onAction = function(evt) {
		        var target = evt.target;
		        action = 'ok';
		        
		        if(target.getAttribute('data-order') === 'order') {
		            phonon.alert('Thank you for your order!', 'Dear customer');

		        } else {
		            phonon.alert('Your order has been canceled.', 'Dear customer');
		        }
		    };

		    activity.onCreate(function() {
		        document.querySelector('.order').on('tap', onAction);
		        document.querySelector('.cancel').on('tap', onAction);
		    });

		    activity.onClose(function(self) {
		        if(action !== null) {
		            self.close();
		        } else {
		            phonon.alert('Before leaving this page, you must perform an action.', 'Action required');
		        }
		    });

		    activity.onHidden(function() {
		        action = null;
		    });

		    activity.onHashChanged(function(pizza) {
		        document.querySelector('.pizza').textContent = pizza;
		    });
		});

	}]);

	/**
	 * Starts the app when AngularJS has finished to load/compile page templates
	 */
    myApp.directive('ngReady', [function() {
        return {
            priority: Number.MIN_SAFE_INTEGER, // execute last, after all other directives if any.
            restrict: 'A',
            link: function() {
				phonon.navigator().start();	
            }
        };
    }]);

})(window.angular);