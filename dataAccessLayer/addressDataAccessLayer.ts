var models = require('../sequelizer/models/index');
var uuid = require('node-uuid');
import response = require('../dataAccessLayer/dataAccessLayerResponse');
import DTO = require('./DTO/AddressDTO');

var sequelize = models.sequelize;
export function createAddressForOrder(argAddess: DTO.AddressDTO, successcallback, errorcallback) {
    try {
        sequelize.transaction({ autocomit: false }, function (t) {
            return models.address.create({
                id: uuid.v1(),
                housenumber: argAddess.housenumber,
                street: argAddess.street,
                area: argAddess.area,
                city: argAddess.city,
                state: argAddess.state,
                pincode:argAddess.pincode
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

export function getCustomerAdressById(argId: string, successcallback, errorcallback) {
    models.address.findOne({
        where: { id: argId }
    }).then(function (addressByID) {
        try {
            if (addressByID) {
                var customerOrderAddress: DTO.AddressDTO = new DTO.AddressDTO(addressByID.id, addressByID.housenumber, addressByID.street, addressByID.area, addressByID.city, addressByID.state, addressByID.pincode);
                var dalResponse: response.DataAccessLayerResponse<DTO.AddressDTO> = new response.DataAccessLayerResponse<DTO.AddressDTO>();
                dalResponse.SetSuccessResult(customerOrderAddress);
                successcallback(dalResponse);
            } else {
                var dalResponse: response.DataAccessLayerResponse<DTO.AddressDTO> = new response.DataAccessLayerResponse<DTO.AddressDTO>();
                dalResponse.SetSuccessResult(addressByID);
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
