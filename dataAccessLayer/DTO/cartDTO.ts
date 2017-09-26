export class CartDTO {
    id: string;
    bookid: string;
    customerid: string;
    constructor(argId: string, argBookId: string, argCustomerId: string) {
        this.id = argId;
        this.bookid = argBookId;
        this.customerid = argCustomerId;
    }
}