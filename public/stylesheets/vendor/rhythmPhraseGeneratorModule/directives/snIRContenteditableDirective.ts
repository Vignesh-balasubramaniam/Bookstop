module SnRSPhraseGenerator 
{
    var app = angular.module('RSPhraseGenerator');
    /*
    Directive definition class for <contenteditable>
    */

    export class ContentEditableDirective implements ng.IDirective {
        public restrict: string;
        public require: [string];
        public focus: boolean;
        constructor() {
            this.restrict = 'A';
            this.require = ['?ngModel'];// This directive requires 
        }

        public link(scope: any, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: {}, transclude: ng.ITranscludeFunction) {
            var ngModel = controller[0];
            var domBroker: SnRSPhraseGenerator.DomBroker = new DomBroker(element.get(0));
            var undoredoManger: SnRSPhraseGenerator.UndoRedoManager = new SnRSPhraseGenerator.UndoRedoManager(element.get(0));
            var oldtextAreaNodeDetailBeforeCharacterInput: Array<SnRSPhraseGenerator.UndoRedoNodeDetail>;
            if (!ngModel) return; // do nothing if no ng-model
            
            // Specify how UI should be updated
            ngModel.$render = function () {
                element.html(ngModel.$viewValue || '');
            };

            // Listen for change events to enable binding
            element.on('blur', function () {
                scope.$apply(read);
            });

            //whenever text area gets altered, this function gets invoked.
            element.on('input', function (eventObject: JQueryEventObject) {
                //console.log('input event fired' + eventObject.charCode);

                domBroker.hrdyaCode(eventObject);
                //console.log("OwnerType => " + scope._UndoRedoManager.OwnerType);
                undoredoManger.insertTextAreaSyllableChangeCommand(oldtextAreaNodeDetailBeforeCharacterInput, domBroker.getNodeDetailForUndoRedo());
               });
            element.on('copy', function (event: JQueryEventObject) {
                //The function scp_handleCopy is defined in snRhythmSyllableTextArea.ts
                domBroker.handleCopy(element, event);

                //Note: We are NOT preventing default. 
                //The browser's clip board will therefore have whatever was copied.
                //Additionally, we are populating the copied text with style into our
                //own clip board.

                //event.defaultPrevented = true;
                //event.preventDefault();
                scope.$apply(read);
            });

            element.on('paste', function (event: JQueryEventObject) {
                event.defaultPrevented = true;
                event.preventDefault();
                //console.log("====>  before element.on('paste'  ");
                var oldTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                domBroker.handlePaste(element, event);
                var newTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                undoredoManger.insertTextAreaSyllableChangeCommand(oldTextAreaNodeDetail, newTextAreaNodeDetail);
                
                scope.$apply(read);
            });//element.on('paste', function (event: JQueryEventObject)

            element.on('cut', function (event: JQueryEventObject) {
                //clearElementIfEmpty(element);
                event.defaultPrevented = true;
                event.preventDefault();
                //console.log("====>  before element.on('cut'  ");
                var oldTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                domBroker.handlePaste(element, event);
                var newTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                undoredoManger.insertTextAreaSyllableChangeCommand(oldTextAreaNodeDetail, newTextAreaNodeDetail);
                scope.$apply(read);
            });//element.on('cut', function (event: JQueryEventObject) 


            element.on('keydown', function (event: JQueryEventObject) {
                var key = event.keyCode || event.charCode;
                oldtextAreaNodeDetailBeforeCharacterInput = domBroker.getNodeDetailForUndoRedo();
                //console.log("====>  before element.on('keydown), KeyCode = " + event.keyCode);
                //KeyCode 86 is V
                if (event.keyCode == 86 && event.ctrlKey) {
                    event.defaultPrevented = true;
                    event.preventDefault();
                    //console.log("====>  before element.on('keydown paste'  ");
                    var oldTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                    domBroker.handlePaste(element, event);
                    var newTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                    undoredoManger.insertTextAreaSyllableChangeCommand(oldTextAreaNodeDetail, newTextAreaNodeDetail);
               
                }//if (event.keyCode == 86 && event.ctrlKey)

                //KeyCode 88 is X
                if (event.keyCode == 88 && event.ctrlKey) {
                    event.defaultPrevented = true;
                    event.preventDefault();
                    //console.log("====>  before element.on('keydown cut'  ");
                    var oldTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                    domBroker.handleControlX(element, event);
                    var newTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                    undoredoManger.insertTextAreaSyllableChangeCommand(oldTextAreaNodeDetail, newTextAreaNodeDetail);
                }

                //keycode==13 is enter
                if (event.keyCode == 13) {
                    event.preventDefault();
                    scope.$apply(read);
                    handleEnterKeyPress();


                }//if (event.keyCode == 13)

                //keyCode == 90 is Z
                if (event.keyCode == 90 && event.ctrlKey) {
                    event.preventDefault();
                   // if (scope._UndoRedoManager != null)
                    undoredoManger.undo();
                }

                //keycode==89 is Y
                if (event.keyCode == 89 && event.ctrlKey) {
                    event.preventDefault();
                    undoredoManger.redo();
                }

                //keycode==8 is backspace
                if (event.keyCode == 8) {

                    event.preventDefault();

                    //console.log("====> BackSpace received");
                    var oldTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                    domBroker.handleBackSpace(element, event);
                    var newTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                    undoredoManger.insertTextAreaSyllableChangeCommand(oldTextAreaNodeDetail, newTextAreaNodeDetail);
                
                }

                //keycode== is del
                if (event.keyCode == 46) {

                    event.preventDefault();

                    //console.log("====> del received");
                    var oldTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                    domBroker.handleDeleteKeyPress(element, event);
                    var newTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                    undoredoManger.insertTextAreaSyllableChangeCommand(oldTextAreaNodeDetail, newTextAreaNodeDetail);
              
                }


                //keycode==65 is A
                if (event.keyCode == 65 && event.ctrlKey) {
                    event.preventDefault();
                    domBroker.handleControlA();
                    element.focus();
                }//if (event.keyCode == 65 && event.ctrlKey)

                //keycode==66 is B
                if (event.keyCode == 65 && event.ctrlKey) {
                    event.preventDefault();
                    //Do Nothing
                }//if (event.keyCode == 65 && event.ctrlKey)

                //keycode==73 is I
                if (event.keyCode == 73 && event.ctrlKey) {
                    event.preventDefault();
                    //var oldTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                    //domBroker.handleControlI();
                    //var newTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                    //undoredoManger.insertTextAreaSyllableChangeCommand(oldTextAreaNodeDetail, newTextAreaNodeDetail);
                }

                //keycode==85 is U
                if (event.keyCode == 85 && event.ctrlKey) {
                    event.preventDefault();
                    //var oldTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                    //domBroker.handleControlU();
                   // var newTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                   // undoredoManger.insertTextAreaSyllableChangeCommand(oldTextAreaNodeDetail, newTextAreaNodeDetail);
                }

                //keycode==116 is f5
                if (event.keyCode == 116) {
                    event.preventDefault();
                    scope.$parent.ircontroller.getSyllableDivision();
                    
                }// if (event.keyCode == 116) {

                if (window.getSelection()) {
                    var range: Range = window.getSelection().getRangeAt(0);

                    //Check if it is a range of characters that is selected and NOT a single cursor
                    var isRangeSelected: boolean = !((range.startContainer===range.endContainer)
                        && (range.startOffset == range.endOffset));

                    //console.log("is RANGE SELECTED ? =" + isRangeSelected);
                    if (isRangeSelected == true) {
                        var isThisKeyOfInterestToUs: boolean = domBroker.isKeyOfInterestToUs(event);
                        //console.log("is This Key Of Interest To Us?= " + isThisKeyOfInterestToUs);
                        if (isThisKeyOfInterestToUs) {
                            event.defaultPrevented = true;
                            event.preventDefault();
                            var oldTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                            domBroker.handleRangeSelectionFollowedByKeyPress(element, event);
                            var newTextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                            undoredoManger.insertTextAreaSyllableChangeCommand(oldTextAreaNodeDetail, newTextAreaNodeDetail);
              
                        }
                    }
                   
                }
                scope.$apply(read);
                scope.$parent.ircontroller.rhythmClip.InputSyllablesCount = null;
            });//element.on('keydown', function (event: JQueryEventObject, eventData)

            scope._textAreaToolbar.handleButtonClick =
                function (snButton: SnRSPhraseGenerator .TextAreaButton) {
                    if (snButton instanceof SnRSPhraseGenerator .TextAreaStyleButton) {
                        var chosenStyleButton = <SnRSPhraseGenerator .TextAreaStyleButton> snButton;
                    var oldtextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
                    domBroker.handleStyleChange(chosenStyleButton);
                    undoredoManger.insertTextAreaSyllableChangeCommand(oldtextAreaNodeDetail, domBroker.getNodeDetailForUndoRedo());
                 }

                else {
                    //  handleUndoRedo();
                    if (snButton._name == "undo") {
                        undoredoManger.undo();
                    }
                    if (snButton._name == "redo") {
                        undoredoManger.redo();
                    }
                }
            }// scope._textAreaToolbar.handleButtonClick =

            //scope.$parent.ircontroller.insertSyllableToTextArea = function (argSyllable: string) {
                
            //    if (window.getSelection().rangeCount==0) {
            //        var selexn = window.getSelection();
            //        var targetPNode = element.children()[0];
            //        var lastChildOfPNode = targetPNode.lastChild;
            //        var newRange = document.createRange();
            //        newRange.setStart(lastChildOfPNode, lastChildOfPNode.textContent.length);
            //        selexn.addRange(newRange);
            //        element.focus();
            //    }
            //    var oldtextAreaNodeDetail = domBroker.getNodeDetailForUndoRedo();
            //    domBroker.insertSyllableIntoTextArea(argSyllable);
            //    scope.$parent.ircontroller.rhythmClip.InputSyllablesCount = null;
            //      undoredoManger.insertTextAreaSyllableChangeCommand(oldtextAreaNodeDetail, domBroker.getNodeDetailForUndoRedo());
               
            //}
            function handleEnterKeyPress()
            {
                scope.$parent.ircontroller.generateRhythm();  
            }
            // Write data to the model. 
            // To read data from the Content Editable Div and transfer it to the model
            function read() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                //if (attrs.stripBr && html == '<br>') {
                //    html = '';
                //}
                ngModel.$setViewValue(html);
            }
        }// public link(scope: any, element: JQuery, attrs: any, controllers) {
    }// export class ContentEditableDirective implements ng.IDirective {

    app.directive('contenteditable', [() => new SnRSPhraseGenerator.ContentEditableDirective]);
}//module SnInstaRhythm 