var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
import response = require('../dataAccessLayer/dataAccessLayerResponse');
import DTO = require('./DTO/orderedItemDTO');

var sequelize = models.sequelize;
export function addOderItem(argOrderedItem: DTO.OrderedItemsDTO, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.orderitems.create({
                id: uuid.v1(),
                customerid: argOrderedItem.customerid,
                orderid: argOrderedItem.orderid,
                bookid: argOrderedItem.bookid,
                quantity:argOrderedItem.quantity
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

export function getCustomerOrderdItems(argOrderId, successcallback, errorcallback) {
    models.orderitems.findOne({
        where: { orderid: argOrderId }
    }).then(function (itemsByOrderId) {
        try {
            if (itemsByOrderId) {
                var customerOrderItems: DTO.OrderedItemsDTO = new DTO.OrderedItemsDTO(itemsByOrderId.id,
                    itemsByOrderId.customerid, itemsByOrderId.orderid, itemsByOrderId.bookid, itemsByOrderId.quantity);
                var dalResponse: response.DataAccessLayerResponse<DTO.OrderedItemsDTO> = new response.DataAccessLayerResponse<DTO.OrderedItemsDTO>();
                dalResponse.SetSuccessResult(customerOrderItems);
                successcallback(dalResponse);
            } else {
                var dalResponse: response.DataAccessLayerResponse<DTO.OrderedItemsDTO> = new response.DataAccessLayerResponse<DTO.OrderedItemsDTO>();
                dalResponse.SetSuccessResult(itemsByOrderId);
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