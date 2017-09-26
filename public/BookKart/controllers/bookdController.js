var BookKartApp;
(function (BookKartApp) {
    var conntrollers;
    (function (conntrollers) {
        var BookKartController = (function () {
            function BookKartController(argBookService, _statePrams, $sce, _scope, _rootscope, _state, _window) {
                var _this = this;
                this._statePrams = _statePrams;
                this._scope = _scope;
                this._rootscope = _rootscope;
                this._state = _state;
                this._window = _window;
                this.currentDateInWords = function () {
                    var monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    var d = new Date();
                    d.setDate(d.getDate() + 6);
                    var month = monthNames[d.getMonth()];
                    var day = dayNames[d.getDay()];
                    var date = d.getDate();
                    var n = d.getFullYear();
                    var CurrentDay = '(' + day + ') ' + date + ' ' + ' ' + month + ' ' + n;
                    return CurrentDay;
                };
                this.getListOfBooks = function () {
                    _this.bookKartService.getListOfBooks(function (success) {
                        _this.listofBooks = success;
                        _this.addBook = { isbn: '', name: '', publication: '', title: '', description: '', author: [], price: 0 };
                        _this.isloadingitems = true;
                    }, function (error) {
                        console.log(error);
                        _this.isloadingitems = true;
                    });
                }; //getListOfBooks
                this.addNewBook = function () {
                    _this.bookKartService.addNewBookEntries(_this.addBook, function (success) {
                        _this.getListOfBooks();
                    }, function (error) {
                    });
                }; //addNewBook
                this.checkParams = function () {
                    if (_this._statePrams.bookId !== undefined) {
                        _this.bookKartService.getBookDetailsById(_this._statePrams.bookId, function (success) {
                            _this.bookdetails = success;
                            _this.isloadingitems = false;
                            _this.bookKartService.getBookAuthorsById(_this._statePrams.bookId, function (success) {
                                _this.bookdetails.authors = success;
                                _this.isloadingitems = true;
                            }, function (error) {
                                _this.isloadingitems = true;
                            });
                        }, function (error) {
                            _this.isloadingitems = true;
                        });
                    }
                    if (_this._statePrams.bookdetails !== undefined) {
                        _this.bookdetails.authors = [];
                        _this.isloadingitems = false;
                        if (_this._statePrams.bookdetails === '') {
                            _this.orderDetails.items = _this.cartDetails;
                            console.log(_this.orderDetails);
                        }
                        else {
                            _this.bookKartService.getBookDetailsById(_this._statePrams.bookdetails, function (success) {
                                success.quantity = 1;
                                _this.orderDetails.items.push(success);
                                _this.isloadingitems = true;
                            }, function (error) {
                                _this.isloadingitems = true;
                            });
                        }
                    }
                    else {
                        _this.orderDetails.items = _this.cartDetails;
                        console.log(_this.orderDetails);
                    }
                }; //checkParams
                this.enumerateAllAuthors = function () {
                    _this.bookKartService.getAuthorsList(function (success) {
                        _this.authorList = success;
                    }, function (error) {
                    });
                }; //enumerateAllAuthors
                this.addNewAuthor = function () {
                    _this.bookKartService.addNewAuthor(_this.addAuthor, function (success) {
                        _this.bookdetails = success;
                        _this.enumerateAllAuthors();
                    }, function (error) {
                    });
                }; //addNewAuthor
                this.addtoBookOrder = function (argObject) {
                    var index = _this.addBook.author.indexOf(argObject.id);
                    if (_this.addBook.author.indexOf(argObject.id) === -1) {
                        _this.authoresSelected.push(argObject);
                        _this.addBook.author.push(argObject.id);
                        console.log(_this.addBook);
                    }
                }; //addtoBookOrder
                this.removeFromAuthors = function (argId) {
                    var index = _this.addBook.author.indexOf(argId);
                    _this.addBook.author.splice(index, 1);
                    _this.authoresSelected.splice(index, 1);
                };
                this.addtocart = function (argId) {
                    _this.bookKartService.addBookToCart(argId, function (success) {
                        console.log(success);
                        _this.bookKartService.getCartDetails(function (success) {
                            console.log(success);
                            _this._rootscope.cartCount = success.length;
                            _this.isloadingitems = true;
                        }, function (error) {
                        });
                    }, function (error) {
                        _this.isloadingitems = true;
                    });
                }; //addtocart
                this.getCartDetails = function () {
                    _this.bookKartService.getCartDetails(function (success) {
                        _this._rootscope.cartCount = success.length;
                        var self = _this;
                        var numberoftimesforloopExecuted = 0;
                        var uniqueBooks = [];
                        for (var i = 0; i < success.length; i++) {
                            ++numberoftimesforloopExecuted;
                            (function (cntr1) {
                                self.bookKartService.getBookDetailsById(success[cntr1].bookid, function (successResponse) {
                                    --numberoftimesforloopExecuted;
                                    successResponse.quantity = 1;
                                    if (uniqueBooks.indexOf(successResponse.id) === -1) {
                                        uniqueBooks.push(successResponse.id);
                                        successResponse.cartId = success[cntr1].id;
                                        self.cartDetails.push(successResponse);
                                        console.log(self.cartDetails);
                                    }
                                    else {
                                        var index = uniqueBooks.indexOf(successResponse.id);
                                        self.cartDetails[index].quantity += 1;
                                    }
                                }, function (error) {
                                    --numberoftimesforloopExecuted;
                                });
                            })(i);
                            _this.isloadingitems = true;
                        }
                    }, function (error) {
                        _this.isloadingitems = true;
                    });
                }; //getCartDetails
                this.deleteItemFromCart = function (argCartId) {
                    console.log(argCartId);
                    _this.bookKartService.deleteSelectedCartItem(argCartId, function (success) {
                        _this._rootscope.cartCount = success.length;
                        _this.cartDetails = [];
                        var uniqueBooks = [];
                        if (success.length !== 0) {
                            var self = _this;
                            var numberoftimesforloopExecuted = 0;
                            for (var i = 0; i < success.length; i++) {
                                ++numberoftimesforloopExecuted;
                                (function (cntr1) {
                                    self.bookKartService.getBookDetailsById(success[cntr1].bookid, function (successResponse) {
                                        --numberoftimesforloopExecuted;
                                        successResponse.quantity = 1;
                                        if (uniqueBooks.indexOf(successResponse.id) === -1) {
                                            uniqueBooks.push(successResponse.id);
                                            successResponse.cartId = success[cntr1].id;
                                            self.cartDetails.push(successResponse);
                                            console.log(self.cartDetails);
                                        }
                                        else {
                                            var index = uniqueBooks.indexOf(successResponse.id);
                                            self.cartDetails[index].quantity += 1;
                                        }
                                    }, function (error) {
                                        --numberoftimesforloopExecuted;
                                    });
                                })(i);
                            }
                        }
                    }, function (error) {
                    });
                }; //deleteItemFromCart
                this.placeOrder = function () {
                    _this.calculateTotalAmount();
                    _this.bookKartService.placeAOrder(_this.orderDetails, function (success) {
                    }, function (error) {
                    });
                }; //placeOrder
                this.calculateTotalAmount = function () {
                    _this.orderDetails.totalAmount = 0;
                    for (var i = 0; i < _this.orderDetails.items.length; i++) {
                        _this.orderDetails.totalAmount += _this.orderDetails.items[i].price * _this.orderDetails.items[i].quantity;
                    }
                }; //calculateTotalAmount
                this.getCustomerOrders = function () {
                    _this.bookKartService.getCustomerOrders(function (success) {
                        _this.customerOrders = success;
                        _this.bookKartService.getOrderAddress(success[0].deliveryaddressid, function (adressSuccessResponse) {
                            _this.customerOrders[0].address = adressSuccessResponse;
                            console.log(_this.customerOrders);
                            _this.bookKartService.getCustomerOrderItems(success[0].id, function (itemsSuccess) {
                                _this.customerOrders[0].items = itemsSuccess;
                            }, function (error) { });
                        }, function (error) {
                        });
                    }, function (error) { });
                }; //getCustomerOrders
                this.sceService = $sce;
                this.bookKartService = argBookService;
                this.addBook = { isbn: '', name: '', publication: '', title: '', description: '', author: [], price: 0 };
                this.addAuthor = { firstname: '', lastname: '' };
                var deliveryDay = this.currentDateInWords();
                var deliveryDate = new Date();
                deliveryDate.setDate(deliveryDate.getDate() + 6);
                this.orderDetails = {
                    items: [],
                    address: { houseno: '', street: '', area: '', city: '', state: '', pino: 560085 },
                    modeofPayment: 0,
                    ordereddate: new Date(),
                    deliveryDay: deliveryDay,
                    deliveryDate: deliveryDate,
                    deliveryPhoneNumber: "",
                    totalAmount: 0,
                };
                this.listofBooks = [];
                this.bookdetails = [];
                this.authorList = [];
                this.authoresSelected = [];
                this.cartDetails = [];
                this.customerOrders = [];
                this.isloadingitems = false;
                this.getListOfBooks();
                this.getCartDetails();
                this.enumerateAllAuthors();
                this.checkParams();
                this.getCustomerOrders();
            }
            BookKartController.$inject = ['BookKartApp.services.BookKartService', "$stateParams", "$sce", "$scope", "$rootScope", "$state", '$window'];
            return BookKartController;
        }());
        angular.module('BookKartApp').controller('BookKartApp.conntrollers.BookKartController', BookKartController);
    })(conntrollers = BookKartApp.conntrollers || (BookKartApp.conntrollers = {}));
})(BookKartApp || (BookKartApp = {}));
//# sourceMappingURL=bookdController.js.map