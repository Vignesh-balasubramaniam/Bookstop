"use strict";
var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
var response = require('../dataAccessLayer/dataAccessLayerResponse');
var DTO = require('./DTO/CartDTO');
var sequelize = models.sequelize;
function addToCart(argCartData, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.cart.create({
                id: uuid.v1(),
                bookid: argCartData.bookid,
                customerid: argCartData.customerid
            }).then(function (addToCart) {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(addToCart.id);
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
exports.addToCart = addToCart; //addToCart
function getCustomersCartDetails(argCustomerId, successcallback, errorcallback) {
    models.cart.findAll({
        where: { customerid: argCustomerId }
    }).then(function (usersCartDetails) {
        try {
            var cartDetails = new Array();
            for (var i in usersCartDetails) {
                cartDetails.push(new DTO.CartDTO(usersCartDetails[i].id, usersCartDetails[i].bookid, usersCartDetails[i].customerid));
            }
            var dalResponse = new response.DataAccessLayerResponse();
            dalResponse.SetSuccessResult(cartDetails);
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
exports.getCustomersCartDetails = getCustomersCartDetails; //getCustomersCartDetails
function getCartDetailsById(argCartId, successcallback, errorcallback) {
    models.author.findOne({
        where: { id: argCartId }
    }).then(function (cartDetailsById) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback is
        try {
            if (cartDetailsById) {
                var customerDetailsList = new DTO.CartDTO(cartDetailsById.id, cartDetailsById.bookId, cartDetailsById.customerid);
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(customerDetailsList);
                successcallback(dalResponse);
            }
            else {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(cartDetailsById);
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
exports.getCartDetailsById = getCartDetailsById; //export function getCartDetailsById
function deleteCartItem(argCartId, argcustomerId, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.cart.destroy({
                where: {
                    id: argCartId
                }
            }).then(function (deletedcartitem) {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(deletedcartitem.id);
                models.cart.findAll({
                    where: { customerid: argcustomerId }
                }).then(function (usersCartDetails) {
                    try {
                        var cartDetails = new Array();
                        for (var i in usersCartDetails) {
                            cartDetails.push(new DTO.CartDTO(usersCartDetails[i].id, usersCartDetails[i].bookid, usersCartDetails[i].customerid));
                        }
                        var dalResponse = new response.DataAccessLayerResponse();
                        dalResponse.SetSuccessResult(cartDetails);
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
exports.deleteCartItem = deleteCartItem; //export function getCartDetailsById
//# sourceMappingURL=cartDataAccessLayer.js.map