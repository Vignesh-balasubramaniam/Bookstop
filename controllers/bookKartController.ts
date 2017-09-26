import express = require('express');
import dataAccessLayerModule = require('../dataAccessLayer/dataAccessLayerResponse');
import booksDataAdaptor = require('../dataAccessLayer/booksDataAdaptor');
import authorDataAdaptor = require('../dataAccessLayer/authorDataAccessLayer');
import BookauthorDataAdaptor = require('../dataAccessLayer/bookAuthorDataAccessLayer');
import bookDTO = require('../dataAccessLayer/DTO/BooksDTO');
import authorDTO = require('../dataAccessLayer/DTO/authorDTO');
import bookAuthorDTO = require('../dataAccessLayer/DTO/bookAuthorDTO');

export class authorsDetails {
    id: string;
    name: string;
    books: Array<string>;
    constructor(argId: string, argname: string, argbooks: Array<string>) {
        this.id = argId;
        this.name = argname;
        this.books = argbooks;
    }
}//authorsDetails

export class bookDetails {
    id: string;
    isbn: string;
    name: string;
    publication: string;
    subject: string;
    description: string;
    authors: Array<string>;
    price: number;
    constructor(argId: string, argisbnnumber: string, argName: string, argPublication: string, argSubject: string,
        argDescription: string, argAuthors: Array<string>, argPrice: number) {
        this.id = argId;
        this.isbn = argisbnnumber;
        this.name = argName;
        this.publication = argPublication;
        this.subject = argSubject;
        this.description = argDescription;
        this.authors = argAuthors;
        this.price = argPrice;

    }
}


export function getListOfBooks(req: express.Request, res: express.Response) {
    booksDataAdaptor.getListOfBooks((adapterSuccessResponse: dataAccessLayerModule.DataAccessLayerResponse<Array<bookDTO.BooksDTO>>) => {
        if (adapterSuccessResponse.IsSuccess() === true) {
            res.send(adapterSuccessResponse.Value);
        }
    }, (error) => {

        res.writeHead(500);
        res.write("unable to get List of Books");
        res.end(error);
    })

}//getListOfBooks



export function getBooksDeatilsById(req: express.Request, res: express.Response) {
    var argBookId = req.query.bookId;
    var bookdetails: dataAccessLayerModule.DataAccessLayerResponse<Array<bookDTO.BooksDTO>>;
    booksDataAdaptor.getBooDetailsByid(argBookId,(adapterSuccessResponse: dataAccessLayerModule.DataAccessLayerResponse<Array<bookDTO.BooksDTO>>) => {
        if (adapterSuccessResponse.IsSuccess() === true) {
            res.send(adapterSuccessResponse.Value);
        }
    }, (error) => {

        res.writeHead(500);
        res.write("unable to get List of Books");
        res.end(error);
        })
}//getBooksDeatilsById

export function getAuthorsOfbook(req: express.Request, res: express.Response) {
    var argBookId = req.query.bookId;
    BookauthorDataAdaptor.getBooksAuthors(argBookId, (bookAuthorSuccessResponse) => {
        console.log(bookAuthorSuccessResponse);
        res.send(bookAuthorSuccessResponse.Value);
    }, (error) => {
        res.writeHead(500);
        res.write("unable to get List of Books");
        res.end(error);
    })

}


export function addnewBook(req: express.Request, res: express.Response) {
    var newBook = req.body;
    var newBookDetails: bookDTO.BooksDTO = new bookDTO.BooksDTO(" ", newBook.isbn, newBook.name, newBook.publication, newBook.title, newBook.description, newBook.author, newBook.price);
    console.log(newBookDetails);
    booksDataAdaptor.addNewBookEntry(newBookDetails,
        (adapterSuccessResponseForAddingNewBook: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
            if (adapterSuccessResponseForAddingNewBook.IsSuccess() === true) {
                for (let i = 0; i < newBook.author.length; i++) {
                    var newBookAuthorDetails: bookAuthorDTO.BookAuthorsDTO = new bookAuthorDTO.BookAuthorsDTO('', adapterSuccessResponseForAddingNewBook.Value, newBook.author[i]);
                    BookauthorDataAdaptor.addToBookAuthor(newBookAuthorDetails, (adapterSuccessResponseForAddingNewBook: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
                        
                    },(adapterErrorResponse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
                            console.log("Error white subbmiting new book Details in th database" + adapterErrorResponse.ErrorSummary());
                            res.writeHead(500);
                            res.write("unable add new book Report");
                            res.end(adapterErrorResponse.ErrorSummary());
                        })
                    }
                res.send(adapterSuccessResponseForAddingNewBook.Value);

            }
        }, (adapterErrorResponse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
            console.log("Error white subbmiting new book Details in th database" + adapterErrorResponse.ErrorSummary());
            res.writeHead(500);
            res.write("unable add new book Report");
            res.end(adapterErrorResponse.ErrorSummary());
        })

}//addnewBook



export function addNewAuthor(req: express.Request, res: express.Response) {
    var newAuthor = req.body;
    var newAuthorDetails: authorDTO.AuthorsDTO = new authorDTO.AuthorsDTO(" ", newAuthor.firstname, newAuthor.lastname);
    console.log(newAuthorDetails);
    authorDataAdaptor.addNewAuthor(newAuthorDetails,
        (adapterSuccessResponseForAddingNewBook: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
            if (adapterSuccessResponseForAddingNewBook.IsSuccess() === true) {
                console.log("new Author has added to the Database and its Id is==>" + adapterSuccessResponseForAddingNewBook.Value);
                res.send(adapterSuccessResponseForAddingNewBook.Value);
            }
        }, (adapterErrorResponse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
            console.log("Error white subbmiting new Author Details in th database" + adapterErrorResponse.ErrorSummary());
            res.writeHead(500);
            res.write("unable add new book Report");
            res.end(adapterErrorResponse.ErrorSummary());
        })
}//addNewAuthor




export function getListOfAuthors(req: express.Request, res: express.Response) {
    authorDataAdaptor.getListOfAuthors((adapterSuccessResponse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
        if (adapterSuccessResponse.IsSuccess() === true) {
            res.send(adapterSuccessResponse.Value);
        }
        }, (adapterErrorResponse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
            console.log("Error white subbmiting new Author Details in th database" + adapterErrorResponse.ErrorSummary());
            res.writeHead(500);
            res.write("unable add new book Report");
            res.end(adapterErrorResponse.ErrorSummary());
        })
}//getAuthorsBooks


export function getBooksAuthors(req: express.Request, res: express.Response) {


}//getBooksAuthors


export function getAuthorsDetailsById(req: express.Request, res: express.Response) {

}//getAuthorsDetailsById


