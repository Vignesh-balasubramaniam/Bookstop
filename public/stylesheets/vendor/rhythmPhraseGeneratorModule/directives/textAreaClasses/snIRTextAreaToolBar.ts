module SnRSPhraseGenerator{
    export class textAreaToolBar {
        buttons: Array<SnRSPhraseGenerator.TextAreaButton>;

        constructor() {
            this.buttons = new Array<SnRSPhraseGenerator.TextAreaButton>();

            //fill Button Array
            this.buttons.push(new SnRSPhraseGenerator.TextAreaStyleButton("underline", "U", "underline",
                "", SnRSPhraseGenerator.TextAreaNodeStyle.Underline, "un"));
            this.buttons.push(new SnRSPhraseGenerator.TextAreaStyleButton("doubleunderline", "DU", "doubleunderline",
                "", SnRSPhraseGenerator.TextAreaNodeStyle.DoubleUnderline, "db"));
            this.buttons.push(new SnRSPhraseGenerator.TextAreaButton("undo", "UN", "undo", "fa fa-undo"));
            this.buttons.push(new SnRSPhraseGenerator.TextAreaButton("redo", "RE", "redo", "fa fa-repeat"));
        }
        handleButtonClick:Function;

    }//export class textAreaToolBar{
}//module SnInstaRhythm{