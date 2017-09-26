var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
import response = require('./dataAccessLayerResponse');
import DTO = require('./DTO/userActivityDTO');

var sequelize = models.sequelize;
export function insertUserLogin(argUserLoginDTO: DTO.UserLoginDTO, successcallback, errorcallback) {
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
            var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
            dalResponse.SetSuccessResult("Successfully stored the login information");
            successcallback(dalResponse);
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback is
            var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
            dalResponse.AddErrorDescription(-1, err)
            errorcallback(dalResponse);
        });
    }
    catch (Exeception) {
        var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
        dalResponse.AddErrorDescription(-1, Exeception.toString())
        errorcallback(dalResponse);
    }
}//export function insertUserLogin(argUserLoginDTO: DTO.UserLoginDTO, successcallback, errorcallback) 


export function findUserLogin(argUserId: string, successcallback, errorcallback) {
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
                var userLogin: DTO.UserLoginDTO = new DTO.UserLoginDTO(user.id, user.id_user, user.session_id, user.isSessionValid, user.login_time);
                var dalResponse: response.DataAccessLayerResponse<DTO.UserLoginDTO> = new response.DataAccessLayerResponse<DTO.UserLoginDTO>();
                dalResponse.SetSuccessResult(userLogin);
                successcallback(dalResponse);
            } else {
                var dalResponse: response.DataAccessLayerResponse<DTO.UserLoginDTO> = new response.DataAccessLayerResponse<DTO.UserLoginDTO>();
                dalResponse.SetSuccessResult(user);
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

}//export function findUserLogin(argUserId: string, successcallback, errorcallback) 

export function findUserAlreadyLogin(argUserId: string, argUserIdSessionId: string, successcallback, errorcallback) {
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
                var userLogin: DTO.UserLoginDTO = new DTO.UserLoginDTO(user.id, user.id_user, user.session_id, user.isSessionValid, user.login_time);
                var dalResponse: response.DataAccessLayerResponse<DTO.UserLoginDTO> = new response.DataAccessLayerResponse<DTO.UserLoginDTO>();
                dalResponse.SetSuccessResult(userLogin);
                successcallback(dalResponse);
            } else {
                var dalResponse: response.DataAccessLayerResponse<DTO.UserLoginDTO> = new response.DataAccessLayerResponse<DTO.UserLoginDTO>();
                dalResponse.SetSuccessResult(user);
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

}//export function findUserAlreadyLogin(argUserId: string, argUserIdSessionId:string, successcallback, errorcallback) 

export function updateUserLogin(argUserLoginDTO: DTO.UserLoginDTO, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocommit: false }, function (t) {
            return models.login.update(
                { isSessionValid: false },
                {
                    where: {
                        id_user: argUserLoginDTO.user_id,
                        isSessionValid: true,
                        session_id: argUserLoginDTO.session_id
                    }

                },
                { transaction: t });
        }).then(function (updatedUserLogin) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback is
            var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
            dalResponse.SetSuccessResult(updatedUserLogin);
            successcallback(dalResponse);
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback is
            var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
            dalResponse.AddErrorDescription(-1, err)
            errorcallback(dalResponse);
        });

    }
    catch (exception) {
        var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
        dalResponse.AddErrorDescription(-1, exception);
        errorcallback(dalResponse);
    }

}//export function updateUserLogin(argUserLoginDTO: DTO.UserLoginDTO, successcallback, errorcallback) 

export function updateUserLoginSessionValidToFalse(successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocommit: false }, function (t) {
            return models.login.update(
                { isSessionValid: false },
                {
                    where: {
                        isSessionValid: true,
                    }

                },
                { transaction: t });
        }).then(function (updatedUserLogin) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback is
            var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
            dalResponse.SetSuccessResult(updatedUserLogin);
            successcallback(dalResponse);
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback is
            var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
            dalResponse.AddErrorDescription(-1, err)
            errorcallback(dalResponse);
        });

    }
    catch (exception) {
        var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
        dalResponse.AddErrorDescription(-1, exception);
        errorcallback(dalResponse);
    }

}//export function updateUserLoginSessionValidToFalse(argUserLoginDTO: DTO.UserLoginDTO, successcallback, errorcallback) 