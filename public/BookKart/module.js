(function () {
    var app = angular.module("BookKartApp", ['ui.router']);
    app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                abstract: true,
                url: '/home',
                templateUrl: '/BookKart/templates/landingPage.html'
            })
                .state('home.home', {
                url: "/",
                views: {
                    "home_bookstop_home": {
                        templateUrl: "/BookKart/templates/books.html"
                    }
                }
            })
                .state('home.books', {
                url: "/addbooks",
                views: {
                    "home_bookstop_addBook": {
                        templateUrl: "/BookKart/templates/home.html"
                    }
                }
            })
                .state('home.orders', {
                url: "/orders/:bookdetails",
                views: {
                    "home_bookstop_orders": {
                        templateUrl: "/BookKart/templates/order.html"
                    }
                }
            })
                .state('home.customers', {
                url: "/customer",
                views: {
                    "home_bookstop_customer": {
                        templateUrl: "/BookKart/templates/customer.html"
                    }
                }
            })
                .state('home.cart', {
                url: "/cart",
                views: {
                    "home_bookstop_cart": {
                        templateUrl: "/BookKart/templates/cart.html"
                    }
                }
            })
                .state('home.bookdetail', {
                url: "/bookDetail/:bookId",
                views: {
                    "home_bookstop_bookDetail": {
                        templateUrl: "/BookKart/templates/bookDetails.html"
                    }
                }
            })
                .state('home.customerOrders', {
                url: "/customerOrders",
                views: {
                    "home_bookstop_customerOrders": {
                        templateUrl: "/BookKart/templates/customerOrders.html"
                    }
                }
            });
            $urlRouterProvider.otherwise('/home/');
        }]);
})();
//# sourceMappingURL=module.js.map