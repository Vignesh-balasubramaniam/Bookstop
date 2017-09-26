export class UserLoginDTO {
    id: string;
    user_id: string;
    login_time: Date;
    session_id: string;
    isSessionValid: boolean;
    constructor(argId: string, argUserId: string, argSessionId: string, argSessionValid: boolean, argLoginTime: Date = null) {
        this.id = argId;
        this.user_id = argUserId;
        this.login_time = argLoginTime;
        this.session_id = argSessionId;
        this.isSessionValid = argSessionValid;
    }
}