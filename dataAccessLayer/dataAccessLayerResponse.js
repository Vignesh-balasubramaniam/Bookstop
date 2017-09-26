"use strict";
var DataAccessLayerResponse = (function () {
    function DataAccessLayerResponse() {
    }
    DataAccessLayerResponse.prototype.IsSuccess = function () {
        if ((this.ErrorDetails.length == 1) && (this.ErrorDetails[0].Number == 0)) {
            return true;
        }
        else
            return false;
    };
    DataAccessLayerResponse.prototype.SetSuccessResult = function (successValue) {
        this.Value = successValue;
        this.ErrorDetails = new Array();
        this.ErrorDetails.push(new ErrorDescription("Success", 0));
    };
    DataAccessLayerResponse.prototype.SetSuccessResultv2 = function (successValue, message) {
        this.Value = successValue;
        this.ErrorDetails = new Array();
        this.ErrorDetails.push(new ErrorDescription(message, 0));
    };
    DataAccessLayerResponse.prototype.AddErrorDescription = function (errorNumber, errorMessage, errorReason) {
        if (errorReason === void 0) { errorReason = null; }
        if (this.ErrorDetails == null) {
            //if (!string.IsNullOrEmpty(errorReason)) {
            if (!errorReason) {
                this.ErrorDetails = new Array();
                this.ErrorDetails.push(new ErrorDescription(errorMessage + "Reason :" + errorReason, errorNumber));
            }
            else {
                this.ErrorDetails = new Array();
                this.ErrorDetails.push(new ErrorDescription(errorMessage, errorNumber));
            }
        }
        else {
            if (!errorReason) {
                this.ErrorDetails.push(new ErrorDescription(errorMessage + "Reason :" + errorReason, errorNumber));
            }
            else {
                this.ErrorDetails.push(new ErrorDescription(errorMessage, errorNumber));
            }
        }
    };
    DataAccessLayerResponse.prototype.ErrorSummary = function () {
        {
            var result = '';
            for (var ed in this.ErrorDetails) {
                result = result + this.ErrorDetails[ed].Description;
            }
            return result;
        }
    };
    return DataAccessLayerResponse;
}());
exports.DataAccessLayerResponse = DataAccessLayerResponse;
var ErrorDescription = (function () {
    function ErrorDescription(argDescription, argNumber) {
        this.Description = argDescription;
        this.Number = argNumber;
    }
    ErrorDescription.prototype.GenerateMessage = function (param) {
        return this.Description + " " + param;
    };
    return ErrorDescription;
}());
exports.ErrorDescription = ErrorDescription;
//# sourceMappingURL=dataAccessLayerResponse.js.map