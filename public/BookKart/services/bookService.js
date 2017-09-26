var BookKartApp;
(function (BookKartApp) {
    var services;
    (function (services) {
        var BookKartService = (function () {
            function BookKartService($http) {
                this.httpService = $http;
            } // constructor($http: ng.IHttpService)
            BookKartService.prototype.getListOfBooks = function (successCallback, errorCallback) {
                this.httpService.get("/listofbooks").success(function (data) {
                    successCallback(data);
                }).error(function (error) {
                    errorCallback(error);
                });
            }; //getListOfTester
            BookKartService.prototype.addNewBookEntries = function (argBook, successCallback, errorCallback) {
                this.httpService.post("/addbook", argBook, { headers: { 'content-type': 'application/json' } }).success(function (data) {
                    successCallback(data);
                }).error(function (error) {
                    errorCallback(error);
                });
            }; //getListOfTester
            BookKartService.prototype.getBookDetailsById = function (argBookId, successCallback, errorCallback) {
                this.httpService.get("/bookById?bookId=" + argBookId)
                    .success(function (data) {
                    successCallback(data);
                }).error(function (error) {
                    errorCallback(error);
                });
            }; //getBookDetailsById
            BookKartService.prototype.getBookAuthorsById = function (argBookId, successCallback, errorCallback) {
                this.httpService.get("/authorsByBooksId?bookId=" + argBookId)
                    .success(function (data) {
                    successCallback(data);
                }).error(function (error) {
                    errorCallback(error);
                });
            }; //getBookDetailsById
            BookKartService.prototype.addBookToCart = function (argBookId, successCallback, errorCallback) {
                this.httpService.get("/addtoCart?bookId=" + argBookId)
                    .success(function (data) {
                    successCallback(data);
                }).error(function (error) {
                    errorCallback(error);
                });
            }; //addBookToCart
            BookKartService.prototype.getCartDetails = function (successCallback, errorCallback) {
                this.httpService.get("/cartDetails")
                    .success(function (data) {
                    successCallback(data);
                }).error(function (error) {
                    errorCallback(error);
                });
            }; //addBookToCart
            BookKartService.prototype.addNewAuthor = function (argAuthorDetails, successCallback, errorCallback) {
                this.httpService.post("/addAuthor", argAuthorDetails, { headers: { 'content-type': 'application/json' } }).success(function (data) {
                    successCallback(data);
                }).error(function (error) {
                    errorCallback(error);
                });
            }; //addNewAuthor
            BookKartService.prototype.getAuthorsList = function (successCallback, errorCallback) {
                this.httpService.get("/authorList")
                    .success(function (data) {
                    successCallback(data);
                }).error(function (error) {
                    errorCallback(error);
                });
            }; //getBookDetailsById
            BookKartService.prototype.deleteSelectedCartItem = function (argCartId, successCallback, errorCallback) {
                this.httpService.get("/deleteselectedCartItem?cartId=" + argCartId)
                    .success(function (data) {
                    successCallback(data);
                }).error(function (error) {
                    errorCallback(error);
                });
            }; //
            BookKartService.prototype.placeAOrder = function (argOrderDetails, successCallback, errorCallback) {
                this.httpService.post("/placeOrder", argOrderDetails, { headers: { 'content-type': 'application/json' } })
                    .success(function (data) {
                    successCallback(data);
                }).error(function (error) {
                    errorCallback(error);
                });
            }; //placeAOrder
            BookKartService.prototype.getCustomerOrders = function (successCallback, errorCallback) {
                this.httpService.get("/customerOrders")
                    .success(function (data) {
                    successCallback(data);
                }).error(function (error) {
                    errorCallback(error);
                });
            }; //getCustomerOrders
            BookKartService.prototype.getOrderAddress = function (argAddressId, successCallback, errorCallback) {
                this.httpService.get("/customerAddressdetails?addressid=" + argAddressId)
                    .success(function (data) {
                    successCallback(data);
                }).error(function (error) {
                    errorCallback(error);
                });
            }; //getOrderAddress
            BookKartService.prototype.getCustomerOrderItems = function (argOrderId, successCallback, errorCallback) {
                this.httpService.get("/customerOrderItems?orderId=" + argOrderId)
                    .success(function (data) {
                    successCallback(data);
                }).error(function (error) {
                    errorCallback(error);
                });
            }; //getCustomerOrderItems
            BookKartService.$inject = ["$http"];
            return BookKartService;
        }());
        services.BookKartService = BookKartService;
        angular.module('BookKartApp').service('BookKartApp.services.BookKartService', BookKartService);
    })(services = BookKartApp.services || (BookKartApp.services = {}));
})(BookKartApp || (BookKartApp = {}));
//# sourceMappingURL=bookService.js.map