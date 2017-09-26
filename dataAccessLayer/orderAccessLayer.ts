var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
import response = require('../dataAccessLayer/dataAccessLayerResponse');
import DTO = require('./DTO/OrderDTO');

var sequelize = models.sequelize;
export function addNewOrderDetails(argOrder: DTO.OrderDTO, successcallback, errorcallback) {
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
                status:argOrder.status
            }).then(function (placedOrdered) {
                var dalResponse: response.DataAccessLayerResponse<string> = new response.DataAccessLayerResponse<string>();
                dalResponse.SetSuccessResult(placedOrdered.id)
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



export function getCustomerOrderDetails(successcallback, errorcallback) {
    models.order.findAll().then(function (customerOrder) {
        try {
            var customerOrders: Array<DTO.OrderDTO> = new Array<DTO.OrderDTO>();
            for (let i in customerOrder) {
                customerOrders.push(new DTO.OrderDTO(customerOrder[i].id, customerOrder[i].numberofitems, customerOrder[i].deliveryaddressid,
                    customerOrder[i].deliveryphoneno, customerOrder[i].deliverydate, customerOrder[i].ordereddate,
                    customerOrder[i].totalamount, customerOrder[i].modeofpaymet, customerOrder.status));
            }

            var dalResponse: response.DataAccessLayerResponse<Array<DTO.OrderDTO>> = new response.DataAccessLayerResponse<Array<DTO.OrderDTO>>();
            dalResponse.SetSuccessResult(customerOrders);
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
}



export function getorderById(argOrderId: string, successcallback, errorcallback) {
    models.oder.findOne({
        where: { id: argOrderId }
    }).then(function (orderDetails) {
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback is
        try {
            if (orderDetails) {
                var customerDetailsList: DTO.OrderDTO = new DTO.OrderDTO(orderDetails.id, orderDetails.numberofitems, orderDetails.deliveryaddressid, orderDetails.deliveryphoneno,
                    orderDetails.deliverydate, orderDetails.ordereddate, orderDetails.totalamount, orderDetails.modeofpaymet, orderDetails.status);
                var dalResponse: response.DataAccessLayerResponse<DTO.OrderDTO> = new response.DataAccessLayerResponse<DTO.OrderDTO>();
                dalResponse.SetSuccessResult(customerDetailsList);
                successcallback(dalResponse);
            } else {
                var dalResponse: response.DataAccessLayerResponse<DTO.OrderDTO> = new response.DataAccessLayerResponse<DTO.OrderDTO>();
                dalResponse.SetSuccessResult(orderDetails);
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
}//export function findCustomerById
