"use strict";
var CustomerDTO = (function () {
    function CustomerDTO(argId, argUsername, argPassword, argEmail, argUserComment) {
        this.id = argId;
        this.username = argUsername;
        this.email = argEmail;
        this.password = argPassword;
        this.usercomment = argUserComment;
    }
    return CustomerDTO;
}());
exports.CustomerDTO = CustomerDTO;
//# sourceMappingURL=CustomerDTO.js.map