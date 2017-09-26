var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
import response = require('../dataAccessLayer/dataAccessLayerResponse');
import DTO = require('./DTO/BooksDTO');

var sequelize = models.sequelize;
export function addNewBookEntry(argNewBook: DTO.BooksDTO, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.books.create({
                id: uuid.v1(),
                isbn:argNewBook.isbn,
                name: argNewBook.name,
                publication: argNewBook.publication,
                subject: argNewBook.subject,
                description: argNewBook.description,
                authors: argNewBook.authors,
                price:argNewBook.price
            }).then(function (addedBook) {
                var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                dalResponse.SetSuccessResult(addedBook.id)
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
}



export function getListOfBooks(successcallback, errorcallback) {
    models.books.findAll().then(function (booksList) {
        try {
            var listOfBooks: Array<DTO.BooksDTO> = new Array<DTO.BooksDTO>();
            for (let i in booksList) {
                listOfBooks.push(new DTO.BooksDTO(booksList[i].id,booksList[i].isbnnumber, booksList[i].name,
                    booksList[i].publication, booksList[i].subject, booksList[i].description,
                    booksList[i].authors, booksList[i].price));
            }

            var dalResponse: response.DataAccessLayerResponse<Array<DTO.BooksDTO>> = new response.DataAccessLayerResponse<Array<DTO.BooksDTO>>();
            dalResponse.SetSuccessResult(listOfBooks);
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
}


export function getBooDetailsByid(argBookId,successcallback, errorcallback) {
    models.books.findOne({
        where: { id: argBookId }
    }).then(function (bookDetailsById) {
        try {
            if (bookDetailsById) {
                var customerDetailsList: DTO.BooksDTO = new DTO.BooksDTO(bookDetailsById.id, bookDetailsById.isbn, bookDetailsById.name, bookDetailsById.publication,
                    bookDetailsById.subject, bookDetailsById.description, bookDetailsById.authors, bookDetailsById.price);
                var dalResponse: response.DataAccessLayerResponse<DTO.BooksDTO> = new response.DataAccessLayerResponse<DTO.BooksDTO>();
                dalResponse.SetSuccessResult(customerDetailsList);
                successcallback(dalResponse);
            } else {
                var dalResponse: response.DataAccessLayerResponse<DTO.BooksDTO> = new response.DataAccessLayerResponse<DTO.BooksDTO>();
                dalResponse.SetSuccessResult(bookDetailsById);
                successcallback(dalResponse);
            }
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
}
