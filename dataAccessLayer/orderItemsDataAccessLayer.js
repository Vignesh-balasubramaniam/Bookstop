"use strict";
var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
var response = require('../dataAccessLayer/dataAccessLayerResponse');
var DTO = require('./DTO/orderedItemDTO');
var sequelize = models.sequelize;
function addOderItem(argOrderedItem, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.orderitems.create({
                id: uuid.v1(),
                customerid: argOrderedItem.customerid,
                orderid: argOrderedItem.orderid,
                bookid: argOrderedItem.bookid,
                quantity: argOrderedItem.quantity
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
exports.addOderItem = addOderItem;
function getCustomerOrderdItems(argOrderId, successcallback, errorcallback) {
    models.orderitems.findOne({
        where: { orderid: argOrderId }
    }).then(function (itemsByOrderId) {
        try {
            if (itemsByOrderId) {
                var customerOrderItems = new DTO.OrderedItemsDTO(itemsByOrderId.id, itemsByOrderId.customerid, itemsByOrderId.orderid, itemsByOrderId.bookid, itemsByOrderId.quantity);
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(customerOrderItems);
                successcallback(dalResponse);
            }
            else {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(itemsByOrderId);
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
exports.getCustomerOrderdItems = getCustomerOrderdItems;
//# sourceMappingURL=orderItemsDataAccessLayer.js.map