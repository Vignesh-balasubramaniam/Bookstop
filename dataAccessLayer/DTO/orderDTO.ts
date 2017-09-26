export class OrderDTO {
    id: string;
    numberofitems: number;
    deliveryaddressid: string;
    deliveryphoneno: number;
    deliverydate: string;
    ordereddate: string;
    totalamount: number;
    modeofpaymet: number;
    status: number;
    constructor(argId: string, argnumberOfItems: number, argdelevryAddressId: string, argDeliveryPhoneNo: number, argDeliveryDate: string,
        argorderedDate: string, argTotalAmount: number, argModeOfPayement: number,argStatus:number) {
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
}