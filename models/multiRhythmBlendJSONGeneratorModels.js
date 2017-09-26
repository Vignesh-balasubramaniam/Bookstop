"use strict";
var multiRBJGModelsApp;
(function (multiRBJGModelsApp) {
    var RhythmClip = (function () {
        function RhythmClip(argPresetId, argRhythmClipLineId, argId, argName, argVolume, argLenthsInBeats, argClipIndex, argStartTimeInsideTrackInBeats, argClipPlayState) {
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
        return RhythmClip;
    }());
    multiRBJGModelsApp.RhythmClip = RhythmClip;
    var Track = (function () {
        function Track(argId, argTrackName, argVolume, argPlayState, argRhythmClips, argTrackIndex) {
            this.Id = argId;
            this.TrackName = argTrackName;
            this.Volume = argVolume;
            this.PlayState = argPlayState;
            this.RhythmClips = argRhythmClips;
            this.TrackIndex = argTrackIndex;
        }
        return Track;
    }());
    multiRBJGModelsApp.Track = Track;
    var RhythmBlend = (function () {
        function RhythmBlend(argId, argname, argKeywords, argTempo, argTracks, argShareLevel, argSClientAssetTag) {
            this.Id = argId;
            this.Name = argname;
            this.Keywords = argKeywords;
            this.Tempo = argTempo;
            this.Tracks = argTracks;
            this.ShareLevel = argShareLevel;
            this.SSClientAssetTag = argSClientAssetTag;
        }
        return RhythmBlend;
    }());
    multiRBJGModelsApp.RhythmBlend = RhythmBlend;
})(multiRBJGModelsApp = exports.multiRBJGModelsApp || (exports.multiRBJGModelsApp = {}));
//# sourceMappingURL=multiRhythmBlendJSONGeneratorModels.js.map