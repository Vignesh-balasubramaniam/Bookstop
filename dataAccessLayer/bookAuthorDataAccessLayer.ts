var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
import response = require('../dataAccessLayer/dataAccessLayerResponse');
import bookAuthorDTO = require('./DTO/bookAuthorDTO');
import DTO = require('./DTO/AuthorDTO');

var sequelize = models.sequelize;
export function addToBookAuthor(argBookAuthorDetails: bookAuthorDTO.BookAuthorsDTO, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.bookauthor.create({
                id: uuid.v1(),
                bookId: argBookAuthorDetails.bookId,
                authorId:argBookAuthorDetails.authorId
            }).then(function (addedBookAuthorDetails) {
                var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                dalResponse.SetSuccessResult(addedBookAuthorDetails.id)
                successcallback(dalResponse);
            }).catch(function (err) {
                var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                dalResponse.AddErrorDescription(-1, err)
                successcallback(err);
            });
        });
    }
    catch (exception) {

        var dalrespose: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>()
        dalrespose.AddErrorDescription(-1, exception)
        errorcallback(dalrespose);
    }
}//addToCart


export function getBooksAuthors(argBookId, successcallback, errorcallback) {
    models.bookauthor.findAll({
        where: { bookId: argBookId }
    }).then(function (bookAuthors) {
        try {
            var authorsOfBook: Array<bookAuthorDTO.BookAuthorsDTO> = new Array<bookAuthorDTO.BookAuthorsDTO>();

            var listOfAuthors = [];
            for (let i in bookAuthors) {
                authorsOfBook.push(new bookAuthorDTO.BookAuthorsDTO(bookAuthors[i].id, bookAuthors[i].bookId, bookAuthors[i].authorId));

                models.author.findOne({
                    where: { id: bookAuthors[i].authorId  }
                }).then(function (authorDetails) {
                    // Transaction has been committed
                    // result is whatever the result of the promise chain returned to the transaction callback is
                    try {
                        if (authorDetails) {
                            listOfAuthors.push(authorDetails.firstname + authorDetails.lastname);
                        } else {
                            
                        }
                    } catch (exception) {
                        var dalResponseEx: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                        dalResponseEx.AddErrorDescription(-1, exception)
                        errorcallback(dalResponseEx);
                    }
                }, function (error) {
                    var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                    dalResponse.AddErrorDescription(-1, error);
                    errorcallback(dalResponse);
                });

            }
            setTimeout(function () {
                var dalResponse: response.DataAccessLayerResponse<Array<bookAuthorDTO.BookAuthorsDTO>> = new response.DataAccessLayerResponse<Array<bookAuthorDTO.BookAuthorsDTO>>();
                dalResponse.SetSuccessResult(listOfAuthors);
                successcallback(dalResponse);
            }, 3000);
        }
        catch (exception) {

            var dalResponseEx: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
            dalResponseEx.AddErrorDescription(-1, exception)
            errorcallback(dalResponseEx);
        }
    }, function (error) {
        var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
        dalResponse.AddErrorDescription(-1, error);
        errorcallback(dalResponse);
    });
}//getBooksAuthors



export function getAuthorsBooks(argAuthorId, successcallback, errorcallback) {
    models.cart.findAll({
        where: { authorId: argAuthorId }
    }).then(function (authorsBooks) {
        try {
            var booksByAuthor: Array<bookAuthorDTO.BookAuthorsDTO> = new Array<bookAuthorDTO.BookAuthorsDTO>();
            for (let i in authorsBooks) {
                booksByAuthor.push(new bookAuthorDTO.BookAuthorsDTO(authorsBooks[i].id, authorsBooks[i].bookId, authorsBooks[i].authorId));
            }

            var dalResponse: response.DataAccessLayerResponse<Array<bookAuthorDTO.BookAuthorsDTO>> = new response.DataAccessLayerResponse<Array<bookAuthorDTO.BookAuthorsDTO>>();
            dalResponse.SetSuccessResult(booksByAuthor);
            successcallback(dalResponse);
        }
        catch (exception) {

            var dalResponseEx: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
            dalResponseEx.AddErrorDescription(-1, exception)
            errorcallback(dalResponseEx);
        }
    }, function (error) {
        var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
        dalResponse.AddErrorDescription(-1, error);
        errorcallback(dalResponse);
    });
}//getCustomersCartDetails