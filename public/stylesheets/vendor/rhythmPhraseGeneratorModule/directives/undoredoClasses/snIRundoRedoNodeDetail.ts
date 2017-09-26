module SnRSPhraseGenerator {
    export class UndoRedoNodeDetail {
        _nodeStyle: SnRSPhraseGenerator.TextAreaNodeStyle;
        _nodeInnerText: string;
        _isfocusNode: boolean;
        _offsetInsideNode: number;

        constructor() {
            this._nodeStyle = SnRSPhraseGenerator.TextAreaNodeStyle.Normal;
            this._offsetInsideNode = -1;
            this._isfocusNode = false;
        }

        get nodeStyle(): SnRSPhraseGenerator.TextAreaNodeStyle {
            return this._nodeStyle;
        }
        set nodeStyle(argNodeStyle: SnRSPhraseGenerator.TextAreaNodeStyle) {
            this._nodeStyle = argNodeStyle;
        }

        get nodeInnerText(): string {
            return this._nodeInnerText;
        }
        set nodeInnerText(argNodeInnerText: string) {
            this._nodeInnerText = argNodeInnerText;
        }
        get isfocusNode(): boolean {
            return this._isfocusNode;
        }
        set isfocusNode(argIsfocusNode: boolean) {
            this._isfocusNode = argIsfocusNode;
        }

        get offsetInsideNode(): number {
            return this._offsetInsideNode;
        }
        set offsetInsideNode(argOffsetInsideNode: number) {
            this._offsetInsideNode = argOffsetInsideNode;
        }
    }
}