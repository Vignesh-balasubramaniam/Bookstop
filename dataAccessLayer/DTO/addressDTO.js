"use strict";
var AddressDTO = (function () {
    function AddressDTO(argId, argHouseno, argStreet, argArea, argCity, argState, argPinCode) {
        this.id = argId;
        this.housenumber = argHouseno;
        this.street = argStreet;
        this.area = argArea;
        this.city = argCity;
        this.state = argState;
        this.pincode = argPinCode;
    }
    return AddressDTO;
}());
exports.AddressDTO = AddressDTO;
//# sourceMappingURL=AddressDTO.js.map