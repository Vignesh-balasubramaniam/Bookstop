var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
import response = require('../dataAccessLayer/dataAccessLayerResponse');
import DTO = require('./DTO/AuthorDTO');

var sequelize = models.sequelize;
export function addNewAuthor(argAuthor: DTO.AuthorsDTO, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.author.create({
                id: uuid.v1(),
                firstname: argAuthor.firstname,
                lastname:argAuthor.lastname
            }).then(function (addedAuthor) {
                var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                dalResponse.SetSuccessResult(addedAuthor.id)
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

export function getListOfAuthors(successcallback, errorcallback) {
    models.author.findAll().then(function (authorList) {
        try {
            var listOfAuthors: Array<DTO.AuthorsDTO> = new Array<DTO.AuthorsDTO>();
            for (let i in authorList) {
                listOfAuthors.push(new DTO.AuthorsDTO(authorList[i].id, authorList[i].firstname, authorList[i].lastname));
            }

            var dalResponse: response.DataAccessLayerResponse<Array<DTO.AuthorsDTO>> = new response.DataAccessLayerResponse<Array<DTO.AuthorsDTO>>();
            dalResponse.SetSuccessResult(listOfAuthors);
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



export function getAuthorById(argAuthorId: string, successcallback, errorcallback) {
    models.author.findOne({
        where: { id: argAuthorId }
    }).then(function (authorDetails) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback is
        try {
            if (authorDetails) {
                var customerDetailsList: DTO.AuthorsDTO = new DTO.AuthorsDTO(authorDetails.id, authorDetails.firstname, authorDetails.lastname);
                var dalResponse: response.DataAccessLayerResponse<DTO.AuthorsDTO> = new response.DataAccessLayerResponse<DTO.AuthorsDTO>();
                dalResponse.SetSuccessResult(customerDetailsList);
                successcallback(dalResponse);
            } else {
                var dalResponse: response.DataAccessLayerResponse<DTO.AuthorsDTO> = new response.DataAccessLayerResponse<DTO.AuthorsDTO>();
                dalResponse.SetSuccessResult(authorDetails);
                successcallback(dalResponse);
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
}//export function getAuthorById
