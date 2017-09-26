"use strict";
var orderDataAccessLayer = require('../dataAccessLayer/orderAccessLayer');
var orderItemsDataAccessLayer = require('../dataAccessLayer/orderItemsDataAccessLayer');
var addressDataAccessLayer = require('../dataAccessLayer/addressdataAccessLayer');
var cartDataAccessLayer = require('../dataAccessLayer/cartDataAccessLayer');
var orderDTO = require('../dataAccessLayer/DTO/orderDTO');
var orderedItemsDTO = require('../dataAccessLayer/DTO/orderedItemDTO');
var cartDTO = require('../dataAccessLayer/DTO/cartDTO');
var addressDTO = require('../dataAccessLayer/DTO/AddressDTO');
function placeOrder(req, res) {
    var orderDetails = req.body;
    var address = new addressDTO.AddressDTO('', orderDetails.address.houseno, orderDetails.address.street, orderDetails.address.area, orderDetails.address.city, orderDetails.address.state, orderDetails.address.pino);
    addressDataAccessLayer.createAddressForOrder(address, function (addressDataAccessLayerResponse) {
        var orderdTO = new orderDTO.OrderDTO('', orderDetails.items.length, addressDataAccessLayerResponse.Value, orderDetails.deliveryPhoneNumber, orderDetails.deliveryDate, orderDetails.ordereddate, orderDetails.totalAmount, orderDetails.modeofPayment, 0);
        orderDataAccessLayer.addNewOrderDetails(orderdTO, function (oderDataAccessLayerResponse) {
            for (var i = 0; i < orderDetails.items.length; i++) {
                var orderedItemDTO = new orderedItemsDTO.OrderedItemsDTO('', '18c25043-74d2-4808-8c37-fc426d481642', oderDataAccessLayerResponse.Value, orderDetails.items[i].id, orderDetails.items[i].quantity);
                orderItemsDataAccessLayer.addOderItem(orderedItemDTO, function (orderedItemSuccessResonse) {
                }, function (adapterErrorResponse) {
                    console.log("Error white subbmiting new Author Details in th database" + adapterErrorResponse.ErrorSummary());
                    res.writeHead(500);
                    res.write("unable add to add address ");
                    res.end(adapterErrorResponse.ErrorSummary());
                });
            }
            res.send(oderDataAccessLayerResponse.Value);
        }, function (adapterErrorResponse) {
            console.log("Error white subbmiting new Author Details in th database" + adapterErrorResponse.ErrorSummary());
            res.writeHead(500);
            res.write("unable add to add address ");
            res.end(adapterErrorResponse.ErrorSummary());
        });
    }, function (adapterErrorResponse) {
        console.log("Error white subbmiting new Author Details in th database" + adapterErrorResponse.ErrorSummary());
        res.writeHead(500);
        res.write("unable add to add address ");
        res.end(adapterErrorResponse.ErrorSummary());
    });
}
exports.placeOrder = placeOrder; //placeOrder
function updateCustomerOrder(req, res) {
}
exports.updateCustomerOrder = updateCustomerOrder; //updateCustomerOrder
function getOrderDetailsById(req, res) {
}
exports.getOrderDetailsById = getOrderDetailsById; //getCustomerOrderDetailsById
function deleteCartItem(req, res) {
    var cartId = req.query.cartId;
    cartDataAccessLayer.deleteCartItem(cartId, '18c25043-74d2-4808-8c37-fc426d481642', function (success) {
        res.send(success.Value);
    }, function (error) {
        res.writeHead(500);
        res.write("unable to get List of Books");
        res.end(error);
    });
}
exports.deleteCartItem = deleteCartItem; //deleteCartItem
function getCustomerOders(req, res) {
    orderDataAccessLayer.getCustomerOrderDetails(function (success) {
        res.send(success.Value);
    }, function (adapterErrorResponse) {
        console.log("Error while getting customer orders from data base" + adapterErrorResponse.ErrorSummary());
        res.writeHead(500);
        res.write("unable add customer orders Report");
        res.end(adapterErrorResponse.ErrorSummary());
    });
}
exports.getCustomerOders = getCustomerOders; //getCustomerOders
function addBookToCart(req, res) {
    var addToCart;
    addToCart = new cartDTO.CartDTO('', req.query.bookId, '18c25043-74d2-4808-8c37-fc426d481642');
    cartDataAccessLayer.addToCart(addToCart, function (success) {
        res.send(success.Value);
    }, function (error) {
        res.writeHead(500);
        res.write("unable to get List of Books");
        res.end(error);
    });
}
exports.addBookToCart = addBookToCart; //addBookToCart
function getCartDetails(req, res) {
    cartDataAccessLayer.getCustomersCartDetails('18c25043-74d2-4808-8c37-fc426d481642', function (success) {
        res.send(success.Value);
    }, function (error) {
        res.writeHead(500);
        res.write("unable to get List of Books");
        res.end(error);
    });
}
exports.getCartDetails = getCartDetails; //getCartDetails
function getcustomerOrderAdress(req, res) {
    var addressId = req.query.addressid;
    addressDataAccessLayer.getCustomerAdressById(addressId, function (addressDataAccessLayerSuccessResponse) {
        res.send(addressDataAccessLayerSuccessResponse.Value);
    }, function (adapterErrorResponse) {
        console.log("Error while getting customer orders from data base" + adapterErrorResponse.ErrorSummary());
        res.writeHead(500);
        res.write("unable add customer orders Report");
        res.end(adapterErrorResponse.ErrorSummary());
    });
}
exports.getcustomerOrderAdress = getcustomerOrderAdress; //getcustomerOrderAdress
function getOrdredItems(req, res) {
    var orderId = req.query.orderId;
    orderItemsDataAccessLayer.getCustomerOrderdItems(orderId, function (addressDataAccessLayerSuccessResponse) {
        res.send(addressDataAccessLayerSuccessResponse.Value);
    }, function (adapterErrorResponse) {
        console.log("Error while getting customer orders from data base" + adapterErrorResponse.ErrorSummary());
        res.writeHead(500);
        res.write("unable add customer orders Report");
        res.end(adapterErrorResponse.ErrorSummary());
    });
}
exports.getOrdredItems = getOrdredItems; //getcustomerOrderAdress
//# sourceMappingURL=orderController.js.map