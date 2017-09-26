"use strict";
var OrderedItemsDTO = (function () {
    function OrderedItemsDTO(argId, argCustomerId, argOrderId, argBookId, argquantity) {
        this.id = argId;
        this.customerid = argCustomerId;
        this.orderid = argOrderId;
        this.bookid = argBookId;
        this.quantity = argquantity;
    }
    return OrderedItemsDTO;
}());
exports.OrderedItemsDTO = OrderedItemsDTO;
//# sourceMappingURL=orderedItemDTO.js.map