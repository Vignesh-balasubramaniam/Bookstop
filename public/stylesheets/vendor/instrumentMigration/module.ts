(():void=>{
    var app = angular.module("instrumentMigrationApp", ['ui.router']);
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home/');
        $stateProvider
            .state('home', {
                url: '/home/',
                templateUrl: 'instrumentMigration/templates/home.html'
            });

    });


})();

