module SnRSPhraseGenerator {
    export class TextAreaButton {
        _id: string;
        _name: string;
        _buttonText: string;
        _buttonToolTipText: string;
        _buttonIcon: string;

        constructor(argName: string, argButtonText: string,
            argButtonToolTipText: string, argButtonIcon: string) {
            this._name = argName;
            this._buttonText = argButtonText;
            this._buttonToolTipText = argButtonToolTipText;
            this._buttonIcon = argButtonIcon;
        }
    }
}