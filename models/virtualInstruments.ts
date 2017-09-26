export class VirtualInstruMent {

    Id: string;
    Name: string;
    Keywords: string;
    Description: string;
    Color: string;
    SoundFormatId: string;
    IsTuned: boolean;
    BasePitch: number;
    ShareLevel: boolean;
    ClientAssetTag: string;
    VirtualInstrumentKeys: Array<VirtualInstrumentKeyType>;



    constructor(argId: string, argPresetName: string,
        argPresetKeywords: string, argDescription: string, argColor: string, argSoundFormatId: string, argIsTuned: boolean,
        argBasePitch: number, argShareLevel: boolean, argClientAssetTag: string, argVirtualInstrumentKeys: Array<VirtualInstrumentKeyType>) {


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


}

export class VirtualInstrumentKeyType {
    SoundId: string;
    SyllableId: number;
    InstrumentKeyNumber: number;
    constructor(argSoundId: string, argSyllableId: number, argInstrumentKeyNumber: number = 0) {
        this.SoundId = argSoundId;
        this.SyllableId = argSyllableId;
        this.InstrumentKeyNumber = argInstrumentKeyNumber;

    }
}