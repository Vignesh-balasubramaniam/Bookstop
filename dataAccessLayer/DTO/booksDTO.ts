export class BooksDTO {
    id: string;
    isbn: string;
    name: string;
    publication: string;
    subject: string;
    description: string;
    authors: Array<string>;
    price: number;
    constructor(argId: string,argisbnnumber: string,argName:string,argPublication:string,argSubject:string,argDescription:string,argAuthors:Array<string>,argPrice:number) {
        this.id = argId;
        this.isbn = argisbnnumber;
        this.name = argName;
        this.publication = argPublication;
        this.subject = argSubject;
        this.description = argDescription;
        this.authors = argAuthors;
        this.price = argPrice;

    }
}
