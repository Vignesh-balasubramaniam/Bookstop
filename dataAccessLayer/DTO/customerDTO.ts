export class CustomerDTO{
    id: string;
    username: string;
    password: string;
    email: string;
    usercomment: string;
    constructor(argId: string, argUsername: string, argPassword: string, argEmail: string, argUserComment: string) {
        this.id = argId;
        this.username = argUsername;
        this.email = argEmail;
        this.password = argPassword;
        this.usercomment = argUserComment;
    }
}