module BookKartApp.services {
  export  class BookKartService {
      httpService: ng.IHttpService;
      static $inject = ["$http"];
      constructor($http: ng.IHttpService) {
          this.httpService = $http;
      }// constructor($http: ng.IHttpService)


      getListOfBooks(successCallback: Function, errorCallback: Function) {
          this.httpService.get("/listofbooks").success((data) => {
              successCallback(data);
          }).error((error) => {
              errorCallback(error);
          });
      }//getListOfTester


      addNewBookEntries(argBook,successCallback: Function, errorCallback: Function) {
          this.httpService.post("/addbook", argBook, { headers: { 'content-type': 'application/json' } }).success((data) => {
              successCallback(data);
          }).error((error) => {
              errorCallback(error);
          });
      }//getListOfTester

      getBookDetailsById(argBookId, successCallback: Function, errorCallback: Function) {
          this.httpService.get("/bookById?bookId=" + argBookId)
           .success((data) => {
              successCallback(data);
          }).error((error) => {
              errorCallback(error);
          });
      }//getBookDetailsById

      getBookAuthorsById(argBookId, successCallback: Function, errorCallback: Function) {
          this.httpService.get("/authorsByBooksId?bookId=" + argBookId)
              .success((data) => {
                  successCallback(data);
              }).error((error) => {
                  errorCallback(error);
              });
      }//getBookDetailsById

      addBookToCart(argBookId, successCallback: Function, errorCallback: Function) {
          this.httpService.get("/addtoCart?bookId=" + argBookId)
              .success((data) => {
                  successCallback(data);
              }).error((error) => {
                  errorCallback(error);
              });
      }//addBookToCart


      getCartDetails(successCallback: Function, errorCallback: Function) {
        this.httpService.get("/cartDetails")
            .success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
    }//addBookToCart


      addNewAuthor(argAuthorDetails, successCallback: Function, errorCallback: Function) {
          this.httpService.post("/addAuthor", argAuthorDetails, { headers: { 'content-type': 'application/json' } }).success((data) => {
              successCallback(data);
          }).error((error) => {
              errorCallback(error);
          });
      }//addNewAuthor

      getAuthorsList(successCallback: Function, errorCallback: Function) {
          this.httpService.get("/authorList")
              .success((data) => {
                  successCallback(data);
              }).error((error) => {
                  errorCallback(error);
              });
      }//getBookDetailsById


      deleteSelectedCartItem(argCartId,successCallback: Function, errorCallback: Function) {
          this.httpService.get("/deleteselectedCartItem?cartId="+argCartId)
              .success((data) => {
                  successCallback(data);
              }).error((error) => {
                  errorCallback(error);
              });
      }//


      placeAOrder(argOrderDetails, successCallback: Function, errorCallback: Function) {
          this.httpService.post("/placeOrder", argOrderDetails, { headers: { 'content-type': 'application/json' } })
              .success((data) => {
                  successCallback(data);
              }).error((error) => {
                  errorCallback(error);
              });
      }//placeAOrder

      getCustomerOrders(successCallback: Function, errorCallback: Function) {
          this.httpService.get("/customerOrders")
              .success((data) => {
                  successCallback(data);
              }).error((error) => {
                  errorCallback(error);
              });
      }//getCustomerOrders



      getOrderAddress(argAddressId, successCallback: Function, errorCallback: Function) {
          this.httpService.get("/customerAddressdetails?addressid="+argAddressId)
              .success((data) => {
                  successCallback(data);
              }).error((error) => {
                  errorCallback(error);
              });
      }//getOrderAddress


      getCustomerOrderItems(argOrderId, successCallback: Function, errorCallback: Function) {
          this.httpService.get("/customerOrderItems?orderId=" + argOrderId)
              .success((data) => {
                  successCallback(data);
              }).error((error) => {
                  errorCallback(error);
              });
      }//getCustomerOrderItems
    }
  angular.module('BookKartApp').service('BookKartApp.services.BookKartService', BookKartService);
}