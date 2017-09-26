module SnRSPhraseGenerator {
    export class UndoRedoManager {
        private _undoCommands: Array<ICommand>;
        private _redoCommands: Array<ICommand>;
        private _element: HTMLElement;

        constructor(argElement: HTMLElement) {
            this._undoCommands = new Array<ICommand>();
            this._redoCommands = new Array<ICommand>();
            this._element = argElement;
        }

        undo() {
            if (this._undoCommands.length != 0) {
                var command: ICommand = this._undoCommands.pop();
                command.unExecute(this._element );
                this._redoCommands.push(command);
            }
        }

        redo() {
            if (this._redoCommands.length != 0) {
                var command: ICommand = this._redoCommands.pop();
                command.execute(this._element );
                this._undoCommands.push(command);
            }
        }

        public insertTextAreaSyllableChangeCommand(argOldLstTextAreaNodeDetail: Array<SnRSPhraseGenerator.UndoRedoNodeDetail>, argNewLstTextAreaNodeDetail: Array<SnRSPhraseGenerator.UndoRedoNodeDetail>) {
            var cmd: ICommand = new SnRSPhraseGenerator.TextAreaSyllableChangeCommand(argOldLstTextAreaNodeDetail, argNewLstTextAreaNodeDetail);
            this._undoCommands.push(cmd);
            this._redoCommands.splice(0, this._redoCommands.length);
        }
    }
}