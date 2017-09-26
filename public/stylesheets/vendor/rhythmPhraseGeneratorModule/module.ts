((): void => {
    var app = angular.module("RSPhraseGenerator", ['ui.router', 'ngSanitize']);
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home/');
        $stateProvider

            //Home and Nested views

            .state('home', {
                url: '/home/',
                templateUrl: 'rhythmPhraseGeneratorModule/templates/home.html'
            });

    });
})();
