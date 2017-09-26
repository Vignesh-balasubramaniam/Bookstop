"use strict";
var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
var response = require('../dataAccessLayer/dataAccessLayerResponse');
var DTO = require('./DTO/AddressDTO');
var sequelize = models.sequelize;
function createAddressForOrder(argAddess, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.address.create({
                id: uuid.v1(),
                housenumber: argAddess.housenumber,
                street: argAddess.street,
                area: argAddess.area,
                city: argAddess.city,
                state: argAddess.state,
                pincode: argAddess.pincode
            }).then(function (addedBook) {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(addedBook.id);
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
exports.createAddressForOrder = createAddressForOrder;
function getCustomerAdressById(argId, successcallback, errorcallback) {
    models.address.findOne({
        where: { id: argId }
    }).then(function (addressByID) {
        try {
            if (addressByID) {
                var customerOrderAddress = new DTO.AddressDTO(addressByID.id, addressByID.housenumber, addressByID.street, addressByID.area, addressByID.city, addressByID.state, addressByID.pincode);
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(customerOrderAddress);
                successcallback(dalResponse);
            }
            else {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(addressByID);
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
exports.getCustomerAdressById = getCustomerAdressById;
//# sourceMappingURL=addressdataAccessLayer.js.map