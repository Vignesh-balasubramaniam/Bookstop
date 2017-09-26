export class UserAuthoredInstrumentType {
    Header: userAuthoredInstrumentHeaderType;
    Keys: Array<UploadedInstrumentKey>;


    constructor(arguserAuthoredInstrumentHeader: userAuthoredInstrumentHeaderType, argKeys: Array<UploadedInstrumentKey>) {
        this.Header = arguserAuthoredInstrumentHeader;
        this.Keys = argKeys;

    }
}
export class userAuthoredInstrumentHeaderType {
    Id: string;
    Name: string;
    Keywords: string;
    SoundFormatId: string;
    ShareLevel: boolean;
    AssetTag: string;

    constructor(argId: string, argName: string, argKeywords: string, argSoundFormatId: string, argShareLevel: boolean, argAssettag: string) {
        this.Id = argId;
        this.Name = argName;
        this.Keywords = argKeywords;
        this.SoundFormatId = argSoundFormatId;
        this.ShareLevel = argShareLevel;
        this.AssetTag = argAssettag;

    }

}

export class UploadedInstrumentKey {
    InstrumentKeyNumber: number;
    InstrumentKeySoundId: string;

    constructor(argInstrumentKeyNumber: number, argSoundId: string) {
        this.InstrumentKeyNumber = argInstrumentKeyNumber;
        this.InstrumentKeySoundId = argSoundId;

    }
}