"use strict";
var UserLoginDTO = (function () {
    function UserLoginDTO(argId, argUserId, argSessionId, argSessionValid, argLoginTime) {
        if (argLoginTime === void 0) { argLoginTime = null; }
        this.id = argId;
        this.user_id = argUserId;
        this.login_time = argLoginTime;
        this.session_id = argSessionId;
        this.isSessionValid = argSessionValid;
    }
    return UserLoginDTO;
}());
exports.UserLoginDTO = UserLoginDTO;
//# sourceMappingURL=userActivityDTO.js.map