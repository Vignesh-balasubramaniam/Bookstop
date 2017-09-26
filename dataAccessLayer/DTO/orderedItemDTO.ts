export class OrderedItemsDTO {
    id: string;
    customerid: string;
    orderid: string;
    bookid: string;
    quantity: number;
    constructor(argId: string, argCustomerId: string, argOrderId: string, argBookId: string,argquantity:number) {
        this.id = argId;
        this.customerid = argCustomerId;
        this.orderid = argOrderId;
        this.bookid = argBookId;
        this.quantity = argquantity;
    }
}