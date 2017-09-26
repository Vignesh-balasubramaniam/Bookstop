export class AuthorsDTO {
    id: string;

    firstname: string;
    lastname: string;
    constructor(argId: string, argfirstname: string,argLastName:string) {
        this.id = argId;
        this.firstname = argfirstname;
        this.lastname = argLastName;
    }
}
