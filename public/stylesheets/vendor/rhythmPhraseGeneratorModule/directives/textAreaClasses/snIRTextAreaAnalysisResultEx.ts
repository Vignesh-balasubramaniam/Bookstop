module SnRSPhraseGenerator {

    export class TextAreaAnalysisResultEx {
        _rhythmNodesList: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail>;
        _selectedNodesClassification: SelectedNodesClassification;
        _startContainerIndex: number;
        _endContainerIndex: number;

        constructor(argRhythmNodesList: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail>,
            argStartContainerIndex: number,
            argEndContainerIndex: number) {
            this._rhythmNodesList = argRhythmNodesList;
            this._startContainerIndex = argStartContainerIndex;
            this._endContainerIndex = argEndContainerIndex;
            this._selectedNodesClassification = SelectedNodesClassification.Unknown;
        }

        fillClassification() {
            if (this._startContainerIndex == this._endContainerIndex) {
                this._selectedNodesClassification = SelectedNodesClassification.NonMixed;
                return;
            }

            var nodeTextStyle = this._rhythmNodesList[this._startContainerIndex].nodeStyle;
            for (var i = this._startContainerIndex + 1; i <= this._endContainerIndex; i++) {
                var nextNodeTextStyle = this._rhythmNodesList[i].nodeStyle;
                if (nextNodeTextStyle != nodeTextStyle) {
                    this._selectedNodesClassification = SelectedNodesClassification.Mixed;
                    return;
                }
            }
            this._selectedNodesClassification = SelectedNodesClassification.NonMixed;
        }

        applyStyleToSelectedNodes(argUserClickStyle: SnRSPhraseGenerator.TextAreaNodeStyle) {
            var listOfRhythmNode: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail> = this._rhythmNodesList;
            var newNodeStyleToBeApplied: SnRSPhraseGenerator.TextAreaNodeStyle =
                this._rhythmNodesList[this._startContainerIndex]._nodeStyle;

            if (this._selectedNodesClassification == SelectedNodesClassification.NonMixed) {
                switch (newNodeStyleToBeApplied) {
                    case SnRSPhraseGenerator.TextAreaNodeStyle.Normal:
                        {
                            newNodeStyleToBeApplied = argUserClickStyle;
                            break;
                        }
                    case SnRSPhraseGenerator.TextAreaNodeStyle.Underline:

                        {
                            if (argUserClickStyle == SnRSPhraseGenerator.TextAreaNodeStyle.Underline) {
                                newNodeStyleToBeApplied = SnRSPhraseGenerator.TextAreaNodeStyle.Normal;
                            }
                            else {
                                newNodeStyleToBeApplied = argUserClickStyle;
                            }
                            break;
                        }
                    case SnRSPhraseGenerator.TextAreaNodeStyle.DoubleUnderline:

                        {
                            if (argUserClickStyle == SnRSPhraseGenerator.TextAreaNodeStyle.DoubleUnderline) {
                                newNodeStyleToBeApplied = SnRSPhraseGenerator.TextAreaNodeStyle.Normal;
                            }
                            else {
                                newNodeStyleToBeApplied = argUserClickStyle;
                            }
                            break;
                        }
                }
            }
            if (this._selectedNodesClassification == SelectedNodesClassification.Mixed) {
                newNodeStyleToBeApplied = argUserClickStyle;
            }

            for (var i = this._startContainerIndex;
                i <= (this._endContainerIndex); i++) {
                this._rhythmNodesList[i]._nodeStyle = newNodeStyleToBeApplied;
            }
        }
    }


    enum SelectedNodesClassification {
        Unknown = 0,
        Mixed = 1,
        NonMixed = 2
    }
}