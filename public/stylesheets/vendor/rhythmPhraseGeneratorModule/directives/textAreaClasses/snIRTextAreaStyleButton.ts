module SnRSPhraseGenerator{
    export class TextAreaStyleButton extends TextAreaButton {
        private buttonStyle: SnRSPhraseGenerator.TextAreaNodeStyle;
        private buttonState: string;

        constructor(argName: string, argButtonText: string,
            argButtonToolTipText: string, argButtonIcon: string, argStyle: SnRSPhraseGenerator.TextAreaNodeStyle, argButtonState: string) {
            super(argName, argButtonText, argButtonToolTipText, argButtonIcon);
            this.buttonStyle = argStyle;
            this.buttonState = argButtonState;
        }
        get textStyle(): SnRSPhraseGenerator.TextAreaNodeStyle {
            return this.buttonStyle;
        }

    }
}