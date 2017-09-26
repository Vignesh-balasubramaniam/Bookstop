"use strict";
var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
var response = require('./dataAccessLayerResponse');
var DTO = require('./DTO/userActivityDTO');
var sequelize = models.sequelize;
function insertUserLogin(argUserLoginDTO, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocommit: false }, function (t) {
            return models.login.create({
                id: uuid.v1(),
                id_user: argUserLoginDTO.user_id,
                login_time: argUserLoginDTO.login_time,
                session_id: argUserLoginDTO.session_id,
                isSessionValid: argUserLoginDTO.isSessionValid
            }, { transaction: t });
        }).then(function (user_login_row) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback is
            var dalResponse = new response.DataAccessLayerResponse();
            dalResponse.SetSuccessResult("Successfully stored the login information");
            successcallback(dalResponse);
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback is
            var dalResponse = new response.DataAccessLayerResponse();
            dalResponse.AddErrorDescription(-1, err);
            errorcallback(dalResponse);
        });
    }
    catch (Exeception) {
        var dalResponse = new response.DataAccessLayerResponse();
        dalResponse.AddErrorDescription(-1, Exeception.toString());
        errorcallback(dalResponse);
    }
}
exports.insertUserLogin = insertUserLogin; //export function insertUserLogin(argUserLoginDTO: DTO.UserLoginDTO, successcallback, errorcallback) 
function findUserLogin(argUserId, successcallback, errorcallback) {
    models.login.findOne({
        where: {
            id_user: argUserId,
            isSessionValid: true
        }
    }).then(function (user) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback is
        try {
            if (user) {
                var userLogin = new DTO.UserLoginDTO(user.id, user.id_user, user.session_id, user.isSessionValid, user.login_time);
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(userLogin);
                successcallback(dalResponse);
            }
            else {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(user);
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
exports.findUserLogin = findUserLogin; //export function findUserLogin(argUserId: string, successcallback, errorcallback) 
function findUserAlreadyLogin(argUserId, argUserIdSessionId, successcallback, errorcallback) {
    models.login.findOne({
        where: {
            id_user: argUserId,
            session_id: argUserIdSessionId,
            isSessionValid: true
        }
    }).then(function (user) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback is
        try {
            if (user) {
                var userLogin = new DTO.UserLoginDTO(user.id, user.id_user, user.session_id, user.isSessionValid, user.login_time);
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(userLogin);
                successcallback(dalResponse);
            }
            else {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(user);
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
exports.findUserAlreadyLogin = findUserAlreadyLogin; //export function findUserAlreadyLogin(argUserId: string, argUserIdSessionId:string, successcallback, errorcallback) 
function updateUserLogin(argUserLoginDTO, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocommit: false }, function (t) {
            return models.login.update({ isSessionValid: false }, {
                where: {
                    id_user: argUserLoginDTO.user_id,
                    isSessionValid: true,
                    session_id: argUserLoginDTO.session_id
                }
            }, { transaction: t });
        }).then(function (updatedUserLogin) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback is
            var dalResponse = new response.DataAccessLayerResponse();
            dalResponse.SetSuccessResult(updatedUserLogin);
            successcallback(dalResponse);
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback is
            var dalResponse = new response.DataAccessLayerResponse();
            dalResponse.AddErrorDescription(-1, err);
            errorcallback(dalResponse);
        });
    }
    catch (exception) {
        var dalResponse = new response.DataAccessLayerResponse();
        dalResponse.AddErrorDescription(-1, exception);
        errorcallback(dalResponse);
    }
}
exports.updateUserLogin = updateUserLogin; //export function updateUserLogin(argUserLoginDTO: DTO.UserLoginDTO, successcallback, errorcallback) 
function updateUserLoginSessionValidToFalse(successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocommit: false }, function (t) {
            return models.login.update({ isSessionValid: false }, {
                where: {
                    isSessionValid: true,
                }
            }, { transaction: t });
        }).then(function (updatedUserLogin) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback is
            var dalResponse = new response.DataAccessLayerResponse();
            dalResponse.SetSuccessResult(updatedUserLogin);
            successcallback(dalResponse);
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback is
            var dalResponse = new response.DataAccessLayerResponse();
            dalResponse.AddErrorDescription(-1, err);
            errorcallback(dalResponse);
        });
    }
    catch (exception) {
        var dalResponse = new response.DataAccessLayerResponse();
        dalResponse.AddErrorDescription(-1, exception);
        errorcallback(dalResponse);
    }
}
exports.updateUserLoginSessionValidToFalse = updateUserLoginSessionValidToFalse; //export function updateUserLoginSessionValidToFalse(argUserLoginDTO: DTO.UserLoginDTO, successcallback, errorcallback) 
//# sourceMappingURL=customerActivityAdaptar.js.map