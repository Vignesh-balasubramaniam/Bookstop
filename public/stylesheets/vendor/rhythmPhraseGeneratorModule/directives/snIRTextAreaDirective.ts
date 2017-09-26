module SnRSPhraseGenerator { 
    var app = angular.module('RSPhraseGenerator');
    export class TextAreaDirective implements ng.IDirective {
        public restrict: string;
        public templateUrl: string;
        public controller: any;
        public scope = {};
        public require: string;

        constructor() {
            this.restrict = 'E';

            // this.require = '^?snrhythmsyllable'; // This is NOT Required 

            this.templateUrl = 'rhythmPhraseGeneratorModule/directives/templates/textAreaTemplate.html';

            this.scope = { _bindModel: '=syllabletext' };


            this.controller = 'TextAreaDirectiveCtrl';
        }

    }//export class TextAreaDirective implements ng.IDirective

    app.directive('snirtextarea', [() => new SnRSPhraseGenerator.TextAreaDirective]);
}//module SnInstaRhythm  {