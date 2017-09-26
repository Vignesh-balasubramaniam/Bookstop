"use strict";
var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
var response = require('../dataAccessLayer/dataAccessLayerResponse');
var DTO = require('./DTO/AuthorDTO');
var sequelize = models.sequelize;
function addNewAuthor(argAuthor, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.author.create({
                id: uuid.v1(),
                firstname: argAuthor.firstname,
                lastname: argAuthor.lastname
            }).then(function (addedAuthor) {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(addedAuthor.id);
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
exports.addNewAuthor = addNewAuthor;
function getListOfAuthors(successcallback, errorcallback) {
    models.author.findAll().then(function (authorList) {
        try {
            var listOfAuthors = new Array();
            for (var i in authorList) {
                listOfAuthors.push(new DTO.AuthorsDTO(authorList[i].id, authorList[i].firstname, authorList[i].lastname));
            }
            var dalResponse = new response.DataAccessLayerResponse();
            dalResponse.SetSuccessResult(listOfAuthors);
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
exports.getListOfAuthors = getListOfAuthors;
function getAuthorById(argAuthorId, successcallback, errorcallback) {
    models.author.findOne({
        where: { id: argAuthorId }
    }).then(function (authorDetails) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback is
        try {
            if (authorDetails) {
                var customerDetailsList = new DTO.AuthorsDTO(authorDetails.id, authorDetails.firstname, authorDetails.lastname);
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(customerDetailsList);
                successcallback(dalResponse);
            }
            else {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(authorDetails);
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
exports.getAuthorById = getAuthorById; //export function getAuthorById
//# sourceMappingURL=authorDataAccessLayer.js.map