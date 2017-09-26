"use strict";
var booksDataAdaptor = require('../dataAccessLayer/booksDataAdaptor');
var authorDataAdaptor = require('../dataAccessLayer/authorDataAccessLayer');
var BookauthorDataAdaptor = require('../dataAccessLayer/bookAuthorDataAccessLayer');
var bookDTO = require('../dataAccessLayer/DTO/BooksDTO');
var authorDTO = require('../dataAccessLayer/DTO/authorDTO');
var bookAuthorDTO = require('../dataAccessLayer/DTO/bookAuthorDTO');
var authorsDetails = (function () {
    function authorsDetails(argId, argname, argbooks) {
        this.id = argId;
        this.name = argname;
        this.books = argbooks;
    }
    return authorsDetails;
}());
exports.authorsDetails = authorsDetails; //authorsDetails
var bookDetails = (function () {
    function bookDetails(argId, argisbnnumber, argName, argPublication, argSubject, argDescription, argAuthors, argPrice) {
        this.id = argId;
        this.isbn = argisbnnumber;
        this.name = argName;
        this.publication = argPublication;
        this.subject = argSubject;
        this.description = argDescription;
        this.authors = argAuthors;
        this.price = argPrice;
    }
    return bookDetails;
}());
exports.bookDetails = bookDetails;
function getListOfBooks(req, res) {
    booksDataAdaptor.getListOfBooks(function (adapterSuccessResponse) {
        if (adapterSuccessResponse.IsSuccess() === true) {
            res.send(adapterSuccessResponse.Value);
        }
    }, function (error) {
        res.writeHead(500);
        res.write("unable to get List of Books");
        res.end(error);
    });
}
exports.getListOfBooks = getListOfBooks; //getListOfBooks
function getBooksDeatilsById(req, res) {
    var argBookId = req.query.bookId;
    var bookdetails;
    booksDataAdaptor.getBooDetailsByid(argBookId, function (adapterSuccessResponse) {
        if (adapterSuccessResponse.IsSuccess() === true) {
            res.send(adapterSuccessResponse.Value);
        }
    }, function (error) {
        res.writeHead(500);
        res.write("unable to get List of Books");
        res.end(error);
    });
}
exports.getBooksDeatilsById = getBooksDeatilsById; //getBooksDeatilsById
function getAuthorsOfbook(req, res) {
    var argBookId = req.query.bookId;
    BookauthorDataAdaptor.getBooksAuthors(argBookId, function (bookAuthorSuccessResponse) {
        console.log(bookAuthorSuccessResponse);
        res.send(bookAuthorSuccessResponse.Value);
    }, function (error) {
        res.writeHead(500);
        res.write("unable to get List of Books");
        res.end(error);
    });
}
exports.getAuthorsOfbook = getAuthorsOfbook;
function addnewBook(req, res) {
    var newBook = req.body;
    var newBookDetails = new bookDTO.BooksDTO(" ", newBook.isbn, newBook.name, newBook.publication, newBook.title, newBook.description, newBook.author, newBook.price);
    console.log(newBookDetails);
    booksDataAdaptor.addNewBookEntry(newBookDetails, function (adapterSuccessResponseForAddingNewBook) {
        if (adapterSuccessResponseForAddingNewBook.IsSuccess() === true) {
            for (var i = 0; i < newBook.author.length; i++) {
                var newBookAuthorDetails = new bookAuthorDTO.BookAuthorsDTO('', adapterSuccessResponseForAddingNewBook.Value, newBook.author[i]);
                BookauthorDataAdaptor.addToBookAuthor(newBookAuthorDetails, function (adapterSuccessResponseForAddingNewBook) {
                }, function (adapterErrorResponse) {
                    console.log("Error white subbmiting new book Details in th database" + adapterErrorResponse.ErrorSummary());
                    res.writeHead(500);
                    res.write("unable add new book Report");
                    res.end(adapterErrorResponse.ErrorSummary());
                });
            }
            res.send(adapterSuccessResponseForAddingNewBook.Value);
        }
    }, function (adapterErrorResponse) {
        console.log("Error white subbmiting new book Details in th database" + adapterErrorResponse.ErrorSummary());
        res.writeHead(500);
        res.write("unable add new book Report");
        res.end(adapterErrorResponse.ErrorSummary());
    });
}
exports.addnewBook = addnewBook; //addnewBook
function addNewAuthor(req, res) {
    var newAuthor = req.body;
    var newAuthorDetails = new authorDTO.AuthorsDTO(" ", newAuthor.firstname, newAuthor.lastname);
    console.log(newAuthorDetails);
    authorDataAdaptor.addNewAuthor(newAuthorDetails, function (adapterSuccessResponseForAddingNewBook) {
        if (adapterSuccessResponseForAddingNewBook.IsSuccess() === true) {
            console.log("new Author has added to the Database and its Id is==>" + adapterSuccessResponseForAddingNewBook.Value);
            res.send(adapterSuccessResponseForAddingNewBook.Value);
        }
    }, function (adapterErrorResponse) {
        console.log("Error white subbmiting new Author Details in th database" + adapterErrorResponse.ErrorSummary());
        res.writeHead(500);
        res.write("unable add new book Report");
        res.end(adapterErrorResponse.ErrorSummary());
    });
}
exports.addNewAuthor = addNewAuthor; //addNewAuthor
function getListOfAuthors(req, res) {
    authorDataAdaptor.getListOfAuthors(function (adapterSuccessResponse) {
        if (adapterSuccessResponse.IsSuccess() === true) {
            res.send(adapterSuccessResponse.Value);
        }
    }, function (adapterErrorResponse) {
        console.log("Error white subbmiting new Author Details in th database" + adapterErrorResponse.ErrorSummary());
        res.writeHead(500);
        res.write("unable add new book Report");
        res.end(adapterErrorResponse.ErrorSummary());
    });
}
exports.getListOfAuthors = getListOfAuthors; //getAuthorsBooks
function getBooksAuthors(req, res) {
}
exports.getBooksAuthors = getBooksAuthors; //getBooksAuthors
function getAuthorsDetailsById(req, res) {
}
exports.getAuthorsDetailsById = getAuthorsDetailsById; //getAuthorsDetailsById
//# sourceMappingURL=bookKartController.js.map