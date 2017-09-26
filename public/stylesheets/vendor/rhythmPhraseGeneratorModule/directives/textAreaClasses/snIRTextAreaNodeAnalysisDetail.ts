module SnRSPhraseGenerator {
    export class TextAreaNodeAnalysisDetail {
        private _nodeStyle: SnRSPhraseGenerator.TextAreaNodeStyle;
        private _innerText: string;
        private _isStartNodeOfSelection: boolean;
        private _isEndNodeOfSelection: boolean;
        private _offsetOfStartNode: number;
        private _offsetOfEndNode: number;


        constructor() {
            this._innerText = "";
            this._nodeStyle = SnRSPhraseGenerator.TextAreaNodeStyle.Undefined;
            this._isStartNodeOfSelection = false;
            this._offsetOfStartNode = 0;
            this._isEndNodeOfSelection = false;
            this._offsetOfEndNode = 0;
        }

        get nodeStyle(): SnRSPhraseGenerator.TextAreaNodeStyle {
            return this._nodeStyle;
        }
        set nodeStyle(argNodeStyle: SnRSPhraseGenerator.TextAreaNodeStyle) {
            this._nodeStyle = argNodeStyle;
        }
        get innerText(): string {
            return this._innerText
        }
        set innerText(argInnerText: string) {
            this._innerText = argInnerText;
        }

        get isStartNodeOfSelection(): boolean {
            return this._isStartNodeOfSelection;
        }
        set isStartNodeOfSelection(argIsStartNodeOfSelection: boolean) {
            this._isStartNodeOfSelection = argIsStartNodeOfSelection;
        }

        get isEndNodeOfSelection(): boolean {
            return this._isEndNodeOfSelection;
        }
        set isEndNodeOfSelection(argIsEndNodeOfSelection: boolean) {
            this._isEndNodeOfSelection = argIsEndNodeOfSelection;
        }

        get offsetOfStartNode(): number {
            return this._offsetOfStartNode;
        }
        set offsetOfStartNode(argOffsetOfStartNode: number) {
            this._offsetOfStartNode = argOffsetOfStartNode;
        }
        get offsetOfEndNode(): number {
            return this._offsetOfEndNode;
        }
        set offsetOfEndNode(argOffsetOfEndNode: number) {
            this._offsetOfEndNode = argOffsetOfEndNode;
        }

    }//export class textAreaNodeAnalysisDetail {
}//module SnInstaRhythm {