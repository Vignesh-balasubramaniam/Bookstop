module SnRSPhraseGenerator {
    export class TextAreaNodeAnalysisResultExDetail {
       
        _nodeStyle: SnRSPhraseGenerator.TextAreaNodeStyle;
        _nodeInnerText: string;
        constructor(argNodeStyle: SnRSPhraseGenerator.TextAreaNodeStyle, argNodeInnerText: string) {
            this._nodeStyle = argNodeStyle;
            this._nodeInnerText = argNodeInnerText;
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
    }
    
}