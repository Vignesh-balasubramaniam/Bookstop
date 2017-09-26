import express = require('express');
import dataAccessLayerModule = require('../dataAccessLayer/dataAccessLayerResponse');
import orderDataAccessLayer = require('../dataAccessLayer/orderAccessLayer');
import customerDataAccessLayer = require('../dataAccessLayer/customerDataAccessLayer');
import orderItemsDataAccessLayer = require('../dataAccessLayer/orderItemsDataAccessLayer');
import addressDataAccessLayer = require('../dataAccessLayer/addressdataAccessLayer');
import cartDataAccessLayer = require('../dataAccessLayer/cartDataAccessLayer');

import orderDTO = require('../dataAccessLayer/DTO/orderDTO');
import customerDTO = require('../dataAccessLayer/DTO/customerDTO');
import orderedItemsDTO = require('../dataAccessLayer/DTO/orderedItemDTO')
import cartDTO = require('../dataAccessLayer/DTO/cartDTO');
import addressDTO = require('../dataAccessLayer/DTO/AddressDTO');

export function placeOrder(req: express.Request, res: express.Response) {
    var orderDetails = req.body;
    var address: addressDTO.AddressDTO = new addressDTO.AddressDTO('', orderDetails.address.houseno, orderDetails.address.street, orderDetails.address.area, orderDetails.address.city, orderDetails.address.state, orderDetails.address.pino);
    addressDataAccessLayer.createAddressForOrder(address, (addressDataAccessLayerResponse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
        var orderdTO: orderDTO.OrderDTO = new orderDTO.OrderDTO('', orderDetails.items.length, addressDataAccessLayerResponse.Value, orderDetails.deliveryPhoneNumber,
            orderDetails.deliveryDate, orderDetails.ordereddate, orderDetails.totalAmount, orderDetails.modeofPayment,0);

    
            orderDataAccessLayer.addNewOrderDetails(orderdTO, (oderDataAccessLayerResponse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
                for (let i = 0; i < orderDetails.items.length; i++) {
                    var orderedItemDTO: orderedItemsDTO.OrderedItemsDTO = new orderedItemsDTO.OrderedItemsDTO('', '18c25043-74d2-4808-8c37-fc426d481642', oderDataAccessLayerResponse.Value, orderDetails.items[i].id, orderDetails.items[i].quantity);
                    orderItemsDataAccessLayer.addOderItem(orderedItemDTO, (orderedItemSuccessResonse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {

                    }, (adapterErrorResponse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
                        console.log("Error white subbmiting new Author Details in th database" + adapterErrorResponse.ErrorSummary());
                        res.writeHead(500);
                        res.write("unable add to add address ");
                        res.end(adapterErrorResponse.ErrorSummary());
                    })
                }
                res.send(oderDataAccessLayerResponse.Value);
        },
            (adapterErrorResponse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
                console.log("Error white subbmiting new Author Details in th database" + adapterErrorResponse.ErrorSummary());
                res.writeHead(500);
                res.write("unable add to add address ");
                res.end(adapterErrorResponse.ErrorSummary());
            })
    }, (adapterErrorResponse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
        console.log("Error white subbmiting new Author Details in th database" + adapterErrorResponse.ErrorSummary());
        res.writeHead(500);
        res.write("unable add to add address ");
        res.end(adapterErrorResponse.ErrorSummary());
    })

}//placeOrder


export function updateCustomerOrder(req: express.Request, res: express.Response) {

}//updateCustomerOrder

export function getOrderDetailsById(req: express.Request, res: express.Response) {


}//getCustomerOrderDetailsById


export function deleteCartItem(req: express.Request, res: express.Response) {
    var cartId = req.query.cartId;
    cartDataAccessLayer.deleteCartItem(cartId, '18c25043-74d2-4808-8c37-fc426d481642', (success: dataAccessLayerModule.DataAccessLayerResponse<Array<cartDTO.CartDTO>>) => {
        res.send(success.Value);
    }, (error) => {
        res.writeHead(500);
        res.write("unable to get List of Books");
        res.end(error);
        })
}//deleteCartItem


export function getCustomerOders(req: express.Request, res: express.Response) {
    orderDataAccessLayer.getCustomerOrderDetails((success: dataAccessLayerModule.DataAccessLayerResponse<Array<orderDTO.OrderDTO>>) => {
        res.send(success.Value);
    }, (adapterErrorResponse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
        console.log("Error while getting customer orders from data base" + adapterErrorResponse.ErrorSummary());
        res.writeHead(500);
        res.write("unable add customer orders Report");
        res.end(adapterErrorResponse.ErrorSummary());
    })
}//getCustomerOders


export function addBookToCart(req: express.Request, res: express.Response) {
    var addToCart: cartDTO.CartDTO;
    addToCart = new cartDTO.CartDTO('', req.query.bookId, '18c25043-74d2-4808-8c37-fc426d481642');
    cartDataAccessLayer.addToCart(addToCart, (success: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
        res.send(success.Value);
    }, (error) => {
        res.writeHead(500);
        res.write("unable to get List of Books");
        res.end(error);
        })
}//addBookToCart



export function getCartDetails(req: express.Request, res: express.Response) {
    cartDataAccessLayer.getCustomersCartDetails('18c25043-74d2-4808-8c37-fc426d481642', (success: dataAccessLayerModule.DataAccessLayerResponse<Array<cartDTO.CartDTO>>) => {
        res.send(success.Value);
    }, (error) => {
        res.writeHead(500);
        res.write("unable to get List of Books");
        res.end(error);
    })
}//getCartDetails


export function getcustomerOrderAdress(req: express.Request, res: express.Response) {
    var addressId = req.query.addressid;
    addressDataAccessLayer.getCustomerAdressById(addressId, (addressDataAccessLayerSuccessResponse: dataAccessLayerModule.DataAccessLayerResponse<Array<addressDTO.AddressDTO>>) => {
        res.send(addressDataAccessLayerSuccessResponse.Value);
    }, (adapterErrorResponse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
        console.log("Error while getting customer orders from data base" + adapterErrorResponse.ErrorSummary());
        res.writeHead(500);
        res.write("unable add customer orders Report");
        res.end(adapterErrorResponse.ErrorSummary());
    })

}//getcustomerOrderAdress



export function getOrdredItems(req: express.Request, res: express.Response) {
    var orderId = req.query.orderId;
    orderItemsDataAccessLayer.getCustomerOrderdItems(orderId, (addressDataAccessLayerSuccessResponse: dataAccessLayerModule.DataAccessLayerResponse<Array<addressDTO.AddressDTO>>) => {
        res.send(addressDataAccessLayerSuccessResponse.Value);
    }, (adapterErrorResponse: dataAccessLayerModule.DataAccessLayerResponse<string>) => {
        console.log("Error while getting customer orders from data base" + adapterErrorResponse.ErrorSummary());
        res.writeHead(500);
        res.write("unable add customer orders Report");
        res.end(adapterErrorResponse.ErrorSummary());
    })

}//getcustomerOrderAdress