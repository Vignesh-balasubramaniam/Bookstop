"use strict";
var UserAuthoredInstrumentType = (function () {
    function UserAuthoredInstrumentType(arguserAuthoredInstrumentHeader, argKeys) {
        this.Header = arguserAuthoredInstrumentHeader;
        this.Keys = argKeys;
    }
    return UserAuthoredInstrumentType;
}());
exports.UserAuthoredInstrumentType = UserAuthoredInstrumentType;
var userAuthoredInstrumentHeaderType = (function () {
    function userAuthoredInstrumentHeaderType(argId, argName, argKeywords, argSoundFormatId, argShareLevel, argAssettag) {
        this.Id = argId;
        this.Name = argName;
        this.Keywords = argKeywords;
        this.SoundFormatId = argSoundFormatId;
        this.ShareLevel = argShareLevel;
        this.AssetTag = argAssettag;
    }
    return userAuthoredInstrumentHeaderType;
}());
exports.userAuthoredInstrumentHeaderType = userAuthoredInstrumentHeaderType;
var UploadedInstrumentKey = (function () {
    function UploadedInstrumentKey(argInstrumentKeyNumber, argSoundId) {
        this.InstrumentKeyNumber = argInstrumentKeyNumber;
        this.InstrumentKeySoundId = argSoundId;
    }
    return UploadedInstrumentKey;
}());
exports.UploadedInstrumentKey = UploadedInstrumentKey;
//# sourceMappingURL=userAuthoresInstrument.js.map