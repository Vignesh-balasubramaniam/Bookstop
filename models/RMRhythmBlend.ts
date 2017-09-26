declare module RhythmBlendNew {

    export interface RhythmClip {
        PresetId: string;
        RhythmClipLineId: string;
        Id: string;
        Name: string;
        Volume: number;
        LengthInBeats: number;
        ClipIndex: number;
        StartTimeInsideTrackInBeats: number;
        ClipPlayState: number;
    }

    export interface Track {
        Id: string;
        TrackName: string;
        Volume: number;
        PlayState: number;
        RhythmClips: RhythmClip[];
        RbSoundClips:string[]
        TrackIndex: number;
    }

    export interface RhythmBlend {
        Id: string;
        Name: string;
        Keywords: string;
        Tempo: number;
        Tracks: Track[];
        ShareLevel: number;
        SSClientAssetTag: string;
    }

}

