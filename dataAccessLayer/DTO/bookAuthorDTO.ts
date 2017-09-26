export class BookAuthorsDTO {
    id: string;

    bookId: string;
    authorId: string;
    constructor(argId: string, argBookId: string, argAuthorId: string) {
        this.id = argId;
        this.bookId = argBookId;
        this.authorId = argAuthorId;
    }
}
