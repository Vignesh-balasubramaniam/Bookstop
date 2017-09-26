((): void => {
    var app = angular.module("rhythmBlendTestingApp", ['ui.router']);
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home/');
        $stateProvider

            //Home and Nested views

            .state('home', {
                url: '/home/',
                templateUrl: 'rhythmBlendJsonGeneratorModule/templates/home.html'
            });

    });
})();
