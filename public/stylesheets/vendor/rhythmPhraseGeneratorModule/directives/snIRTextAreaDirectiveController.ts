module SnRSPhraseGenerator {
    var app = angular.module('RSPhraseGenerator');
    export interface ITextAreaScope extends ng.IScope {
        _bindModel: string;
        _textAreaToolbar: SnRSPhraseGenerator.textAreaToolBar;
        insertSyllableToTextArea:Function;
    }

    export class TextAreaDirectiveController
    {
        static $inject = [ "$scope"];

        
        constructor(protected scope:ITextAreaScope) {
            this.scope._textAreaToolbar = new SnRSPhraseGenerator.textAreaToolBar();
        }//constructor(protected historyService) {


    }// export class TextAreaDirectiveController {

    app.controller('TextAreaDirectiveCtrl', SnRSPhraseGenerator.TextAreaDirectiveController);
  
}//module SnInstaRhythm {