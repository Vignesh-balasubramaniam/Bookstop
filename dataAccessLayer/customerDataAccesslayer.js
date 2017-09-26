"use strict";
var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
var response = require('../dataAccessLayer/dataAccessLayerResponse');
var DTO = require('./DTO/CustomerDTO');
var sequelize = models.sequelize;
function createUser(argUserDTO, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocommit: false }, function (t) {
            return models.user.create({
                id: uuid.v1(),
                username: argUserDTO.username,
                password: argUserDTO.password,
                email: argUserDTO.email,
                usertype: 'LC',
                usercomment: argUserDTO.usercomment,
            }).then(function (inserteduser) {
                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback is
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(inserteduser.id);
                successcallback(dalResponse);
            }).catch(function (err) {
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback is
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.AddErrorDescription(-1, err);
                errorcallback(dalResponse);
            });
        });
    }
    catch (Exeception) {
        var dalResponse = new response.DataAccessLayerResponse();
        dalResponse.AddErrorDescription(-1, Exeception);
        errorcallback(dalResponse);
    }
}
exports.createUser = createUser;
function createUserEx(argCustomerDTO, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocommit: false }, function (t) {
            return models.user.create({
                id: uuid.v1(),
                username: argCustomerDTO.username,
                password: argCustomerDTO.password,
                email: argCustomerDTO.email,
                usertype: 'LC',
                usercomment: argCustomerDTO.usercomment,
            }, { transaction: t }).then(function (insertedUser) {
                return models.login.create({
                    id: uuid.v1(),
                    id_user: insertedUser.id,
                    login_time: new Date(Date.now())
                }, { transaction: t });
            });
        }).then(function (insertedloginuser) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback is
            var dalResponse = new response.DataAccessLayerResponse();
            dalResponse.SetSuccessResult(insertedloginuser.id_user);
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
        dalResponse.AddErrorDescription(-1, Exeception);
        errorcallback(dalResponse);
    }
}
exports.createUserEx = createUserEx;
function findOneUser(argEmail, successcallback, errorcallback) {
    models.user.findOne({
        where: { email: argEmail }
    }).then(function (databaseuser) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback is
        try {
            if (databaseuser) {
                databaseuser = databaseuser.dataValues;
                //user = user.get({plain:true});
                var CustomerDTO = new DTO.CustomerDTO(databaseuser.id, databaseuser.username, databaseuser.password, databaseuser.email, databaseuser.usercomment);
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(CustomerDTO);
                successcallback(dalResponse);
            }
            else {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(databaseuser);
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
exports.findOneUser = findOneUser;
;
function getUserDetailById(argId, successcallback, errorcallback) {
    models.user.findOne({
        where: { id: argId }
    }).then(function (databaseuser) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback is
        try {
            if (databaseuser) {
                databaseuser = databaseuser.dataValues;
                //user = user.get({plain:true});
                var CustomerDTO = new DTO.CustomerDTO(databaseuser.id, databaseuser.username, databaseuser.password, databaseuser.email, databaseuser.usercomment);
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(CustomerDTO);
                successcallback(dalResponse);
            }
            else {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(databaseuser);
                successcallback(dalResponse);
            }
        }
        catch (exception) {
            var dalResponseEx = new response.DataAccessLayerResponse();
            dalResponse.AddErrorDescription(-1, exception);
            errorcallback(dalResponseEx);
        }
    }, function (err) {
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback is
        var dalResponse = new response.DataAccessLayerResponse();
        dalResponse.AddErrorDescription(-1, err);
        errorcallback(dalResponse);
    });
}
exports.getUserDetailById = getUserDetailById;
;
function getUsersDetail(successcallback, errorcallback) {
    sequelize.transaction({ autocommit: false }).then(function (t) {
        models.user.findAll({
            attributes: ['id', 'username', 'email', 'usercomment']
        }).then(function (databaseuser) {
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback is
            try {
                var listofUsers = new Array();
                databaseuser.forEach(function (users) {
                    listofUsers.push({
                        id: users.id,
                        username: users.username,
                        email: users.email,
                        password: '',
                        usercomment: users.usercomment
                    });
                });
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(listofUsers);
                successcallback(dalResponse);
            }
            catch (exception) {
                var dalResponseEx = new response.DataAccessLayerResponse();
                dalResponse.AddErrorDescription(-1, exception);
                errorcallback(dalResponseEx);
            }
        }).catch(function (err) {
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback is
            var dalResponse = new response.DataAccessLayerResponse();
            dalResponse.AddErrorDescription(-1, err);
            errorcallback(dalResponse);
        });
    });
}
exports.getUsersDetail = getUsersDetail;
function deleteUser(userId, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocommit: false })
            .then(function (t) {
            models.user.destroy({
                where: {
                    id: userId
                }
            }).then(function (rowDeleted) {
                if (rowDeleted === 1) {
                    console.log('Deleted successfully');
                    var dalResponse = new response.DataAccessLayerResponse();
                    dalResponse.SetSuccessResult(true);
                    successcallback(dalResponse);
                }
            }, function (err) {
                console.log(err);
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.AddErrorDescription(-1, err);
                errorcallback(dalResponse);
            });
        });
    }
    catch (exception) {
        var dalResponse = new response.DataAccessLayerResponse();
        dalResponse.AddErrorDescription(-1, exception);
        errorcallback(dalResponse);
    }
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=customerDataAccessLayer.js.map