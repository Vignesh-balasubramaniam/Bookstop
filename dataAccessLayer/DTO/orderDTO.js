"use strict";
var OrderDTO = (function () {
    function OrderDTO(argId, argnumberOfItems, argdelevryAddressId, argDeliveryPhoneNo, argDeliveryDate, argorderedDate, argTotalAmount, argModeOfPayement, argStatus) {
        this.id = argId;
        this.numberofitems = argnumberOfItems;
        this.deliveryaddressid = argdelevryAddressId;
        this.deliveryphoneno = argDeliveryPhoneNo;
        this.deliverydate = argDeliveryDate;
        this.ordereddate = argorderedDate;
        this.totalamount = argTotalAmount;
        this.modeofpaymet = argModeOfPayement;
        this.status = argStatus;
    }
    return OrderDTO;
}());
exports.OrderDTO = OrderDTO;
//# sourceMappingURL=OrderDTO.js.map