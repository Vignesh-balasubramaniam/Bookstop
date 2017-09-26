"use strict";
var VirtualInstruMent = (function () {
    function VirtualInstruMent(argId, argPresetName, argPresetKeywords, argDescription, argColor, argSoundFormatId, argIsTuned, argBasePitch, argShareLevel, argClientAssetTag, argVirtualInstrumentKeys) {
        this.Id = argId;
        this.Name = argPresetName;
        this.Keywords = argPresetKeywords;
        this.Description = argDescription;
        this.Color = argColor;
        this.SoundFormatId = argSoundFormatId;
        this.IsTuned = argIsTuned;
        this.BasePitch = argBasePitch;
        this.ShareLevel = argShareLevel;
        this.ClientAssetTag = argClientAssetTag;
        this.VirtualInstrumentKeys = argVirtualInstrumentKeys;
    }
    return VirtualInstruMent;
}());
exports.VirtualInstruMent = VirtualInstruMent;
var VirtualInstrumentKeyType = (function () {
    function VirtualInstrumentKeyType(argSoundId, argSyllableId, argInstrumentKeyNumber) {
        if (argInstrumentKeyNumber === void 0) { argInstrumentKeyNumber = 0; }
        this.SoundId = argSoundId;
        this.SyllableId = argSyllableId;
        this.InstrumentKeyNumber = argInstrumentKeyNumber;
    }
    return VirtualInstrumentKeyType;
}());
exports.VirtualInstrumentKeyType = VirtualInstrumentKeyType;
//# sourceMappingURL=virtualInstruments.js.map