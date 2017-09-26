


((): void => {
    var app = angular.module("SarnarBugFilingApp", ['ui.router']);
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home/');
        $stateProvider

            //Home and Nested views

            .state('home', {
                url: '/home/',
                templateUrl: 'sarnarBugFilling/templates/home.html'
            });

    });
})();
