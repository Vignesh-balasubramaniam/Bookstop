"use strict";
var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
var response = require('../dataAccessLayer/dataAccessLayerResponse');
var DTO = require('./DTO/BooksDTO');
var sequelize = models.sequelize;
function addNewBookEntry(argNewBook, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.books.create({
                id: uuid.v1(),
                isbn: argNewBook.isbn,
                name: argNewBook.name,
                publication: argNewBook.publication,
                subject: argNewBook.subject,
                description: argNewBook.description,
                authors: argNewBook.authors,
                price: argNewBook.price
            }).then(function (addedBook) {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(addedBook.id);
                successcallback(dalResponse);
            }).catch(function (err) {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.AddErrorDescription(-1, err);
                successcallback(err);
            });
        });
    }
    catch (exception) {
        var dalrespose = new response.DataAccessLayerResponse();
        dalrespose.AddErrorDescription(-1, exception);
        errorcallback(dalrespose);
    }
}
exports.addNewBookEntry = addNewBookEntry;
function getListOfBooks(successcallback, errorcallback) {
    models.books.findAll().then(function (booksList) {
        try {
            var listOfBooks = new Array();
            for (var i in booksList) {
                listOfBooks.push(new DTO.BooksDTO(booksList[i].id, booksList[i].isbnnumber, booksList[i].name, booksList[i].publication, booksList[i].subject, booksList[i].description, booksList[i].authors, booksList[i].price));
            }
            var dalResponse = new response.DataAccessLayerResponse();
            dalResponse.SetSuccessResult(listOfBooks);
            successcallback(dalResponse);
        }
        catch (exception) {
            var dalResponseEx = new response.DataAccessLayerResponse();
            dalResponseEx.AddErrorDescription(-1, exception);
            errorcallback(dalResponseEx);
        }
    }, function (error) {
        var dalResponse = new response.DataAccessLayerResponse();
        dalResponse.AddErrorDescription(-1, error);
        errorcallback(dalResponse);
    });
}
exports.getListOfBooks = getListOfBooks;
function getBooDetailsByid(argBookId, successcallback, errorcallback) {
    models.books.findOne({
        where: { id: argBookId }
    }).then(function (bookDetailsById) {
        try {
            if (bookDetailsById) {
                var customerDetailsList = new DTO.BooksDTO(bookDetailsById.id, bookDetailsById.isbn, bookDetailsById.name, bookDetailsById.publication, bookDetailsById.subject, bookDetailsById.description, bookDetailsById.authors, bookDetailsById.price);
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(customerDetailsList);
                successcallback(dalResponse);
            }
            else {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(bookDetailsById);
                successcallback(dalResponse);
            }
        }
        catch (exception) {
            var dalResponseEx = new response.DataAccessLayerResponse();
            dalResponseEx.AddErrorDescription(-1, exception);
            errorcallback(dalResponseEx);
        }
    }, function (error) {
        var dalResponse = new response.DataAccessLayerResponse();
        dalResponse.AddErrorDescription(-1, error);
        errorcallback(dalResponse);
    });
}
exports.getBooDetailsByid = getBooDetailsByid;
//# sourceMappingURL=booksDataAdaptor.js.map