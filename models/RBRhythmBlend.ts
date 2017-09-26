declare module RhythmBlendOld
{
    export interface RhythmBlend
    {
        Id: string;
        Name: string;
        Keywords: string;
        Tempo: number;
        Tracks: Track[];
        CreatedTime: Date;
        LastModifiedTime: Date;
    }

    export interface Track {
        Id: string;
        TrackName: string;
        Volume: number;
        PlayState: number;
        RhythmClips: Array<RhythmClip>;
        TrackIndex: number;
    }
    export interface RhythmClip {
        PresetId: string;
        SyllableId: number;
        Id: string;
        Name: string;
        Volume: number;
        LengthInBeats: number;
        ClipIndex: number;
        StartTimeInsideTrackInBeats: number;
        ClipPlayState: number;
    }
}