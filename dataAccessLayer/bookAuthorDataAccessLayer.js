"use strict";
var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
var response = require('../dataAccessLayer/dataAccessLayerResponse');
var bookAuthorDTO = require('./DTO/bookAuthorDTO');
var sequelize = models.sequelize;
function addToBookAuthor(argBookAuthorDetails, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.bookauthor.create({
                id: uuid.v1(),
                bookId: argBookAuthorDetails.bookId,
                authorId: argBookAuthorDetails.authorId
            }).then(function (addedBookAuthorDetails) {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(addedBookAuthorDetails.id);
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
exports.addToBookAuthor = addToBookAuthor; //addToCart
function getBooksAuthors(argBookId, successcallback, errorcallback) {
    models.bookauthor.findAll({
        where: { bookId: argBookId }
    }).then(function (bookAuthors) {
        try {
            var authorsOfBook = new Array();
            var listOfAuthors = [];
            for (var i in bookAuthors) {
                authorsOfBook.push(new bookAuthorDTO.BookAuthorsDTO(bookAuthors[i].id, bookAuthors[i].bookId, bookAuthors[i].authorId));
                models.author.findOne({
                    where: { id: bookAuthors[i].authorId }
                }).then(function (authorDetails) {
                    // Transaction has been committed
                    // result is whatever the result of the promise chain returned to the transaction callback is
                    try {
                        if (authorDetails) {
                            listOfAuthors.push(authorDetails.firstname + authorDetails.lastname);
                        }
                        else {
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
            setTimeout(function () {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(listOfAuthors);
                successcallback(dalResponse);
            }, 3000);
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
exports.getBooksAuthors = getBooksAuthors; //getBooksAuthors
function getAuthorsBooks(argAuthorId, successcallback, errorcallback) {
    models.cart.findAll({
        where: { authorId: argAuthorId }
    }).then(function (authorsBooks) {
        try {
            var booksByAuthor = new Array();
            for (var i in authorsBooks) {
                booksByAuthor.push(new bookAuthorDTO.BookAuthorsDTO(authorsBooks[i].id, authorsBooks[i].bookId, authorsBooks[i].authorId));
            }
            var dalResponse = new response.DataAccessLayerResponse();
            dalResponse.SetSuccessResult(booksByAuthor);
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
exports.getAuthorsBooks = getAuthorsBooks; //getCustomersCartDetails
//# sourceMappingURL=bookAuthorDataAccessLayer.js.map