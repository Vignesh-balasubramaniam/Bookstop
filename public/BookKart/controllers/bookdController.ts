module BookKartApp.conntrollers {
    class BookKartController {
        bookKartService: BookKartApp.services.BookKartService;
        listofBooks: any;
        bookdetails: any;
        authorList: any;
        authoresSelected: any;
        cartDetails: any;
        customerOrders: any;
        isloadingitems: boolean;
        sceService: ng.ISCEService;
        addBook: { isbn: string, name: string, publication: string, title: string, description: string, author: Array<any>, price: number };
        orderDetails: {
            items: Array<any>,
            address: { houseno: string, street: string, area: string, city: string, state: string, pino: number },
            modeofPayment: number,
            ordereddate: Date,
            deliveryDay: string,
            deliveryDate:Date,
            deliveryPhoneNumber: string,
            totalAmount:number
        };
        addAuthor: { firstname: string, lastname: string };

        static $inject = ['BookKartApp.services.BookKartService', "$stateParams", "$sce", "$scope", "$rootScope", "$state", '$window']
        constructor(argBookService: BookKartApp.services.BookKartService, protected _statePrams: any, $sce: ng.ISCEService, protected _scope: ng.IScope, protected _rootscope, protected _state: any, protected _window: ng.IWindowService) {
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

        currentDateInWords = () => {
            var monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            var d = new Date();
            d.setDate(d.getDate() + 6); 
            var month = monthNames[d.getMonth()];
            var day = dayNames[d.getDay()]; 
            var date=d.getDate();
            var n = d.getFullYear();
            var CurrentDay = '('+day +') '+date+' '+ ' ' + month + ' ' + n;
            return CurrentDay;
        }


        getListOfBooks = () => {
            this.bookKartService.getListOfBooks((success) => {
                this.listofBooks = success;
                this.addBook = { isbn: '', name: '', publication: '', title: '', description: '', author: [], price: 0 };
                this.isloadingitems = true;
            }, (error) => {
                console.log(error);
                this.isloadingitems = true;
                })
        }//getListOfBooks

        addNewBook = () => {
            this.bookKartService.addNewBookEntries(this.addBook, (success) => {
                this.getListOfBooks();
            }, (error) => {

                })
        }//addNewBook


        checkParams = () => {
            if (this._statePrams.bookId !== undefined) {
                this.bookKartService.getBookDetailsById(this._statePrams.bookId, (success) => {
                    this.bookdetails = success;
                    this.isloadingitems = false;
                    this.bookKartService.getBookAuthorsById(this._statePrams.bookId, (success) => {
                        this.bookdetails.authors = success;
                        this.isloadingitems = true;
                    }, (error) => {
                        this.isloadingitems = true;
                    })
                }, (error) => {
                    this.isloadingitems = true;
                })
            } if (this._statePrams.bookdetails !== undefined) {

                this.bookdetails.authors = [];
                this.isloadingitems = false;
                if (this._statePrams.bookdetails === '') {
                    this.orderDetails.items = this.cartDetails;
                    console.log(this.orderDetails);
                } else {
                    this.bookKartService.getBookDetailsById(this._statePrams.bookdetails, (success) => {
                        success.quantity = 1;
                        this.orderDetails.items.push(success);
                        this.isloadingitems = true;
                    }, (error) => {
                        this.isloadingitems = true;
                    })
                }
            }
            else {
                this.orderDetails.items = this.cartDetails;
                console.log(this.orderDetails);
            }
           
        }//checkParams

        enumerateAllAuthors = () => {
            this.bookKartService.getAuthorsList((success) => {
                this.authorList = success;
            }, (error) => {

            })
        }//enumerateAllAuthors


        addNewAuthor = () => {
           
            this.bookKartService.addNewAuthor(this.addAuthor, (success) => {
                this.bookdetails = success;
                this.enumerateAllAuthors();
            }, (error) => {

            })
        }//addNewAuthor

        addtoBookOrder = (argObject) => {
            
            var index = this.addBook.author.indexOf(argObject.id);
            if (this.addBook.author.indexOf(argObject.id) === -1) {
                this.authoresSelected.push(argObject);
                this.addBook.author.push(argObject.id);
                console.log(this.addBook);
            }
        }//addtoBookOrder

        removeFromAuthors = (argId) => {
            var index = this.addBook.author.indexOf(argId);
            this.addBook.author.splice(index, 1);
            this.authoresSelected.splice(index, 1);
        }


        addtocart = (argId) => {
            this.bookKartService.addBookToCart(argId, (success) => {
                console.log(success);
                this.bookKartService.getCartDetails((success) => {
                    console.log(success);
                    this._rootscope.cartCount = success.length;
                    this.isloadingitems = true;
                }, (error) => {

                    })
            }, (error) => {
                this.isloadingitems = true;
            });
        }//addtocart


        getCartDetails = () => {
            this.bookKartService.getCartDetails((success) => {
                this._rootscope.cartCount = success.length;
                var self = this;
                var numberoftimesforloopExecuted = 0;
                var uniqueBooks = [];
                for (let i = 0; i < success.length; i++) {
                    ++numberoftimesforloopExecuted;
                    (function (cntr1) {
                        self.bookKartService.getBookDetailsById(success[cntr1].bookid, (successResponse) => {
                            --numberoftimesforloopExecuted;
                            successResponse.quantity = 1;

                            if (uniqueBooks.indexOf(successResponse.id) === -1) {
                                uniqueBooks.push(successResponse.id)
                                successResponse.cartId = success[cntr1].id;
                                self.cartDetails.push(successResponse);
                                console.log(self.cartDetails);
                            }
                            else {
                                var index = uniqueBooks.indexOf(successResponse.id);
                                self.cartDetails[index].quantity += 1;
                            }
                        }, (error) => {
                            --numberoftimesforloopExecuted;
                        });
                    })(i);
                    this.isloadingitems = true;
                }
            }, (error) => {
                this.isloadingitems = true;
            })
        }//getCartDetails


        deleteItemFromCart = (argCartId) => {
            console.log(argCartId);
            this.bookKartService.deleteSelectedCartItem(argCartId, (success) => {
            
                this._rootscope.cartCount = success.length;
                this.cartDetails = [];
                var uniqueBooks = [];
                    if (success.length !== 0)
                     {
                        var self = this;
                        var numberoftimesforloopExecuted = 0;

                        for (let i = 0; i < success.length; i++) {
                            ++numberoftimesforloopExecuted;
                            (function (cntr1) {
                                self.bookKartService.getBookDetailsById(success[cntr1].bookid, (successResponse) => {
                                    --numberoftimesforloopExecuted;
                                    successResponse.quantity = 1;

                                    if (uniqueBooks.indexOf(successResponse.id) === -1) {
                                        uniqueBooks.push(successResponse.id)
                                        successResponse.cartId = success[cntr1].id;
                                        self.cartDetails.push(successResponse);
                                        console.log(self.cartDetails);
                                    }
                                    else {
                                        var index = uniqueBooks.indexOf(successResponse.id);
                                        self.cartDetails[index].quantity += 1;
                                    }
                                }, (error) => {
                                    --numberoftimesforloopExecuted;
                                });
                            })(i);
                        }
                    }
                    }, (error) => {

                    })
        }//deleteItemFromCart


        placeOrder = () => {
            this.calculateTotalAmount();
            this.bookKartService.placeAOrder(this.orderDetails, (success) => {

            }, (error) => {

            })
        }//placeOrder


        calculateTotalAmount = () => {
            this.orderDetails.totalAmount = 0;
            for (let i = 0; i < this.orderDetails.items.length; i++) {
                this.orderDetails.totalAmount += this.orderDetails.items[i].price * this.orderDetails.items[i].quantity;
            }

        }//calculateTotalAmount


        getCustomerOrders = () => {
            this.bookKartService.getCustomerOrders((success) => {
                this.customerOrders = success;
                this.bookKartService.getOrderAddress(success[0].deliveryaddressid, (adressSuccessResponse) => {
                    this.customerOrders[0].address = adressSuccessResponse;
                    console.log(this.customerOrders);
                    this.bookKartService.getCustomerOrderItems(success[0].id, (itemsSuccess) => {
                        this.customerOrders[0].items = itemsSuccess;
                    }, (error) => { })
                }, (error) => {

                    })
            }, (error) => { })
        }//getCustomerOrders
    }
    angular.module('BookKartApp').controller('BookKartApp.conntrollers.BookKartController', BookKartController);
}