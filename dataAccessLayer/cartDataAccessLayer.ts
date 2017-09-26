var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
import response = require('../dataAccessLayer/dataAccessLayerResponse');
import DTO = require('./DTO/CartDTO');

var sequelize = models.sequelize;
export function addToCart(argCartData: DTO.CartDTO, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.cart.create({
                id: uuid.v1(),
                bookid: argCartData.bookid,
                customerid: argCartData.customerid
            }).then(function (addToCart) {
                var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                dalResponse.SetSuccessResult(addToCart.id)
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



export function getCustomersCartDetails(argCustomerId,successcallback, errorcallback) {
    models.cart.findAll({
        where: { customerid: argCustomerId }
    }).then(function (usersCartDetails) {
        try {
            var cartDetails: Array<DTO.CartDTO> = new Array<DTO.CartDTO>();
            for (let i in usersCartDetails) {
                cartDetails.push(new DTO.CartDTO(usersCartDetails[i].id, usersCartDetails[i].bookid, usersCartDetails[i].customerid));
            }

            var dalResponse: response.DataAccessLayerResponse<Array<DTO.CartDTO>> = new response.DataAccessLayerResponse<Array<DTO.CartDTO>>();
            dalResponse.SetSuccessResult(cartDetails);
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


export function getCartDetailsById(argCartId: string, successcallback, errorcallback) {
    models.author.findOne({
        where: { id: argCartId }
    }).then(function (cartDetailsById) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback is
        try {
            if (cartDetailsById) {
                var customerDetailsList: DTO.CartDTO = new DTO.CartDTO(cartDetailsById.id, cartDetailsById.bookId, cartDetailsById.customerid);
                var dalResponse: response.DataAccessLayerResponse<DTO.CartDTO> = new response.DataAccessLayerResponse<DTO.CartDTO>();
                dalResponse.SetSuccessResult(customerDetailsList);
                successcallback(dalResponse);
            } else {
                var dalResponse: response.DataAccessLayerResponse<DTO.CartDTO> = new response.DataAccessLayerResponse<DTO.CartDTO>();
                dalResponse.SetSuccessResult(cartDetailsById);
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
}//export function getCartDetailsById



export function deleteCartItem(argCartId: string,argcustomerId:string, successcallback, errorcallback) {
    try {

        sequelize.transaction({ autocomit: false }, function (t) {
            return models.cart.destroy({
                where: {
                    id: argCartId
                }
            }).then(function (deletedcartitem) {
                var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                dalResponse.SetSuccessResult(deletedcartitem.id)
                models.cart.findAll({
                    where: { customerid: argcustomerId }
                }).then(function (usersCartDetails) {
                    try {
                        var cartDetails: Array<DTO.CartDTO> = new Array<DTO.CartDTO>();
                        for (let i in usersCartDetails) {
                            cartDetails.push(new DTO.CartDTO(usersCartDetails[i].id, usersCartDetails[i].bookid, usersCartDetails[i].customerid));
                        }

                        var dalResponse: response.DataAccessLayerResponse<Array<DTO.CartDTO>> = new response.DataAccessLayerResponse<Array<DTO.CartDTO>>();
                        dalResponse.SetSuccessResult(cartDetails);
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
            }).catch(function (err) {
                var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                dalResponse.AddErrorDescription(-1, err)
                successcallback(err);
            });
        })
    } catch (exception) {
        var dalrespose: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>()
        dalrespose.AddErrorDescription(-1, exception)
        errorcallback(dalrespose);
    }
}//export function getCartDetailsById