"use strict";
var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
var response = require('../dataAccessLayer/dataAccessLayerResponse');
var DTO = require('./DTO/OrderDTO');
var sequelize = models.sequelize;
function addNewOrderDetails(argOrder, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.order.create({
                id: uuid.v1(),
                numberofitems: argOrder.numberofitems,
                deliveryaddressid: argOrder.deliveryaddressid,
                deliveryphoneno: argOrder.deliveryphoneno,
                deliverydate: argOrder.deliverydate,
                ordereddate: argOrder.ordereddate,
                totalamount: argOrder.totalamount,
                modeofpaymet: argOrder.modeofpaymet,
                status: argOrder.status
            }).then(function (placedOrdered) {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(placedOrdered.id);
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
exports.addNewOrderDetails = addNewOrderDetails;
function getCustomerOrderDetails(successcallback, errorcallback) {
    models.order.findAll().then(function (customerOrder) {
        try {
            var customerOrders = new Array();
            for (var i in customerOrder) {
                customerOrders.push(new DTO.OrderDTO(customerOrder[i].id, customerOrder[i].numberofitems, customerOrder[i].deliveryaddressid, customerOrder[i].deliveryphoneno, customerOrder[i].deliverydate, customerOrder[i].ordereddate, customerOrder[i].totalamount, customerOrder[i].modeofpaymet, customerOrder.status));
            }
            var dalResponse = new response.DataAccessLayerResponse();
            dalResponse.SetSuccessResult(customerOrders);
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
exports.getCustomerOrderDetails = getCustomerOrderDetails;
function getorderById(argOrderId, successcallback, errorcallback) {
    models.oder.findOne({
        where: { id: argOrderId }
    }).then(function (orderDetails) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback is
        try {
            if (orderDetails) {
                var customerDetailsList = new DTO.OrderDTO(orderDetails.id, orderDetails.numberofitems, orderDetails.deliveryaddressid, orderDetails.deliveryphoneno, orderDetails.deliverydate, orderDetails.ordereddate, orderDetails.totalamount, orderDetails.modeofpaymet, orderDetails.status);
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(customerDetailsList);
                successcallback(dalResponse);
            }
            else {
                var dalResponse = new response.DataAccessLayerResponse();
                dalResponse.SetSuccessResult(orderDetails);
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
exports.getorderById = getorderById; //export function findCustomerById
//# sourceMappingURL=orderAccessLayer.js.map