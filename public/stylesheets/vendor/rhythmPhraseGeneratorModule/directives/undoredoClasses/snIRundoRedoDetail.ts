module SnRSPhraseGenerator {
    export class UndoRedoDetail {

        _listOfUndoRedoNodesDetail: Array<SnRSPhraseGenerator.UndoRedoNodeDetail>;

        constructor() {
            this._listOfUndoRedoNodesDetail = new Array<SnRSPhraseGenerator.UndoRedoNodeDetail>();
        }

        get listOfUndoRedoNodesDetail(): Array<SnRSPhraseGenerator.UndoRedoNodeDetail> {
            return this._listOfUndoRedoNodesDetail;
        }

        set listOfUndoRedoNodesDetail(arglistOfUndoRedoNodesDetail: Array<SnRSPhraseGenerator.UndoRedoNodeDetail>) {
            this._listOfUndoRedoNodesDetail = arglistOfUndoRedoNodesDetail;
        }

    }

}
