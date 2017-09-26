export module multiRBJGModelsApp {

    export class RhythmClip {
        PresetId: string;
        RhythmClipLineId: string;
        Id: string;
        Name: string;
        Volume: number;
        LengthInBeats: number;
        ClipIndex: number;
        StartTimeInsideTrackInBeats: number;
        ClipPlayState: number;
        constructor(argPresetId: string, argRhythmClipLineId: string, argId: string, argName: string, argVolume: number,
            argLenthsInBeats: number, argClipIndex: number, argStartTimeInsideTrackInBeats: number, argClipPlayState: number) {

            this.PresetId = argPresetId;
            this.RhythmClipLineId = argRhythmClipLineId;
            this.Id = argId;
            this.Name = argName;
            this.Volume = argVolume;
            this.LengthInBeats = argLenthsInBeats;
            this.ClipIndex = argClipIndex;
            this.StartTimeInsideTrackInBeats = argStartTimeInsideTrackInBeats;
            this.ClipPlayState = argClipPlayState;

        }
    }

    export class Track {
        Id: string;
        TrackName: string;
        Volume: number;
        PlayState: number;
        RhythmClips: Array<RhythmClip>;
        TrackIndex: number;

        constructor(argId: string, argTrackName: string, argVolume: number, argPlayState: number,
            argRhythmClips: Array<RhythmClip>, argTrackIndex: number) {
            this.Id = argId;
            this.TrackName = argTrackName;
            this.Volume = argVolume;
            this.PlayState = argPlayState;
            this.RhythmClips = argRhythmClips;
            this.TrackIndex = argTrackIndex;
        }
    }

    export class RhythmBlend {
        Id: string;
        Name: string;
        Keywords: string;
        Tempo: number;
        Tracks: Array<Track>;
        ShareLevel: number;
        SSClientAssetTag: string;

        constructor(argId: string, argname: string, argKeywords: string, argTempo: number, argTracks: Array<Track>, argShareLevel: number, argSClientAssetTag: string) {
            this.Id = argId;
            this.Name = argname;
            this.Keywords = argKeywords;
            this.Tempo = argTempo;
            this.Tracks = argTracks;
            this.ShareLevel = argShareLevel;
            this.SSClientAssetTag = argSClientAssetTag;



        }
    }

}

