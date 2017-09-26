"use strict";
var BooksDTO = (function () {
    function BooksDTO(argId, argisbnnumber, argName, argPublication, argSubject, argDescription, argAuthors, argPrice) {
        this.id = argId;
        this.isbn = argisbnnumber;
        this.name = argName;
        this.publication = argPublication;
        this.subject = argSubject;
        this.description = argDescription;
        this.authors = argAuthors;
        this.price = argPrice;
    }
    return BooksDTO;
}());
exports.BooksDTO = BooksDTO;
//# sourceMappingURL=BooksDTO.js.map