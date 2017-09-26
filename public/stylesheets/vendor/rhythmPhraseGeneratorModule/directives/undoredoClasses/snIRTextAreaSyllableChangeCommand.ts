module SnRSPhraseGenerator {
    export class TextAreaSyllableChangeCommand implements SnRSPhraseGenerator .ICommand {
        name(): string {
            return "textAreaSyllableChangeCommand";
        }

        private _newValue: Array<SnRSPhraseGenerator .UndoRedoNodeDetail>;
        get newValue(): Array<SnRSPhraseGenerator .UndoRedoNodeDetail> {
            return this._newValue;
        }
        private _oldValue: Array<SnRSPhraseGenerator .UndoRedoNodeDetail>;
        get oldVolume(): Array<SnRSPhraseGenerator .UndoRedoNodeDetail> {
            return this._oldValue;
        }

        constructor(
            argNewValue: Array<SnRSPhraseGenerator.UndoRedoNodeDetail>, argOldValue: Array<SnRSPhraseGenerator.UndoRedoNodeDetail>) {
            this._newValue = argNewValue;
            this._oldValue = argOldValue;

        }
        execute(argElement: HTMLElement) {
            //apply new value
            new SnRSPhraseGenerator.DomBroker(argElement).createHTMLNodeListAndReplaceTextAreaAfterUndoRedo(this.oldVolume);
        }
        unExecute(argElement: HTMLElement) {
            //apply old value
            new SnRSPhraseGenerator.DomBroker(argElement).createHTMLNodeListAndReplaceTextAreaAfterUndoRedo(this.newValue);
        }
    }
}