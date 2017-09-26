module SnRSPhraseGenerator {
    enum SelectionRangeType {
        nonMixed = 1,
        mixed = 2
    }

    //this class holds the information about nodes present in the snRhythmTextAREA element
   export class TextAreaAnalysisResult {
        private _selectionRange: SelectionRangeType;
        private _uiButtonClickedStyle: SnRSPhraseGenerator.TextAreaNodeStyle;
        private _listOfSnRhythmTextAreaNodeDetail: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisDetail>;
        private _isStartAndEndSelectionIsSameNode: boolean;
        private _isStartOffsetOfStartNodeIsEqualToZero: boolean;
        private _isEndOffsetOfEndNodeIsEqualToLength: boolean;
        private _startContainerIndex: number;
        private _endContainerIndex: number;

        constructor(argListOfSnRhythmTextAreaNodeDetail: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisDetail> = new Array<SnRSPhraseGenerator.TextAreaNodeAnalysisDetail>(),
            argUIButtonClickedStyle: SnRSPhraseGenerator.TextAreaNodeStyle = SnRSPhraseGenerator.TextAreaNodeStyle.Undefined,
            argSelectionRange: SelectionRangeType = SelectionRangeType.nonMixed
        ) {
            this._startContainerIndex = -1;
            this._endContainerIndex = -1;
            this._uiButtonClickedStyle = argUIButtonClickedStyle;
            this._selectionRange = argSelectionRange;
            this._listOfSnRhythmTextAreaNodeDetail = argListOfSnRhythmTextAreaNodeDetail;
            this._isStartAndEndSelectionIsSameNode = false;
            this._isEndOffsetOfEndNodeIsEqualToLength = false;
            this._isStartOffsetOfStartNodeIsEqualToZero = false;
        }

        get startContainerIndex(): number {
            return this._startContainerIndex;
        }
        set startContainerIndex(argStartContainerIndex: number) {
            this._startContainerIndex = argStartContainerIndex;
        }

        get endContainerIndex(): number {
            return this._endContainerIndex;
        }
        set endContainerIndex(argEndContainerIndex: number) {
            this._endContainerIndex = argEndContainerIndex;
        }

        get selectionRange(): SelectionRangeType {
            return this._selectionRange;
        }
        set selectionRange(argSelectionRange: SelectionRangeType) {
            this._selectionRange = argSelectionRange;
        }
        get listOfSnRhythmTextAreaNodeDetail(): Array<SnRSPhraseGenerator.TextAreaNodeAnalysisDetail> {
            return this._listOfSnRhythmTextAreaNodeDetail;
        }
        set listOfSnRhythmTextAreaNodeDetail(argListOfSnRhythmTextAreaNodeDetail: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisDetail>) {
            this._listOfSnRhythmTextAreaNodeDetail = argListOfSnRhythmTextAreaNodeDetail;
        }

        get uiButtonClickedStyle(): SnRSPhraseGenerator.TextAreaNodeStyle {
            return this._uiButtonClickedStyle;
        }
        set uiButtonClickedStyle(argUiButtonClickedStyle: SnRSPhraseGenerator.TextAreaNodeStyle) {
            this._uiButtonClickedStyle = argUiButtonClickedStyle;
        }

        get isStartAndEndSelectionIsSameNode(): boolean {
            return this._isStartAndEndSelectionIsSameNode;
        }
        set isStartAndEndSelectionIsSameNode(argIsStartAndEndSelectionIsSameNode: boolean) {
            this._isStartAndEndSelectionIsSameNode = argIsStartAndEndSelectionIsSameNode;
        }

        get isStartOffsetOfStartNodeIsEqualToZero(): boolean {
            return this._isStartOffsetOfStartNodeIsEqualToZero;
        }
        set isStartOffsetOfStartNodeIsEqualToZero(argIsStartOffsetOfStartNodeIsEqualToZero: boolean) {
            this._isStartOffsetOfStartNodeIsEqualToZero = argIsStartOffsetOfStartNodeIsEqualToZero;
        }

        get isEndOffsetOfEndNodeIsEqualToLength(): boolean {
            return this._isEndOffsetOfEndNodeIsEqualToLength;
        }
        set isEndOffsetOfEndNodeIsEqualToLength(isEndOffsetOfEndNodeIsEqualToLength: boolean) {
            this._isEndOffsetOfEndNodeIsEqualToLength = isEndOffsetOfEndNodeIsEqualToLength;
        }

        clean(): TextAreaAnalysisResult {
            var cleanedAnalysisResult = new TextAreaAnalysisResult();
            var indexInTheCleanedList = 0;
            for (var i = 0; i < this.listOfSnRhythmTextAreaNodeDetail.length; i++) {
                var currentItemInList = this.listOfSnRhythmTextAreaNodeDetail[i];
                if (currentItemInList.innerText.length != 0) {
                    cleanedAnalysisResult.listOfSnRhythmTextAreaNodeDetail.push(currentItemInList);
                    if (currentItemInList.isStartNodeOfSelection == true) {
                        cleanedAnalysisResult.startContainerIndex = indexInTheCleanedList;
                    }
                    if (currentItemInList.isEndNodeOfSelection == true) {
                        cleanedAnalysisResult.endContainerIndex = indexInTheCleanedList;
                    }
                    indexInTheCleanedList++;
                }
                else {
                    //<br> and empty nodes will get ignored here.
                }
            }

            cleanedAnalysisResult.isEndOffsetOfEndNodeIsEqualToLength = this.isEndOffsetOfEndNodeIsEqualToLength;
            cleanedAnalysisResult.isStartAndEndSelectionIsSameNode = this.isStartAndEndSelectionIsSameNode;
            cleanedAnalysisResult.isStartOffsetOfStartNodeIsEqualToZero = this.isStartOffsetOfStartNodeIsEqualToZero;
            cleanedAnalysisResult.selectionRange = this.selectionRange;
            cleanedAnalysisResult.uiButtonClickedStyle = this.uiButtonClickedStyle;

            return cleanedAnalysisResult;
        }
    }

}