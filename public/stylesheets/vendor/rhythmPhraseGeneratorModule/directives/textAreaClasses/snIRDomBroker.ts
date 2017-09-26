module SnRSPhraseGenerator {
    export class DomBroker {

        public static s_internalClipBoardElement: HTMLElement = null;
        private _element: HTMLElement;
        constructor(argElement: HTMLElement) {
            this._element = argElement;
        }

        handleStyleChange(argUserClickedSnStyleButton: SnRSPhraseGenerator.TextAreaStyleButton) {

            // 1.create SnRhythmTextAreaStyleManager object
            var textAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult = this.getTextAreaAnalysisResult();

            //console.log(textAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);
            //console.log(textAreaAnalysisResult);

            //2.split and return the new  list in analysis result
            var textAreaAnalysisResultEx: SnRSPhraseGenerator.TextAreaAnalysisResultEx = this.getTextAreaNodeDetailAfterSplit(textAreaAnalysisResult);
            //console.log(textAreaAnalysisResultEx);


            //3.check for mixed or non mixed node
            textAreaAnalysisResultEx.fillClassification();
            textAreaAnalysisResultEx.applyStyleToSelectedNodes(argUserClickedSnStyleButton.textStyle);
            //console.log(textAreaAnalysisResultEx);

            //4.compute actual style
            //5.apply the actual style
            this.createHTMLNodeListAndReplaceTextArea(textAreaAnalysisResultEx);


            //this._owner._snRSScope._UndoRedoManager.setUndoRedoDetail();

            
        }//handleStyleChange(argUserClickedSnStyleButton: SnTexAreaStyleButton)

        handleCopy(element: JQuery, event: JQueryEventObject)
        //handleCopy()
        {

            //console.log("Inside DOMBroker::handleCopy" + element.html() + " - " + element[0].tagName);

            //We want to make use of _snTextArea and look into the selected nodes.
            // and "prepare" a <SnPasteBuffer> element 

            //class SnPasteBuffer
            //{
            //constructor(argLstRhythmNodes: Array<SnRhythmNode>, argId: string)


            var textAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult = this.getTextAreaAnalysisResult();

            //console.log(textAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);
            //console.log(textAreaAnalysisResult);

            //2.split and return the new  list in analysis result
            var textAreaAnalysisResultEx: SnRSPhraseGenerator.TextAreaAnalysisResultEx = this.getTextAreaNodeDetailAfterSplit(textAreaAnalysisResult);
            //console.log(textAreaAnalysisResultEx);

            //if (this._internalClipBoardElement != null)
            //    this._internalClipBoardElement.c

            //this._internalClipBoardElement = new HTMLElement();
            var returnValue = document.createElement("SnPastedBuffer");
            for (var i = textAreaAnalysisResultEx._startContainerIndex; i <= textAreaAnalysisResultEx._endContainerIndex; i++) {
                //(textAreaAnalysisResultEx._rhythmNodesList[i]
                switch (textAreaAnalysisResultEx._rhythmNodesList[i].nodeStyle) {
                    case (SnRSPhraseGenerator.TextAreaNodeStyle.Normal):
                        {
                            var normalElement = document.createTextNode(textAreaAnalysisResultEx._rhythmNodesList[i].nodeInnerText);
                            normalElement.nodeValue = normalElement.nodeValue.replace(/\u00a0/g, " ");
                            returnValue.appendChild(normalElement);
                            //console.log("Normal node Encountered. Text = " + normalElement.textContent);
                            break;


                        }
                    case (SnRSPhraseGenerator.TextAreaNodeStyle.Underline):
                        {

                            var underlinedElement = document.createElement("u");
                            underlinedElement.innerText =
                                textAreaAnalysisResultEx._rhythmNodesList[i].nodeInnerText;
                            underlinedElement.innerText = underlinedElement.innerText.replace(/\u00a0/g, " ");
                            returnValue.appendChild(underlinedElement);
                            //console.log("Underlined node Encountered. Text = " + underlinedElement.innerText);
                            break;
                        }
                    case (SnRSPhraseGenerator.TextAreaNodeStyle.DoubleUnderline):
                        {
                            var doubleUnderlinedElement = document.createElement("i");
                            doubleUnderlinedElement.innerText = textAreaAnalysisResultEx._rhythmNodesList[i].nodeInnerText;
                            doubleUnderlinedElement.innerText = doubleUnderlinedElement.innerText.replace(/\u00a0/g, " ");
                            returnValue.appendChild(doubleUnderlinedElement);
                            //console.log("DoubleUnderlined node Encountered. Text = " + doubleUnderlinedElement.innerText);
                            break;
                        }
                    case (SnRSPhraseGenerator.TextAreaNodeStyle.TextNode):
                        {
                            var textElement = document.createTextNode(textAreaAnalysisResultEx._rhythmNodesList[i].nodeInnerText);
                            returnValue.appendChild(textElement);

                            //console.log("Text node Encountered. Text = " + textElement.textContent);
                            break;

                        }
                    default:
                        {
                            console.log("DOMBroker:handleCopy() => We should never reach here !!");
                            //We should never reach here?
                            break;
                        }
                }//switch (textAreaAnalysisResultEx._rhythmNodesList[i].nodeStyle)
            }//for (var i = textAreaAnalysisResultEx._startContainerIndex; i <= textAreaAnalysisResultEx._endContainerIndex; i++)

            //this._clipBoardId = this.generateUUID();
            //returnValue.setAttribute("cbId", this._clipBoardId);

            //console.log("Contents Of snPastedBufferElement " + returnValue.outerHTML);
            SnRSPhraseGenerator.DomBroker.s_internalClipBoardElement = returnValue;

        }//handleCopy(element: JQuery, event)

        handlePaste(element: JQuery, event: JQueryEventObject) {
            //console.log("Inside DOMBroker::handlePasteEx()");

            if (SnRSPhraseGenerator.DomBroker.s_internalClipBoardElement == null)
                return;
            if (SnRSPhraseGenerator.DomBroker.s_internalClipBoardElement.childNodes == null)
                return;
            if (SnRSPhraseGenerator.DomBroker.s_internalClipBoardElement.childNodes.length == 0)
                return;

            //if (this.owner._internalClipBoardElement.children == null)
            //    return;
            //if (this.owner._internalClipBoardElement.children.length == 0)
            //    return;

            //console.log("DOMBroker::handlePasteEx => " + SnRhythmSyllableTextArea.s_internalClipBoardElement.childNodes);

            //get the firstAnalysis object
            var textAreaAnalysisResult = this.getTextAreaAnalysisResult();
            //console.log(textAreaAnalysisResult);

            var textAreaAnalysisResultEx: SnRSPhraseGenerator.TextAreaAnalysisResultEx = this.getTextAreaNodeDetailAfterSplit(textAreaAnalysisResult);
            //console.log(textAreaAnalysisResultEx);

            //create html node from position 0 to startindex-1 and push to new list
            var targetHtmlNodeList = new Array<Node>();
            for (var i = 0; i < textAreaAnalysisResultEx._startContainerIndex; i++) {
                var targetHtmlNode = this.createNodeofGivenStyle(textAreaAnalysisResultEx._rhythmNodesList[i].nodeInnerText,
                    textAreaAnalysisResultEx._rhythmNodesList[i].nodeStyle);
                targetHtmlNodeList.push(targetHtmlNode);
            }
            //push the copied html node to list
            var copiedHtmlNodeList = SnRSPhraseGenerator.DomBroker.s_internalClipBoardElement.childNodes;

            for (var i = 0; i < copiedHtmlNodeList.length; i++) {
                //copiedHtmlNodeList[i].textContent = this.insertSpaceBothEnd(copiedHtmlNodeList[i].textContent); 
                let targetNodeStyle: TextAreaNodeStyle = TextAreaNodeStyle.Undefined;
                let targetNodeInnerText: string = "";
                if (copiedHtmlNodeList[i].nodeType == 3) {
                    //text encountered
                    targetNodeStyle = TextAreaNodeStyle.Normal;
                    let targetHTMLElement: HTMLElement = <HTMLElement>copiedHtmlNodeList[i];
                    targetNodeInnerText = targetHTMLElement.textContent;
                }
                if (copiedHtmlNodeList[i].nodeType == 1) {
                    switch (copiedHtmlNodeList[i].nodeName) {
                        case "I":
                            {
                                //italic - double underline encountered
                                targetNodeStyle = TextAreaNodeStyle.DoubleUnderline;
                                let targetHTMLElement: HTMLElement = <HTMLElement>copiedHtmlNodeList[i];
                                targetNodeInnerText = targetHTMLElement.innerText;
                                break;
                            }
                        case "U":
                            {
                                //underline encountered
                                targetNodeStyle = TextAreaNodeStyle.Underline;
                                let targetHTMLElement: HTMLElement = <HTMLElement>copiedHtmlNodeList[i];
                                targetNodeInnerText = targetHTMLElement.innerText;
                                break;
                            }
                        default:
                            {
                                //not known node
                            }
                    }
                }// if (copiedHtmlNodeList[i].nodeType == 1) {

                targetHtmlNodeList.push(this.createNodeofGivenStyle(targetNodeInnerText, targetNodeStyle));

                //targetHtmlNodeList.push(copiedHtmlNodeList[i].cloneNode(true));
            }
            var endContainerIndex = targetHtmlNodeList.length - 1;
            //create html node from position startindex-1 to length of split list and push to new list
            for (var i = textAreaAnalysisResultEx._endContainerIndex + 1; i < textAreaAnalysisResultEx._rhythmNodesList.length; i++) {
                var targetHtmlNode = this.createNodeofGivenStyle(textAreaAnalysisResultEx._rhythmNodesList[i].nodeInnerText,
                    textAreaAnalysisResultEx._rhythmNodesList[i].nodeStyle);
                targetHtmlNodeList.push(targetHtmlNode);
            }
            //console.log(targetHtmlNodeList);

            //remove the previous html nodes from p tag
            var pTagNode = this._element.childNodes[0];
            var fc = pTagNode.firstChild;

            while (fc) {
                pTagNode.removeChild(fc);
                fc = pTagNode.firstChild;
            }

            //append the new html list to p tag
            for (var i = 0; i < targetHtmlNodeList.length; i++) {
                if (targetHtmlNodeList[i] != null) {
                    pTagNode.appendChild(targetHtmlNodeList[i]);
                }
            }
            this.bringBackFocus(pTagNode, endContainerIndex);

           // this._owner._snRSScope._UndoRedoManager.setUndoRedoDetail();

        }// handlePaste(element, event)

        handleControlX(element: JQuery, event: JQueryEventObject) {
            this.handleCopy(element, event);

            if (SnRSPhraseGenerator.DomBroker.s_internalClipBoardElement == null)
                return;
            if (SnRSPhraseGenerator.DomBroker.s_internalClipBoardElement.childNodes == null)
                return;
            if (SnRSPhraseGenerator.DomBroker.s_internalClipBoardElement.childNodes.length == 0)
                return;
            var textAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult = this.getTextAreaAnalysisResult();

            var textAreaAnalysisResultEx: SnRSPhraseGenerator.TextAreaAnalysisResultEx = this.getTextAreaNodeDetailAfterSplit(textAreaAnalysisResult);
            //console.log(textAreaAnalysisResultEx);

            //remove those item which is lies  startingindex and ending index including both
            var noOfNodeTobeDeleted: number = textAreaAnalysisResultEx._endContainerIndex - textAreaAnalysisResultEx._startContainerIndex + 1;
            textAreaAnalysisResultEx._rhythmNodesList.splice(
                textAreaAnalysisResultEx._startContainerIndex, noOfNodeTobeDeleted);


            var listOfStyleAppliedRhythmNode: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail> = textAreaAnalysisResultEx._rhythmNodesList;
            //remove all child of p of contenteditable div
            var pTagNode = this._element.childNodes[0];
            var fc = pTagNode.firstChild;

            while (fc) {
                pTagNode.removeChild(fc);
                fc = pTagNode.firstChild;
            }
            //console.log(textAreaAnalysisResultEx._rhythmNodesList);

            //create append the new html node one after another from argListOfStyleAppliedRhythmNode
            for (var i = 0; i < listOfStyleAppliedRhythmNode.length; i++) {
                var targetText = listOfStyleAppliedRhythmNode[i].nodeInnerText;
                var targetHTMLNode = this.createNodeofGivenStyle(targetText, listOfStyleAppliedRhythmNode[i].nodeStyle);
                if (targetHTMLNode != null) {
                    pTagNode.appendChild(targetHTMLNode);
                }
            }

            //TODO
            //FIND OUT WHERE TO put focus after control+x
            if (textAreaAnalysisResultEx._startContainerIndex > 0)
                this.bringBackFocus(pTagNode, textAreaAnalysisResultEx._startContainerIndex - 1);
            else {
                //setCursorLocation(argPNode: Node,
                //argTargetNodeIndex: number,
                //argTargetOffset: number)
                this.setCursorLocation(pTagNode, 0, 0);
                //this.bringBackFocus(pTagNode, 0);
            }

            //this._owner._snRSScope._UndoRedoManager.setUndoRedoDetail();

        }//handleControlX(element: JQuery, event)

        handleBackSpace(element: JQuery, event: JQueryEventObject) {
            //console.log("Inside DOMBroker::BackspaceKey is pressed");
            var textAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult =
                this.getTextAreaAnalysisResult();

            //console.log(textAreaAnalysisResult);

            //check selection is a range or single cursor
            var strtCntainerNode = textAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail[textAreaAnalysisResult.startContainerIndex];
            var endCntainerNode = textAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail[textAreaAnalysisResult.endContainerIndex];
            //if ((textAreaAnalysisResult.isStartAndEndSelectionIsSameNode == true)
            //    && (strtCntainerNode.offsetOfStartNode == strtCntainerNode.offsetOfStartNode))
            if ((textAreaAnalysisResult.isStartAndEndSelectionIsSameNode == true)
                && (strtCntainerNode.offsetOfStartNode == endCntainerNode.offsetOfEndNode)) {
                //Single Cursor Backspace
                this.handleSingleCharacterBackspace(textAreaAnalysisResult);
            }
            else {
                this.handleRangeSelectionFollowedByBackspaceOrDelete(element, event);
            }

        }//handleBackSpace(element: JQuery, event: JQueryEventObject) {

        handleDeleteKeyPress(element: JQuery, event: JQueryEventObject) {
            var textAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult =
                this.getTextAreaAnalysisResult();

            //check selection is a range or single cursor
            var strtCntainerNode = textAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail[textAreaAnalysisResult.startContainerIndex];
            var endCntainerNode = textAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail[textAreaAnalysisResult.endContainerIndex];

            if ((textAreaAnalysisResult.isStartAndEndSelectionIsSameNode == true)
                && (strtCntainerNode.offsetOfStartNode == endCntainerNode.offsetOfEndNode)) {
                //Single Cursor Backspace
                this.handleSingleCharacterDelete(textAreaAnalysisResult);
            }
            else {
                this.handleRangeSelectionFollowedByBackspaceOrDelete(element, event);
            }

        }//handleDeleteKeyPress(element: JQuery, event: JQueryEventObject)

        handleRangeSelectionFollowedByKeyPress(element: JQuery, event: JQueryEventObject) {

            //console.log("DOMBroker::handleRangeSelectionFollowedByKeyPress => " + "Key Code = " + event.keyCode);

            //get the firstAnalysis object
            var textAreaAnalysisResult = this.getTextAreaAnalysisResult();
            //console.log(textAreaAnalysisResult);

            var textAreaAnalysisResultEx: SnRSPhraseGenerator.TextAreaAnalysisResultEx = this.getTextAreaNodeDetailAfterSplit(textAreaAnalysisResult);
            //console.log(textAreaAnalysisResultEx);

            //create html node from position 0 to startindex-1 and push to new list
            var targetHtmlNodeList = new Array<Node>();
            for (var i = 0; i < textAreaAnalysisResultEx._startContainerIndex; i++) {
                var targetHtmlNode = this.createNodeofGivenStyle(textAreaAnalysisResultEx._rhythmNodesList[i].nodeInnerText,
                    textAreaAnalysisResultEx._rhythmNodesList[i].nodeStyle);
                targetHtmlNodeList.push(targetHtmlNode);
            }
            //create a text node using incoming text code.
            //append that into the targetHtmlNodeList
            var stringFromKeyCode: string = event.key;
            //console.log("Keypressed = " + stringFromKeyCode);
            var textNodeFromKeyPress = document.createTextNode(stringFromKeyCode);

            targetHtmlNodeList.push(textNodeFromKeyPress);

            var endContainerIndex = targetHtmlNodeList.length - 1;
            //create html node from position startindex-1 to length of split list and push to new list
            for (var i = textAreaAnalysisResultEx._endContainerIndex + 1; i < textAreaAnalysisResultEx._rhythmNodesList.length; i++) {
                var targetHtmlNode = this.createNodeofGivenStyle(textAreaAnalysisResultEx._rhythmNodesList[i].nodeInnerText,
                    textAreaAnalysisResultEx._rhythmNodesList[i].nodeStyle);
                targetHtmlNodeList.push(targetHtmlNode);
            }
            //console.log(targetHtmlNodeList);

            //remove the previous html nodes from p tag
            var pTagNode = this.getPNode();
            var fc = pTagNode.firstChild;

            while (fc) {
                pTagNode.removeChild(fc);
                fc = pTagNode.firstChild;
            }

            //append the new html list to p tag
            for (var i = 0; i < targetHtmlNodeList.length; i++) {
                if (targetHtmlNodeList[i] != null) {
                    pTagNode.appendChild(targetHtmlNodeList[i]);
                }
            }
            this.bringBackFocus(pTagNode, endContainerIndex);

            //this._owner._snRSScope._UndoRedoManager.setUndoRedoDetail();
        }//handleRangeSelectionFollowedByKeyPress(element: JQuery, event: JQueryEventObject)

        handleControlA() {
            var pTagNode = this.getPNode();
        if ((pTagNode == null) || (pTagNode.childNodes.length == 0))
            return;


        for (var i = 0; i < pTagNode.childNodes.length; i++) {
            var fc = pTagNode.childNodes[i];
            if (fc.nodeName == 'BR') {
                pTagNode.insertBefore(document.createTextNode(''), fc);
                pTagNode.removeChild(fc);
            }//if (fc.nodeName == 'BR')
        }//for (var i = 0; i < pTagNode.childNodes.length; i++)

        var newRange = document.createRange();
        var s = window.getSelection();

        if (pTagNode.childNodes[0].nodeType == 3)
            newRange.setStart(pTagNode.childNodes[0], 0);
        else
            newRange.setStart(pTagNode.childNodes[0].firstChild, 0);

        if (pTagNode.lastChild.nodeType == 3) {
            newRange.setEnd(pTagNode.lastChild, pTagNode.lastChild.textContent.length);
        }
        else {
            newRange.setEnd(pTagNode.lastChild.firstChild,
                pTagNode.lastChild.firstChild.textContent.length);
        }

        s.removeAllRanges();
        s.addRange(newRange);

        //document.getElementById("contentEdDiv").focus();

        }// handleControlA()

        handleControlI() {
            var chosenStyleButton: SnRSPhraseGenerator.TextAreaStyleButton = new SnRSPhraseGenerator.TextAreaStyleButton("doubleunderline", "DU", "doubleunderline",
                "", SnRSPhraseGenerator.TextAreaNodeStyle.DoubleUnderline, "DB");
            this.handleStyleChange(chosenStyleButton);
        }//handleControlI()

        handleControlU() {
            var chosenStyleButton: SnRSPhraseGenerator.TextAreaStyleButton = new SnRSPhraseGenerator.TextAreaStyleButton("underline", "U", "underline",
                "", SnRSPhraseGenerator.TextAreaNodeStyle.Underline, "un");
            this.handleStyleChange(chosenStyleButton);
        }//handleControlU()

        getNodeDetailForUndoRedo() :Array<SnRSPhraseGenerator.UndoRedoNodeDetail>{
            var selexn = window.getSelection();
            if (selexn == null)
                return;

            //get range object and cursor position
            if ((typeof window.getSelection() == "undefined")//brwoser doesnot support selection
                || (window.getSelection().rangeCount) == 0) {
                return;
            }

            var pTagNode = this.getPNode();
            if (pTagNode == null) {
                return;
            }

            //var selexn = window.getSelection();
            //if (selexn == null)
            //    return;

            var range = selexn.getRangeAt(0);
            if (range == null)
                return;

            //console.log("Inner HTML == " + document.getElementById("contentEdDiv").innerHTML);

            var selectionStartContainer: Node = null;
            //assumption: range.startContainer will never be null.
            if (range.startContainer.nodeType == 3) {
                //We are Inside Text Node.
                //console.log("encountered an node type == 3");
                if (range.startContainer.parentNode.nodeName == "I" || range.startContainer.parentNode.nodeName == "U") {
                    //console.log("Inside a text node whose parent is  " + range.startContainer.parentNode.nodeName);
                    selectionStartContainer = range.startContainer.parentNode;

                    //TODO Check the grand child of text node
                }
                else { 
                    //The text node is inside <p>
                    //console.log("Inside a text node whose parent is  " + range.startContainer.parentNode.nodeName);
                    //console.log("Inside a child node of " + range.startContainer.parentNode.nodeName);
                    selectionStartContainer = range.startContainer;
                }
            }//if (range.startContainer.nodeType == 3)
            else {
                //Selection's startContainer is in a non-text node
                console.log("We don't expect to reach this code");
                console.log("encountered an unexpected node type =>" + range.startContainer.nodeType);
                //we are inside the <i> or <u> tag
                selectionStartContainer = range.startContainer;

                //Paddy's code. Will be removed later.
                if (range.startContainer.nodeName == "I" || range.startContainer.nodeName == "U") {
                    if (range.startContainer.parentNode.nodeName == "I" || range.startContainer.parentNode.nodeName == "U") {
                        console.log("Triple Underline Encountered");
                    }
                }

            }//else => if (range.startContainer.nodeType == 3)

            var targetLstOfUndoRedoNodeDetail: Array<SnRSPhraseGenerator.UndoRedoNodeDetail> = new Array<SnRSPhraseGenerator.UndoRedoNodeDetail>();

            var isStartContainerInJunkNode: boolean = false;

            for (var i = 0; i < pTagNode.childNodes.length; i++) {
                var incomingNode = pTagNode.childNodes[i];
                var targetUndoRedoNode: SnRSPhraseGenerator.UndoRedoNodeDetail = new SnRSPhraseGenerator.UndoRedoNodeDetail();
                //nodetype=3 means text node,nodetype=1 means html element,nodetype=2 means attribute.
                //we dont expect to encounter an attribute node here in rhythmblend
                if (incomingNode.nodeType == 3) {
                    //text encountered
                    targetUndoRedoNode.nodeStyle = SnRSPhraseGenerator.TextAreaNodeStyle.Normal;
                    targetUndoRedoNode.nodeInnerText = incomingNode.textContent;
                    if (incomingNode===selectionStartContainer) {
                        targetUndoRedoNode.isfocusNode = true;
                        targetUndoRedoNode.offsetInsideNode = range.startOffset;
                    }//if (incomingNode.isSameNode(selectionStartContainer))
                    targetLstOfUndoRedoNodeDetail.push(targetUndoRedoNode);
                }
                if (incomingNode.nodeType == 1) {
                    switch (pTagNode.childNodes[i].nodeName) {
                        case "I":
                            {
                                //italic - double underline encountered
                                targetUndoRedoNode.nodeStyle = SnRSPhraseGenerator.TextAreaNodeStyle.DoubleUnderline;
                                targetUndoRedoNode.nodeInnerText = incomingNode.textContent;
                                if (incomingNode===selectionStartContainer) {
                                    targetUndoRedoNode.isfocusNode = true;
                                    targetUndoRedoNode.offsetInsideNode = range.startOffset;
                                }//if (incomingNode.isSameNode(selectionStartContainer))
                                targetLstOfUndoRedoNodeDetail.push(targetUndoRedoNode);
                                break;
                            }
                        case "U":
                            {
                                //underline encountered
                                targetUndoRedoNode.nodeStyle = SnRSPhraseGenerator.TextAreaNodeStyle.Underline;
                                targetUndoRedoNode.nodeInnerText = incomingNode.textContent;

                                if (incomingNode===selectionStartContainer) {
                                    targetUndoRedoNode.isfocusNode = true;
                                    targetUndoRedoNode.offsetInsideNode = range.startOffset;
                                }//if (incomingNode.isSameNode(selectionStartContainer))
                                targetLstOfUndoRedoNodeDetail.push(targetUndoRedoNode);
                                break;
                            }
                        default:
                            {
                                console.log("Unknown node encountered " + incomingNode.nodeName);
                                if (incomingNode===selectionStartContainer) {
                                    console.log("We have an unexpected node as the Selection Container " + incomingNode.nodeName);
                                    if (i > 0) {
                                        targetLstOfUndoRedoNodeDetail[targetLstOfUndoRedoNodeDetail.length - 1].isfocusNode = true;
                                        targetLstOfUndoRedoNodeDetail[targetLstOfUndoRedoNodeDetail.length - 1].offsetInsideNode =
                                        targetLstOfUndoRedoNodeDetail[targetLstOfUndoRedoNodeDetail.length - 1].nodeInnerText.length - 1;
                                    }
                                    else {
                                        console.log("We have an unexpected node as the Selection Container and it is the very first one" + incomingNode.nodeName);
                                        //TODO: Set boolean variable to true here. 
                                        //After processing all nodes, we will check to see if this condition is true.
                                        //if so, we will make the very first node of targetLstOfContentEditableNode as the focus node.
                                        //and the offset inside the node will be set to zero
                                        isStartContainerInJunkNode = true;
                                    }

                                }//if (incomingNode.isSameNode(selectionStartContainer))
                                break;
                                //not known node
                            }//default:
                    }//switch (pTagNode.childNodes[i].nodeName) {
                }// if (pTagNode.childNodes[i].nodeType == 1) 
                if (isStartContainerInJunkNode == true) {
                    if (targetLstOfUndoRedoNodeDetail.length > 0) {
                        targetLstOfUndoRedoNodeDetail[0].isfocusNode = true;
                        targetLstOfUndoRedoNodeDetail[0].offsetInsideNode = 0;
                    }
                }
            }//for (var i = 0; i < pTagNode.childNodes.length; i++)

             
            return targetLstOfUndoRedoNodeDetail;
        }//getNodeDetailForUndoRedo() :Array<SnRSPhraseGenerator.UndoRedoNodeDetail>{

        insertSyllableIntoTextArea(argNewSyllableText: string) {
            var targetTextAreaAnalysis = this.getTextAreaAnalysisResult();
            var selectionType: string;

            if (targetTextAreaAnalysis.startContainerIndex < 0) {
                selectionType = "none";
            }
            else {
                if ((targetTextAreaAnalysis.isStartAndEndSelectionIsSameNode == true) &&
                    targetTextAreaAnalysis.listOfSnRhythmTextAreaNodeDetail[targetTextAreaAnalysis.startContainerIndex].offsetOfStartNode ==
                    targetTextAreaAnalysis.listOfSnRhythmTextAreaNodeDetail[targetTextAreaAnalysis.endContainerIndex].offsetOfEndNode) {
                    selectionType = "caret";
                } else {
                    selectionType = "range";
                }
            }

            var pElement: Node = this._element.childNodes[0];

            switch (selectionType) {
                case "caret":
                    {
                        var targetNode: Node = pElement.childNodes[targetTextAreaAnalysis.startContainerIndex];
                        var targetTextContent = targetNode.textContent;
                        var targetCusorOffset = targetTextAreaAnalysis.listOfSnRhythmTextAreaNodeDetail[
                            targetTextAreaAnalysis.startContainerIndex].offsetOfStartNode;

                        targetTextContent = targetTextContent.substr(0, targetCusorOffset) + " " + argNewSyllableText
                        + " " + targetTextContent.substr(targetCusorOffset);

                        targetNode.textContent = targetTextContent.replace(/\s\s+/g, " ");
                        var stringtillnewCusorPosition = targetTextContent.substr(0, targetCusorOffset).replace(/\s\s+/g, " ") + " " + argNewSyllableText;
                        var newCursorPosition = stringtillnewCusorPosition.length;

                        this.setCursorLocation(pElement, targetTextAreaAnalysis.startContainerIndex, newCursorPosition);
                        
                        break;
                    }

                case "none":
                    {
                        //insert text at the end
                        if (pElement.childNodes.length == 0) {
                            pElement.textContent = argNewSyllableText;
                            this.setCursorLocation(pElement, 0, pElement.textContent.length);
                           
                        }
                        else {
                            var newTextNode = document.createTextNode(' ' + argNewSyllableText);
                            pElement.appendChild(newTextNode);
                            this.setCursorLocation(pElement, pElement.childNodes.length - 1, newTextNode.textContent.length);
                            
                        }

                        break;
                    }
                case "range":
                    {
                        //insert text as a new text node
                        //similar to  handleRangeSelectionFollowedByKeyPress
                        //1. We should remove the contents inside the selection range
                        //2. Insert the clicked syllable at the startnodeIndex , startoffset position
                        //3. Then set the cursor position afeter the inserted syllable position length position
                        var textAreaAnalysisResult = this.getTextAreaAnalysisResult();
                        //console.log(textAreaAnalysisResult);

                        var textAreaAnalysisResultEx: SnRSPhraseGenerator.TextAreaAnalysisResultEx = this.getTextAreaNodeDetailAfterSplit(textAreaAnalysisResult);
                        //console.log(textAreaAnalysisResultEx);

                        //create html node from position 0 to startindex-1 and push to new list
                        var targetHtmlNodeList = new Array<Node>();
                        for (var i = 0; i < textAreaAnalysisResultEx._startContainerIndex; i++) {
                            var targetHtmlNode = this.createNodeofGivenStyle(textAreaAnalysisResultEx._rhythmNodesList[i].nodeInnerText,
                                textAreaAnalysisResultEx._rhythmNodesList[i].nodeStyle);
                            targetHtmlNodeList.push(targetHtmlNode);
                        }
                        //Create New TextNode of the Syllable CLicked
                        var targetNode: Node = document.createTextNode(" " + argNewSyllableText + "  ");
                        targetHtmlNodeList.push(targetNode);
                        var endContainerIndex = targetHtmlNodeList.length - 1;
                        //create html node from position startindex-1 to length of split list and push to new list
                        for (var i = textAreaAnalysisResultEx._endContainerIndex + 1; i < textAreaAnalysisResultEx._rhythmNodesList.length; i++) {
                            var targetHtmlNode = this.createNodeofGivenStyle(textAreaAnalysisResultEx._rhythmNodesList[i].nodeInnerText,
                                textAreaAnalysisResultEx._rhythmNodesList[i].nodeStyle);
                            targetHtmlNodeList.push(targetHtmlNode);
                        }
                        //console.log(targetHtmlNodeList);

                        //remove the previous html nodes from p tag
                        var pTagNode = this._element.childNodes[0];
                        var fc = pTagNode.firstChild;

                        while (fc) {
                            pTagNode.removeChild(fc);
                            fc = pTagNode.firstChild;
                        }

                        //append the new html list to p tag
                        for (var i = 0; i < targetHtmlNodeList.length; i++) {
                            if (targetHtmlNodeList[i] != null) {
                                pTagNode.appendChild(targetHtmlNodeList[i]);
                            }
                        }
                        this.bringBackFocus(pTagNode, endContainerIndex);
                
                        break;
                    }
                default:
                    {


                    }
            }

            //console.log("type of selection==>" + selectionType);
        }


        isKeyOfInterestToUs(evt: JQueryEventObject) {
        if (typeof evt.which == "undefined") {
            // comment from where we got this code in the internet in the next line
            //This is IE, which only fires keypress events for printable keys


            //if an unknown key is encountered, don't intercept. Just let it pass.
            return false;
        }

        if (typeof evt.which == "number") {
            if ((evt.ctrlKey == true) || (evt.metaKey == true) || (evt.altKey == true) || (evt.which == 8)) {
                //if ctrl key or meta key or alt key or backspace is encountered..
                //don't intercept. Just let it pass.
                return false;
            }
            // In other browsers except old versions of WebKit, evt.which is
            // only greater than zero if the keypress is a printable key.
            // We need to filter out backspace and ctrl/alt/meta key combinations
            if ((evt.which >= 48) && (evt.which <= 90))
                return true;

            if ((evt.which >= 96) && (evt.which <= 111))
                return true;

            if ((evt.which >= 186) && (evt.which <= 192))
                return true;

            if ((evt.which >= 219) && (evt.which <= 222))
                return true;

            return false;

        }//if (typeof evt.which == "number") {
        else {
            return false;
        }
    }// isCharacterKeyPress(evt: JQueryEventObject)

        private handleSingleCharacterBackspace(argTextAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult) {
            //console.log("Backspace of a single character");

            //if cursor at 0 and length of the node is non-zero. 
            //Go to the previous node (if any) and remove the last character
            //if no previous node, do nothing. 
            //set cursor position "appropriately".

            //if cursor at 1 and length of the node is greater than one. 
            //simply remove the character and set cursor position "appropriately".

            //if cursor at 1 and length of the node is one. 
            //remove the character and the element.
            //set cursor position on the previous node's (if any) end "appropriately".
            //if no previous node set cursor at the beginning of the next node (if any).
            //if no next node also, then <p> </p> is the ultimate result.

            //if cursor at position greater than 1, simply remove preceding character 
            //and set cursor position "appropriately".

            //CleanUp  argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail

            //We cleaned up here to avoid a lot of loops we may have to unnecessarily write later.
            //this will also remove <br> tags if any.
            argTextAreaAnalysisResult = argTextAreaAnalysisResult.clean();


            var targetCntainerNode = argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail[argTextAreaAnalysisResult.startContainerIndex];


            switch (targetCntainerNode.offsetOfStartNode) {
                case 0:
                    {
                        //if cursor at 0 and length of the node is non-zero. 
                        if (targetCntainerNode.innerText.length > 0) {
                            //As we are in the zeroth position of targetCntainerNode 
                            //Go to the previous node (if any) and remove the last character
                            if (argTextAreaAnalysisResult.startContainerIndex > 0) {
                                var previousNodeIndex: number =
                                    argTextAreaAnalysisResult.startContainerIndex - 1;
                                var previousNode: SnRSPhraseGenerator.TextAreaNodeAnalysisDetail =
                                    argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail[previousNodeIndex];

                                //We are NOT handling if (previousNode.innerText.length == 0) 
                                //because the clean up operation
                                //argTextAreaAnalysisResult = argTextAreaAnalysisResult.clean();  would have 
                                //removed all empty nodes.

                                if (previousNode.innerText.length == 1) {
                                    //remove the entire row representing the previous node from 
                                    //listOfSnRhythmTextAreaNodeDetail as it contains only one character.
                                    argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail.splice(previousNodeIndex, 1);

                                    if (previousNodeIndex > 0) {
                                        //move the cursor back.
                                        var newPreviousNodeIndex = previousNodeIndex - 1;
                                        //place cursor at the last character of the node 
                                        //at index newPreviousNodeIndex

                                        var pTagNode = this.getPNode();
                                        var cursorPositionInNewPreviousNode =
                                            pTagNode.childNodes[newPreviousNodeIndex].textContent.length;
                                        //to be verified


                                        this.cleanAndFillPTagWithContentsOfList(argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                                        //clear the pTag. Insert nodes one by one from the current pTage
                                        this.setCursorLocation(this.getPNode(),
                                            newPreviousNodeIndex,
                                            cursorPositionInNewPreviousNode);

                                    }
                                    else {
                                        //we have reached the very beginning position of pTag

                                        //clear the pTag. Insert nodes one by one from the current pTage
                                        this.cleanAndFillPTagWithContentsOfList(argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                                        this.setCursorLocation(this.getPNode(), 0, 0);

                                    }
                                    //cursor position

                                }//if (previousNode.innerText.length == 1)
                                else {
                                    //previous node has multiple characters. Just remove the last character
                                    previousNode.innerText = previousNode.innerText.substring(0, previousNode.innerText.length - 1);
                                    //targetCntainerNode.offsetOfStartNode is the current cursor position. It has to go back by one position

                                    this.cleanAndFillPTagWithContentsOfList(
                                        argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                                    this.setCursorLocation(this.getPNode(), previousNodeIndex, previousNode.innerText.length);
                                    // previousNode.innerText.length to be verified
                                }

                            }
                            else {
                                //there is no previous node. Therefore nothing to delete. 
                                //But set focus current node's 0th position, which is NOTHING But the current position.
                                //Therefore no need to change the cursor position.
                                //Summary: Just DO NOTHING.
                            }

                        }//if (targetCntainerNode.innerText.length > 0)
                        else {
                            console.log("This is an empty node." +
                                " Cleanup operation has deleted all empty nodes." +
                                " Therefore, We don't expect to reach here !!");
                        }
                        //Go to the previous node (if any) and remove the last character
                        //if no previous node, do nothing. 
                        //set cursor position "appropriately".

                        break;
                    }
                case 1:
                    {//
                        // (targetCntainerNode.offsetOfStartNode) == 1
                        if (targetCntainerNode.innerText.length > 1) {
                            //if cursor at 1 and length of the node is greater than one. 
                            //simply remove the character and set cursor position "appropriately".

                            var zeroBasedIndexOfTheCharacterToBeRemoved = targetCntainerNode.offsetOfStartNode - 1;
                            targetCntainerNode.innerText = this.removeCharacterAtZeroBasedIndex(targetCntainerNode.innerText, zeroBasedIndexOfTheCharacterToBeRemoved);
                            this.cleanAndFillPTagWithContentsOfList(
                                argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                            this.setCursorLocation(this.getPNode(),
                                argTextAreaAnalysisResult.startContainerIndex,
                                targetCntainerNode.offsetOfStartNode - 1);
                            break;
                        }
                        else {
                            //here targetCntainerNode.innerText.length == 1) 

                            //if cursor at 1 and length of the node is one. 
                            //remove the character and the element in our list
                            if (argTextAreaAnalysisResult.startContainerIndex > 0) {
                                //there are one or more nodes preceding the startContainer 
                                //which are inside the < p > tag
                                argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail.splice(argTextAreaAnalysisResult.startContainerIndex, 1);

                                var previousNodeIndex: number =
                                    argTextAreaAnalysisResult.startContainerIndex - 1;
                                var previousNodeDetail: SnRSPhraseGenerator.TextAreaNodeAnalysisDetail =
                                    argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail[previousNodeIndex];
                                var cursorPositionInThePreviousNode = previousNodeDetail.innerText.length;

                                //clear the pTag. Insert nodes one by one from listOfSnRhythmTextAreaNodeDetail
                                this.cleanAndFillPTagWithContentsOfList(argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                                //set cursor position on the previous node's (if any) end "appropriately".
                                this.setCursorLocation(this.getPNode(),
                                    previousNodeIndex,
                                    cursorPositionInThePreviousNode);
                                break;
                            }//if (argTextAreaAnalysisResult.startContainerIndex > 0)
                            else {
                                //here argTextAreaAnalysisResult.startContainerIndex == 0)
                                //we are at the zeroth node of pTag.
                                if (argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail.length > 1) {
                                    //there are other nodes following the current node
                                    argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail.splice(argTextAreaAnalysisResult.startContainerIndex, 1);
                                    this.cleanAndFillPTagWithContentsOfList(argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                                    //nextNode becomes the zeroth node
                                    this.setCursorLocation(this.getPNode(),
                                        0,
                                        0);
                                    break;
                                }
                                else {
                                    //there are no other node preceding or after this node.
                                    argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail.splice(argTextAreaAnalysisResult.startContainerIndex, 1);
                                    this.cleanAndFillPTagWithContentsOfList(argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);
                                    break;
                                    //if no next node also, then <p> </p> is the ultimate result.
                                }

                                //if no previous node set cursor at the beginning of the next node (if any).
                            }
                        }

                    }

                default:
                    {

                        //if cursor at position greater than 1, simply remove preceding character 
                        //and set cursor position "appropriately".


                        var zeroBasedIndexOfTheCharacterToBeRemoved = targetCntainerNode.offsetOfStartNode - 1;
                        targetCntainerNode.innerText = this.removeCharacterAtZeroBasedIndex(targetCntainerNode.innerText, zeroBasedIndexOfTheCharacterToBeRemoved);
                        this.cleanAndFillPTagWithContentsOfList(
                            argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                        this.setCursorLocation(this.getPNode(),
                            argTextAreaAnalysisResult.startContainerIndex,
                            targetCntainerNode.offsetOfStartNode - 1);
                        break;
                    }
            }
        }//handleSingleCharacterBackspace(argTextAreaAnalysisResult:SnRSPhraseGenerator.TextAreaAnalysisResult)

        private handleSingleCharacterDelete(argTextAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult) {
            //remove empty tag and br tag if any
            argTextAreaAnalysisResult = argTextAreaAnalysisResult.clean();

            var targetCntainerNode = argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail[argTextAreaAnalysisResult.startContainerIndex];

            switch (targetCntainerNode.offsetOfStartNode) {
                case 0:
                    {
                        //cursor is at very begining of a node
                        if (targetCntainerNode.innerText.length == 1) {
                            //single character node


                            if (argTextAreaAnalysisResult.startContainerIndex > 0) {
                                //delete the node and focus to the length of previous node 
                                var previousNodeIndex: number =
                                    argTextAreaAnalysisResult.startContainerIndex - 1;
                                var previousNodeDetail: SnRSPhraseGenerator.TextAreaNodeAnalysisDetail =
                                    argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail[previousNodeIndex];
                                var cursorPositionInThePreviousNode = previousNodeDetail.innerText.length;


                                argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail.splice(argTextAreaAnalysisResult.startContainerIndex, 1);
                                this.cleanAndFillPTagWithContentsOfList(argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                                this.setCursorLocation(this.getPNode(),
                                    previousNodeIndex,
                                    cursorPositionInThePreviousNode);

                                break;
                            } else {

                                if (argTextAreaAnalysisResult.startContainerIndex == argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail.length - 1) {
                                    //this is the only node 
                                    //delete the current node and set focus to p element.

                                    argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail.splice(argTextAreaAnalysisResult.startContainerIndex, 1);
                                    this.cleanAndFillPTagWithContentsOfList(argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                                }
                                else {
                                    //delete the current node and set focus to 0th position of right node.

                                    argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail.splice(argTextAreaAnalysisResult.startContainerIndex, 1);
                                    this.cleanAndFillPTagWithContentsOfList(argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                                    this.setCursorLocation(this.getPNode(),
                                        0,
                                        0);

                                }
                            }

                        }
                        else {
                            //node is multiple character node
                            //delete the character next to the cursor
                            var zeroBasedIndexOfTheCharacterToBeRemoved = targetCntainerNode.offsetOfStartNode;
                            targetCntainerNode.innerText = this.removeCharacterAtZeroBasedIndex(targetCntainerNode.innerText, zeroBasedIndexOfTheCharacterToBeRemoved);

                            this.cleanAndFillPTagWithContentsOfList(argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                            this.setCursorLocation(this.getPNode(),
                                argTextAreaAnalysisResult.startContainerIndex,
                                targetCntainerNode.offsetOfStartNode);

                        }
                        break;
                    }//case 0:

                case targetCntainerNode.innerText.length:
                    {
                        //cursor is at very end of a node

                        if (argTextAreaAnalysisResult.startContainerIndex == argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail.length - 1) {
                            //cursor is at the last node's length
                            //so do nothing
                        }
                        else {
                            var nextNodeIndex: number =
                                argTextAreaAnalysisResult.startContainerIndex + 1;
                            var nextNodeDetail: SnRSPhraseGenerator.TextAreaNodeAnalysisDetail =
                                argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail[nextNodeIndex];

                            if (nextNodeDetail.innerText.length == 1) {
                                //next node is a single character node
                                //delete the nextnode and focus remain same

                                argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail.splice(nextNodeIndex, 1);
                                this.cleanAndFillPTagWithContentsOfList(argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                                this.setCursorLocation(this.getPNode(),
                                    argTextAreaAnalysisResult.startContainerIndex,
                                    targetCntainerNode.offsetOfStartNode);
                            }
                            else {
                                //delete the first character of next node 
                                //focus remain same

                                var zeroBasedIndexOfTheCharacterToBeRemoved = 0;
                                nextNodeDetail.innerText = this.removeCharacterAtZeroBasedIndex(nextNodeDetail.innerText, zeroBasedIndexOfTheCharacterToBeRemoved);

                                this.cleanAndFillPTagWithContentsOfList(argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                                this.setCursorLocation(this.getPNode(),
                                    argTextAreaAnalysisResult.startContainerIndex,
                                    targetCntainerNode.offsetOfStartNode);

                            }

                        }
                        break;
                    }
                default:
                    {
                        //cursor is at middle.
                        //delete the next character
                        var zeroBasedIndexOfTheCharacterToBeRemoved = targetCntainerNode.offsetOfStartNode;
                        targetCntainerNode.innerText = this.removeCharacterAtZeroBasedIndex(targetCntainerNode.innerText, zeroBasedIndexOfTheCharacterToBeRemoved);

                        this.cleanAndFillPTagWithContentsOfList(argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail);

                        this.setCursorLocation(this.getPNode(),
                            argTextAreaAnalysisResult.startContainerIndex,
                            targetCntainerNode.offsetOfStartNode);
                        break;
                    }
            }//switch (targetCntainerNode.offsetOfStartNode)

        }//handleSingleCharacterDelete(argTextAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult) {

        private handleRangeSelectionFollowedByBackspaceOrDelete(element: JQuery, event: JQueryEventObject) {
            //console.log("Backspace of a range of  characters");
            var textAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult = this.getTextAreaAnalysisResult();

            var textAreaAnalysisResultEx: SnRSPhraseGenerator.TextAreaAnalysisResultEx = this.getTextAreaNodeDetailAfterSplit(textAreaAnalysisResult);
            //console.log(textAreaAnalysisResultEx);

            //remove those item which is lies  startingindex and ending index including both
            var noOfNodeTobeDeleted: number = textAreaAnalysisResultEx._endContainerIndex - textAreaAnalysisResultEx._startContainerIndex + 1;
            textAreaAnalysisResultEx._rhythmNodesList.splice(
                textAreaAnalysisResultEx._startContainerIndex, noOfNodeTobeDeleted);


            var listOfStyleAppliedRhythmNode: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail> = textAreaAnalysisResultEx._rhythmNodesList;
            //remove all child of p of contenteditable div
            var pTagNode = this.getPNode();
            var fc = pTagNode.firstChild;

            while (fc) {
                pTagNode.removeChild(fc);
                fc = pTagNode.firstChild;
            }

            //create append the new html node one after another from argListOfStyleAppliedRhythmNode
            for (var i = 0; i < listOfStyleAppliedRhythmNode.length; i++) {
                //var targetText = this.insertSpaceBothEnd(listOfStyleAppliedRhythmNode[i].nodeInnerText);
                var targetText = listOfStyleAppliedRhythmNode[i].nodeInnerText;
                var targetHTMLNode = this.createNodeofGivenStyle(targetText, listOfStyleAppliedRhythmNode[i].nodeStyle);
                if (targetHTMLNode != null) {
                    pTagNode.appendChild(targetHTMLNode);
                }
            }

            //TODO
            //FIND OUT WHERE TO put focus after deletion of text

            //this.bringBackFocus(pTagNode, textAreaAnalysisResultEx._startContainerIndex - 1);
            if (textAreaAnalysisResultEx._startContainerIndex > 0)
                this.bringBackFocus(pTagNode, textAreaAnalysisResultEx._startContainerIndex - 1);
            else {
                //setCursorLocation(argPNode: Node,
                //argTargetNodeIndex: number,
                //argTargetOffset: number)
                this.setCursorLocation(pTagNode, 0, 0);
                //this.bringBackFocus(pTagNode, 0);
            }


        }//handleRangeSelectionFollowedByBackspaceOrDelete(element:JQuery, event:JQueryEventObject)

       
         //The function below was originally written by Hrdya.
            //She assumed that there would only be a single character that would "sneak" in front of the <p> tag.
            //But, that is not true. It can be elements instead of just text.
            //So, we take a different approach. We will look for any element or text inside <div> that precedes
            //the <p> tag. We will move all of those elements that precede inside the <p> tag, provided
            // the elements are either <i> or <u> or text. All other unknown elements will be DISCARDED
            //step 1. Get all children of Div node. More than just the <p> element? Do those element(s)
            //precede <p>? Take the inner text of the element(s) and prefix the <p> tag's content with
            //the inner text.
         hrdyaCode( event: JQueryEventObject) {
        //console.log("--hrdyCode--" + event.keyCode)
        var keyCode = event.keyCode;


        //shift, ctrl, alt, etc which user might press generally.
        var SPECIAL_KEYS = /(16|17|18|20|27|33|34|35|36|37|38|39|40|44|45)$/i;
        var ret = ((SPECIAL_KEYS.test("" + keyCode)));

        //ctrl+A = 65 , ctrl+C = 67 , ctrl + V = 86, ctrl + X = 88, shift + ins = ?
        //Why are we not supporting Ctrl+x = 88 ?
        var ctrlKeys = ((keyCode == 65 && event.ctrlKey == true)
            || (keyCode == 67 && event.ctrlKey == true)
            || (keyCode == 86 && event.ctrlKey == true)); // || (keyCode == 88 && event.ctrlKey == true)


        if (!ret && !ctrlKeys) {
            if (!(this._element.innerHTML.toLowerCase().substring(0, 2) == '<p')) {
                //console.log("calling wrap from handleKeyUp");
                this.wrapLine();
            }//if (!(element.html().toLowerCase().substring(0, 2) == '<p'))
        }
        }//public hrdyCode(element: JQuery, event)

         private wrapLine() {
        //The input parameter "element" is the content editable <div>.
        //Under happy situations we expect to see only one single <p> tag

        // But it is possible that one or more elements and text can present ahead of <p> tag.
        // We accept only <i>, <u> or text. We don't accept anything other than these.
        // if we encounter text will use it as it is. 
        // if we encouter an <i> tag we will use only its inner html. Same rule applies for <u> tag
        // if we encouter an <i> tag containing <u> tag or vice versa, we will just use the inner text and ignore the <i> and <u>
        //In case we encounter any other tag such as <br> we will simply replace them with space.


             var divElement: HTMLElement = this._element;
        if ((divElement == null) || (divElement.childNodes == null))
            return;

        switch (divElement.childNodes.length) {
            case (0):
                {
                    //console.log("We always expect to receive at least one <p> tag inside <div>." +
                    //    "We don't expect to reach this code.");

                    //A lot to worry.
                    break;
                }

            case (1):
                {
                    var children = divElement.childNodes;
                    if ((children == null) || (children.length == 0))
                        return;
                    if (children[0].nodeName == "P") {
                        //as this is a <p> element, No need to do anything.
                        break;
                    }
                    else {
                        //console.log("ContentEditableDirective::Wrapline => 
                        //We always expect to receive at least one < p > tag inside <div>." +
                        //    "We don't expect to reach this code.");
                        //get the text content and put it inside the new p tag

                        var newPTag = document.createElement("P");
                        var textElement = document.createTextNode(divElement.childNodes[0].textContent);
                        newPTag.appendChild(textElement);
                        divElement.removeChild(divElement.childNodes[0]);
                        divElement.appendChild(newPTag);

                        //TODO-AFTER-CR: Call Set Cursor Position function
                        //set cursor position
                        var range = document.createRange();
                        var sel = window.getSelection();
                        range.setStart(divElement.childNodes[0].lastChild, divElement.childNodes[0].lastChild.textContent.length);
                        sel.removeAllRanges();
                        sel.addRange(range);


                        break;

                    }


                    //if this is other than a <p>.. There is some problem with our logic so far
                    //break;
                }
            default:
                {
                    var children = divElement.childNodes;

                    var lstText: Array<string> = new Array<string>();
                    for (var i = 0; i < children.length; i++) {
                        if (children[i].nodeType == 3) {
                            //console.log("ContentEditableDirective::Wrapline => text node encountered");
                            lstText.push(children[i].textContent);
                            continue;
                        }
                        if (children[i].nodeType == 1) {
                            switch (children[i].nodeName) {
                                case ("I"):
                                    {
                                        //console.log("ContentEditableDirective::Wrapline => I node encountered");

                                        lstText.push(children[i].textContent);
                                        break;
                                    }
                                case ("U"):
                                    {
                                        //console.log("ContentEditableDirective::Wrapline => U node encountered");

                                        lstText.push(children[i].textContent);
                                        break;
                                    }
                                case ("P"):
                                    {
                                        //console.log("ContentEditableDirective::Wrapline => P node encountered");

                                        break;
                                    }
                                default:
                                    {
                                        //console.log("ContentEditableDirective::Wrapline => Unknown Tag " + children[i].nodeName + "encountered");
                                        break;
                                    }

                            }//switch (children[i].nodeName)
                        }//if (children[i].nodeType == 1)

                    }//for (var i = 0; i < children.length; i++)

                    //var lstText: Array<string> = new Array<string>();
                    var prefixText: string = "";
                    for (var j = 0; j < lstText.length; j++) {
                        prefixText += lstText[j];
                    }
                    var newPElement = document.createElement("P");
                    var prefixTextElement = document.createTextNode(prefixText);
                    newPElement.appendChild(prefixTextElement);

                    //TODO-AFTER-CR:Remove All Children
                    var fc = divElement.firstChild;
                    while (fc) {
                        divElement.removeChild(fc);
                        fc = divElement.firstChild;
                    }

                    divElement.appendChild(newPElement);

                    //TODO-AFTER-CR: Call Set Cursor Position function
                    //Set Cursor Position
                    var range = document.createRange();
                    var sel = window.getSelection();
                    range.setStart(divElement.childNodes[0].lastChild, divElement.childNodes[0].lastChild.textContent.length);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    break;
                }//default:
        }//switch (element.children().length)

          }//private wrapLine(element)

         private getTextAreaAnalysisResult(): SnRSPhraseGenerator.TextAreaAnalysisResult {

             var targetSnRhythmTextAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult = new SnRSPhraseGenerator.TextAreaAnalysisResult();
             //get all the nodes of syllable text area
             //The user selected text is inside the "contentEdDiv" node, who is custom tag,
             var pTagNode = this._element.childNodes[0];


             var selectionStartContainer: Node = this.getCorrectStartingNode();
             if (selectionStartContainer.nodeType == 3) {
                 //console.log("selection Start Container is a text inside <p>");
             }

             if (selectionStartContainer.nodeType == 1) {
                 switch (selectionStartContainer.nodeName) {
                     case ("I"):
                         {
                             //console.log("SnRhythmSyllableDomBroker::getTextAreaAnalysisResult => "
                             //    + "selection Start Container is an <i> node");
                             break;
                         }
                     case ("U"):
                         {
                             //console.log("SnRhythmSyllableDomBroker::getTextAreaAnalysisResult => "
                             //    + "selection Start Container is an <u> node");
                             break;
                         }
                     case ("P"):
                         {
                             //console.log("Unexpected !!! SnRhythmSyllableDomBroker::getTextAreaAnalysisResult => "
                             //    + "selection Start Container is  <p> node");
                             break;
                         }
                     default:
                         {
                             console.log("SnRhythmSyllableDomBroker::getTextAreaAnalysisResult => "
                                 + "selection Start Container is an unhandled "
                                 + selectionStartContainer.nodeName + " node");
                             //console.log("We will need to reposition the start Container, after removing the "
                             //    + selectionStartContainer.nodeName + " node");
                             break;
                         }
                 }//switch (selectionStartContainer.nodeName)
             }// if (selectionStartContainer.nodeType == 1)

             var selectionEndContainer: Node = this.getCorrectEndingNode();

             if (selectionEndContainer.nodeType == 3) {
                 //console.log("selection End Container is a text inside <p>");
             }

             if (selectionEndContainer.nodeType == 1) {
                 switch (selectionEndContainer.nodeName) {
                     case ("I"):
                         {
                             //console.log("SnRhythmSyllableDomBroker::getTextAreaAnalysisResult => "
                             //    + "selection End Container is an <i> node");
                             break;
                         }
                     case ("U"):
                         {
                             //console.log("SnRhythmSyllableDomBroker::getTextAreaAnalysisResult => "
                             //    + "selection Start Container is an <u> node");
                             break;
                         }
                     case ("P"):
                         {
                             //console.log("Unexpected !!! SnRhythmSyllableDomBroker::getTextAreaAnalysisResult => "
                             //    + "selection End Container is  <p> node");
                             break;
                         }
                     default:
                         {
                             console.log("SnRhythmSyllableDomBroker::getTextAreaAnalysisResult => "
                                 + "selection End Container is an unhandled "
                                 + selectionEndContainer.nodeName + " node");
                             //console.log("We will need to reposition the start Container, after removing the "
                             //    + selectionEndContainer.nodeName + " node");
                             break;
                         }
                 }//switch (selectionEndContainer.nodeName)
             }// if (selectionEndContainer.nodeType == 1)


             var startOffset = window.getSelection().getRangeAt(0).startOffset;
             var endOffset = window.getSelection().getRangeAt(0).endOffset;

             var targetListOfSnRhythmTextAreaNodeDetail: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisDetail> = new Array<SnRSPhraseGenerator.TextAreaNodeAnalysisDetail>();
             //go through all node and identify the node style
             //and look for isstaring or ending node with offset
             for (var i = 0; i < pTagNode.childNodes.length; i++) {
                 var targetNodeDetail: SnRSPhraseGenerator.TextAreaNodeAnalysisDetail = new SnRSPhraseGenerator.TextAreaNodeAnalysisDetail();

                 //nodetype=3 means text node,nodetype=1 means html element,nodetype=2 means attribute.
                 //we dont expect to encounter an attribute node here in rhythmblend
                 if (pTagNode.childNodes[i].nodeType == 3) {
                     //text encountered
                     targetNodeDetail.nodeStyle = SnRSPhraseGenerator.TextAreaNodeStyle.Normal;
                     targetNodeDetail.innerText = pTagNode.childNodes[i].textContent;
                 }
                 if (pTagNode.childNodes[i].nodeType == 1) {
                     switch (pTagNode.childNodes[i].nodeName) {
                         case "I":
                             {
                                 //italic - double underline encountered
                                 targetNodeDetail.nodeStyle = SnRSPhraseGenerator.TextAreaNodeStyle.DoubleUnderline;
                                 targetNodeDetail.innerText = pTagNode.childNodes[i].textContent;
                                 break;
                             }
                         case "U":
                             {
                                 //underline encountered
                                 targetNodeDetail.nodeStyle = SnRSPhraseGenerator.TextAreaNodeStyle.Underline;
                                 targetNodeDetail.innerText = pTagNode.childNodes[i].textContent;
                                 break;
                             }
                         default:
                             {
                                 //not known node
                             }
                     }
                 }// if (pTagNode.childNodes[i].nodeType == 1) {

                 if (pTagNode.childNodes[i]===selectionStartContainer) {
                     targetNodeDetail.isStartNodeOfSelection = true;
                     targetNodeDetail.offsetOfStartNode = startOffset;
                     if (startOffset == 0) {
                         targetSnRhythmTextAreaAnalysisResult.isStartOffsetOfStartNodeIsEqualToZero = true;
                     }
                     targetSnRhythmTextAreaAnalysisResult.startContainerIndex = i;
                 }//if (pTagNode.childNodes[i].isSameNode(selectionStartContainer))

                 if (pTagNode.childNodes[i]===selectionEndContainer) {
                     targetNodeDetail.isEndNodeOfSelection = true;
                     targetNodeDetail.offsetOfEndNode = endOffset;
                     if (endOffset == selectionEndContainer.textContent.length) {
                         targetSnRhythmTextAreaAnalysisResult.isEndOffsetOfEndNodeIsEqualToLength = true;
                     }
                     targetSnRhythmTextAreaAnalysisResult.endContainerIndex = i;
                 }//if (pTagNode.childNodes[i].isSameNode(selectionEndContainer))

                 targetListOfSnRhythmTextAreaNodeDetail.push(targetNodeDetail);
                 if (targetNodeDetail.isStartNodeOfSelection == true && targetNodeDetail.isEndNodeOfSelection == true) {
                     targetSnRhythmTextAreaAnalysisResult.isStartAndEndSelectionIsSameNode = true;
                 }

             }//for (var i = 0; i < pTagNode.childNodes.length; i++)

             targetSnRhythmTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail = targetListOfSnRhythmTextAreaNodeDetail;
             return targetSnRhythmTextAreaAnalysisResult;
         }//private getTextAreaAnalysisResult(): SnRSPhraseGenerator.SnTextAreaAnalysisResult

         private getTextAreaNodeDetailAfterSplit(argSnRhythmTextAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult): SnRSPhraseGenerator.TextAreaAnalysisResultEx {
             var returnValue: SnRSPhraseGenerator.TextAreaAnalysisResultEx = null;
             if (argSnRhythmTextAreaAnalysisResult.isStartAndEndSelectionIsSameNode == true) {
                 if ((argSnRhythmTextAreaAnalysisResult.isStartOffsetOfStartNodeIsEqualToZero == true) &&
                     (argSnRhythmTextAreaAnalysisResult.isEndOffsetOfEndNodeIsEqualToLength == true)) {
                     // Here StartingContainerNode is THE SAME as the EndContainer node.
                     // and the user has selected from the VERY beginning of this node
                     // to the VERY end of this nNode
                     // Therefore, there is NO need for splitting any one of the nodes. 
                     var lstSnRhythmNodes = new Array<SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail>();
                     for (var i = 0; i < argSnRhythmTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail.length; i++) {
                         var nodeStyle = argSnRhythmTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail[i].nodeStyle;
                         var innerText = argSnRhythmTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail[i].innerText;
                         lstSnRhythmNodes.push(new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(nodeStyle, innerText));
                     }
                     returnValue = new SnRSPhraseGenerator.TextAreaAnalysisResultEx(lstSnRhythmNodes,
                         argSnRhythmTextAreaAnalysisResult.startContainerIndex, argSnRhythmTextAreaAnalysisResult.endContainerIndex);
                     return returnValue;

                 }
                 return (this.getAnalysisResultExForSelectionWithinSameNodeRequiringSplit(argSnRhythmTextAreaAnalysisResult));
             }//if (argSnRhythmTextAreaAnalysisResult.isStartAndEndSelectionIsSameNode == true)
             else {
                 return (this.getAnalysisResultExForSelectionAcrossDifferentNodes(argSnRhythmTextAreaAnalysisResult));
             }
         }//private getTextAreaNodeDetailAfterSplit(argSnRhythmTextAreaAnalysisResult: SnRSPhraseGenerator.SnTextAreaAnalysisResult): SnRSPhraseGenerator.SnTextAreaAnalysisResultEx

         private getAnalysisResultExForSelectionAcrossDifferentNodes(
             argTextAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult): SnRSPhraseGenerator.TextAreaAnalysisResultEx {
             var returnValue: SnRSPhraseGenerator.TextAreaAnalysisResultEx = null;
             //returnValue = new SnRhythmTextAreaAnalysisResultEx(lstSnRhythmNodes,
             //    argSnRhythmTextAreaAnalysisResult.startContainerIndex, argSnRhythmTextAreaAnalysisResult.endContainerIndex);

             var currentListOfNodeDetail: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisDetail> =
                 argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail;
             var targetListOfRhythmNode: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail> = new Array<SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail>();

             for (var i = 0; i < currentListOfNodeDetail.length; i++) {
                 if (currentListOfNodeDetail[i].isStartNodeOfSelection == true) {
                     var leftSideSplitNodeStyle = currentListOfNodeDetail[i].nodeStyle;
                     var leftSideSplitNodeInnerText =
                         currentListOfNodeDetail[i].innerText.substring(0,
                             currentListOfNodeDetail[i].offsetOfStartNode);
                     if (leftSideSplitNodeInnerText.length > 0) {
                         var leftSideARhythmNodeAfterSplit: SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail =
                             new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(leftSideSplitNodeStyle, leftSideSplitNodeInnerText);
                         targetListOfRhythmNode.push(leftSideARhythmNodeAfterSplit);
                     }

                     var rightSideSplitNodeStyle = currentListOfNodeDetail[i].nodeStyle;
                     var rightSideSplitNodeInnerText =
                         currentListOfNodeDetail[i].innerText.substring(currentListOfNodeDetail[i].offsetOfStartNode,
                             currentListOfNodeDetail[i].innerText.length);
                     if (rightSideSplitNodeInnerText.length > 0) {
                         var rightSideRhythmNodeAfterSplit: SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail =
                             new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(rightSideSplitNodeStyle, rightSideSplitNodeInnerText);
                         targetListOfRhythmNode.push(rightSideRhythmNodeAfterSplit);
                         var startContainerIndex = targetListOfRhythmNode.length - 1;
                     }
                     else {
                         var startContainerIndex = targetListOfRhythmNode.length;
                     }
                     continue;
                 }
                 if (currentListOfNodeDetail[i].isEndNodeOfSelection == true) {
                     var leftSideSplitNodeStyle = currentListOfNodeDetail[i].nodeStyle;
                     var leftSideSplitNodeInnerText =
                         currentListOfNodeDetail[i].innerText.substring(0,
                             currentListOfNodeDetail[i].offsetOfEndNode);
                     if (leftSideSplitNodeInnerText.length > 0) {
                         var leftSideARhythmNodeAfterSplit: SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail =
                             new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(leftSideSplitNodeStyle, leftSideSplitNodeInnerText);
                         targetListOfRhythmNode.push(leftSideARhythmNodeAfterSplit);
                         var endContainerIndex = targetListOfRhythmNode.length - 1;
                     }
                     else {
                         var endContainerIndex = targetListOfRhythmNode.length - 1;
                     }

                     var rightSideSplitNodeStyle = currentListOfNodeDetail[i].nodeStyle;
                     var rightSideSplitNodeInnerText =
                         currentListOfNodeDetail[i].innerText.substring(currentListOfNodeDetail[i].offsetOfEndNode,
                             currentListOfNodeDetail[i].innerText.length);
                     if (rightSideSplitNodeInnerText.length > 0) {
                         var rightSideRhythmNodeAfterSplit: SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail =
                             new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(rightSideSplitNodeStyle, rightSideSplitNodeInnerText);
                         targetListOfRhythmNode.push(rightSideRhythmNodeAfterSplit);
                     }
                     continue;
                 }
                 targetListOfRhythmNode.push(new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(currentListOfNodeDetail[i].nodeStyle, currentListOfNodeDetail[i].innerText));
             }// for (var i = 0; i < currentListOfNodeDetail.length;i++)

             returnValue = new SnRSPhraseGenerator.TextAreaAnalysisResultEx(targetListOfRhythmNode, startContainerIndex, endContainerIndex);
             return returnValue;

         }//private getTargetListForNotSameNode(argTextAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult) {

         private getAnalysisResultExForSelectionWithinSameNodeRequiringSplit(argTextAreaAnalysisResult: SnRSPhraseGenerator.TextAreaAnalysisResult): SnRSPhraseGenerator.TextAreaAnalysisResultEx {
             var returnValue: SnRSPhraseGenerator.TextAreaAnalysisResultEx = null;

             //returnValue = new SnRhythmTextAreaAnalysisResultEx(lstSnRhythmNodes,
             //    argSnRhythmTextAreaAnalysisResult.startContainerIndex, argSnRhythmTextAreaAnalysisResult.endContainerIndex);

             var currentListOfNodeDetail: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisDetail> = argTextAreaAnalysisResult.listOfSnRhythmTextAreaNodeDetail;
             var targetListOfRhythmNode: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail> = new Array<SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail>();
             for (var i = 0; i < currentListOfNodeDetail.length; i++) {
                 if ((currentListOfNodeDetail[i].isStartNodeOfSelection == true)
                     && (currentListOfNodeDetail[i].isEndNodeOfSelection == true)) {
                     //SELECTION LIES INSIDE  NODE
                     if ((argTextAreaAnalysisResult.isStartOffsetOfStartNodeIsEqualToZero == false)
                         && (argTextAreaAnalysisResult.isEndOffsetOfEndNodeIsEqualToLength == false)) {
                         var leftSideSplitNodeStyle = currentListOfNodeDetail[i].nodeStyle;
                         var leftSideSplitNodeInnerText =
                             currentListOfNodeDetail[i].innerText.substring(0, currentListOfNodeDetail[i].offsetOfStartNode);
                         var leftSideRhythmNodeAfterSplit: SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail = new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(leftSideSplitNodeStyle, leftSideSplitNodeInnerText);
                         targetListOfRhythmNode.push(leftSideRhythmNodeAfterSplit);

                         var middleNodeStyle = currentListOfNodeDetail[i].nodeStyle;
                         var middleInnerText =
                             currentListOfNodeDetail[i].innerText.substring(currentListOfNodeDetail[i].offsetOfStartNode,
                                 currentListOfNodeDetail[i].offsetOfEndNode);
                         var middleRhythmNodeAfterSplit = new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(middleNodeStyle, middleInnerText);
                         targetListOfRhythmNode.push(middleRhythmNodeAfterSplit);
                         var startContainerIndex = targetListOfRhythmNode.length - 1;
                         var endContainerIndex = targetListOfRhythmNode.length - 1;

                         var rightSideSplitNodeStyle = currentListOfNodeDetail[i].nodeStyle;
                         var rightSideSpliNodeInnerText =
                             currentListOfNodeDetail[i].innerText.substring(currentListOfNodeDetail[i].offsetOfEndNode,
                                 currentListOfNodeDetail[i].innerText.length);
                         var rightSidehythmNode: SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail = new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(rightSideSplitNodeStyle, rightSideSpliNodeInnerText);
                         targetListOfRhythmNode.push(rightSidehythmNode);
                     }

                     //selection start at 0 and end lies inside the node
                     if ((argTextAreaAnalysisResult.isStartOffsetOfStartNodeIsEqualToZero == true)
                         && (argTextAreaAnalysisResult.isEndOffsetOfEndNodeIsEqualToLength == false)) {
                         var leftSideSplitNodeStyle = currentListOfNodeDetail[i].nodeStyle;
                         var leftSideSplitNodeInnerText =
                             currentListOfNodeDetail[i].innerText.substring(0,
                                 currentListOfNodeDetail[i].offsetOfEndNode);
                         var leftSideRhythmNodeAfterSplit: SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail = new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(leftSideSplitNodeStyle, leftSideSplitNodeInnerText);
                         targetListOfRhythmNode.push(leftSideRhythmNodeAfterSplit);
                         var startContainerIndex = targetListOfRhythmNode.length - 1;
                         var endContainerIndex = targetListOfRhythmNode.length - 1;


                         var rightSideSplitNodeStyle = currentListOfNodeDetail[i].nodeStyle;
                         var rightSideSplitNodeInnerText =
                             currentListOfNodeDetail[i].innerText.substring(currentListOfNodeDetail[i].offsetOfEndNode,
                                 currentListOfNodeDetail[i].innerText.length);
                         var rightSideRhythmNodeAfterSplit = new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(rightSideSplitNodeStyle, rightSideSplitNodeInnerText);
                         targetListOfRhythmNode.push(rightSideRhythmNodeAfterSplit);
                     }

                     // selection start at midddle and goes till middle
                     if ((argTextAreaAnalysisResult.isStartOffsetOfStartNodeIsEqualToZero == false)
                         && (argTextAreaAnalysisResult.isEndOffsetOfEndNodeIsEqualToLength == true)) {
                         var leftSideSplitNodeStyle = currentListOfNodeDetail[i].nodeStyle;
                         var leftSideSplitNodeInnerText = currentListOfNodeDetail[i].innerText.substring(0, currentListOfNodeDetail[i].offsetOfStartNode);
                         var leftSideRhythmNodeAfterSplit: SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail = new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(leftSideSplitNodeStyle, leftSideSplitNodeInnerText);
                         targetListOfRhythmNode.push(leftSideRhythmNodeAfterSplit);

                         var rightSideSplitNodeStyle = currentListOfNodeDetail[i].nodeStyle;
                         var rightSideSplitNodeInnerText = currentListOfNodeDetail[i].innerText.substring(currentListOfNodeDetail[i].offsetOfStartNode, currentListOfNodeDetail[i].innerText.length);
                         var rightSideRhythmNodeAfterSplit: SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail = new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(rightSideSplitNodeStyle, rightSideSplitNodeInnerText);
                         targetListOfRhythmNode.push(rightSideRhythmNodeAfterSplit);
                         var startContainerIndex = targetListOfRhythmNode.length - 1;
                         var endContainerIndex = targetListOfRhythmNode.length - 1;
                     }

                 }// if (currentListOfNodeDetail[i].isStartNodeOfSelection == true && currentListOfNodeDetail[i].isEndNodeOfSelection==true) {

                 //this are the node where split is not required
                 else {
                     targetListOfRhythmNode.push(new SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail(currentListOfNodeDetail[i].nodeStyle, currentListOfNodeDetail[i].innerText));
                 }
             }//for (var i = 0; i < currentListOfNodeDetail.length; i++)

             returnValue = new SnRSPhraseGenerator.TextAreaAnalysisResultEx(targetListOfRhythmNode, startContainerIndex, endContainerIndex);
             return returnValue;
         }


         private getPNode(): Node {
             var pTagNode = this._element.childNodes[0];
             return pTagNode;
         }//private getPNode():Node

         private removeAllChildrenOfPTag() {
             var pTagNode = this.getPNode();
             if (pTagNode == null)
                 return;

             var fc = pTagNode.firstChild;

             while (fc) {
                 pTagNode.removeChild(fc);
                 fc = pTagNode.firstChild;
             }

         }//private removeAllChildrenOfPTag() {

         private cleanAndFillPTagWithContentsOfList(argSnTextAreaNodeDetails: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisDetail>) {
             this.removeAllChildrenOfPTag();
             if ((argSnTextAreaNodeDetails == null) || (argSnTextAreaNodeDetails.length == 0))
                 return;

             var pNode = this.getPNode();

             for (var i = 0; i < argSnTextAreaNodeDetails.length; i++) {
                 var rtanDetail: SnRSPhraseGenerator.TextAreaNodeAnalysisDetail = argSnTextAreaNodeDetails[i];
                 switch (rtanDetail.nodeStyle) {
                     case (SnRSPhraseGenerator.TextAreaNodeStyle.Normal):
                         {
                             var normalElement = document.createTextNode(rtanDetail.innerText);
                             // normalElement.nodeValue = normalElement.nodeValue.replace(/\u00a0/g, " ");
                             pNode.appendChild(normalElement);
                             break;
                         }
                     case (SnRSPhraseGenerator.TextAreaNodeStyle.Underline):
                         {
                             var underlinedElement = document.createElement("u");
                             var textNode = document.createTextNode(rtanDetail.innerText);
                             underlinedElement.appendChild(textNode);
                             //underlinedElement.innerText = rtanDetail.innerText;
                             //underlinedElement.innerText = underlinedElement.innerText.replace(/\u00a0/g, " ");
                             pNode.appendChild(underlinedElement);
                             break;
                         }
                     case (SnRSPhraseGenerator.TextAreaNodeStyle.DoubleUnderline):
                         {
                             var doubleUnderlinedElement = document.createElement("i");
                             var textNode = document.createTextNode(rtanDetail.innerText);
                             doubleUnderlinedElement.appendChild(textNode);
                             //doubleUnderlinedElement.innerText = rtanDetail.innerText;
                             //doubleUnderlinedElement.innerText = doubleUnderlinedElement.innerText.replace(/\u00a0/g, " ");
                             pNode.appendChild(doubleUnderlinedElement);
                             break;
                         }
                     case (SnRSPhraseGenerator.TextAreaNodeStyle.TextNode):
                         {
                             var textElement = document.createTextNode(rtanDetail.innerText);
                             pNode.appendChild(textElement);
                             break;
                         }
                     default: //case (SnRSPhraseGenerator.TextAreaNodeStyle.Unknown
                         {
                             console.log("DOMBroker:cleanAndFillPTagWithContentsOfList() => We should never reach here !!");
                             break;
                         }
                 }//switch (rtanDetail.nodeStyle)
             }//for (var i = 0; i < argSnTextAreaNodeDetails.length; i++)

         }//private cleanAndFillPTagWithContentsOfList(argSnTextAreaNodeDetails: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisDetail>)

         private removeCharacterAtZeroBasedIndex(argInputString: string, argZeroBasedIndex: number): string {
             if (argZeroBasedIndex < 0)
                 return argInputString;

             if (argInputString.length <= argZeroBasedIndex) {
                 return argInputString;
             }

             //to remove the fourth character:
             //str.slice(0, 4) + str.slice(5, str.length))
             var returnValue: string = argInputString.slice(0, argZeroBasedIndex) + argInputString.slice(argZeroBasedIndex + 1, argInputString.length);
             return returnValue;
         }//private removeCharacterAtZeroBasedIndex(argInputString: string, argZeroBasedIndex: number): string {

         private getCorrectStartingNode(): Node {
             var selectionStartContainer = null;
             if (window.getSelection().getRangeAt(0).startContainer.nodeType == 3) {
                 if (window.getSelection().getRangeAt(0).startContainer.parentNode.nodeName == "I" || window.getSelection().getRangeAt(0).startContainer.parentNode.nodeName == "U") {
                     selectionStartContainer = window.getSelection().getRangeAt(0).startContainer.parentNode;
                 }
                 else {
                     selectionStartContainer = window.getSelection().getRangeAt(0).startContainer;
                 }
             }
             else {
                 selectionStartContainer = window.getSelection().getRangeAt(0).startContainer;
             }
             return selectionStartContainer;
         }//private getCorrectStartingNode(): Node

         private getCorrectEndingNode(): Node {
             var selectionEndContainer = null;
             if (window.getSelection().getRangeAt(0).endContainer.nodeType == 3) {
                 if (window.getSelection().getRangeAt(0).endContainer.parentNode.nodeName == "I" || window.getSelection().getRangeAt(0).endContainer.parentNode.nodeName == "U") {
                     selectionEndContainer = window.getSelection().getRangeAt(0).endContainer.parentNode;
                 } else {
                     selectionEndContainer = window.getSelection().getRangeAt(0).endContainer;
                 }
             }
             else {
                 selectionEndContainer = window.getSelection().getRangeAt(0).endContainer;
             }
             return selectionEndContainer;
         }//private getCorrectEndingNode(): Node

         private createHTMLNodeListAndReplaceTextArea(argTextAreaAnalysisObjectEx: SnRSPhraseGenerator.TextAreaAnalysisResultEx) {
             var listOfStyleAppliedRhythmNode: Array<SnRSPhraseGenerator.TextAreaNodeAnalysisResultExDetail> = argTextAreaAnalysisObjectEx._rhythmNodesList;
             //remove all child of p of contenteditable div
             var pTagNode = this._element.childNodes[0];
             var fc = pTagNode.firstChild;

             while (fc) {
                 pTagNode.removeChild(fc);
                 fc = pTagNode.firstChild;
             }

             //create append the new html node one after another from argListOfStyleAppliedRhythmNode
             for (var i = 0; i < listOfStyleAppliedRhythmNode.length; i++) {
                 //var targetText = this.insertSpaceBothEnd(listOfStyleAppliedRhythmNode[i].nodeInnerText); 
                 var targetText = listOfStyleAppliedRhythmNode[i].nodeInnerText;
                 var targetHTMLNode = this.createNodeofGivenStyle(targetText, listOfStyleAppliedRhythmNode[i].nodeStyle);
                 if (targetHTMLNode != null) {
                     pTagNode.appendChild(targetHTMLNode);
                 }
             }

             this.bringBackFocus(pTagNode, argTextAreaAnalysisObjectEx._endContainerIndex);
         }

         //This function will set the cursor at a specific offset in a specific node inside pTag
         private setCursorLocation(argPNode: Node,argTargetNodeIndex: number,argTargetOffset: number) {
             if ((argPNode != null) && (argPNode.childNodes.length != 0)) {

                 //console.log("After backspace, list of new node is= " + argPNode);
                 //console.log("After backspace cursor node index= " + argTargetNodeIndex);
                 //console.log("After backspace cursor position inside node index= " + argTargetOffset);
                 var newRange = document.createRange();
                 var s = window.getSelection();

                 if (argPNode.childNodes[argTargetNodeIndex].nodeType == 3)
                     newRange.setStart(argPNode.childNodes[argTargetNodeIndex],
                         argTargetOffset);
                 else
                     newRange.setStart(argPNode.childNodes[argTargetNodeIndex].firstChild,
                         argTargetOffset);

                 s.removeAllRanges();
                 s.addRange(newRange);

                 this._element.focus();
             } //if ((argNode != null) && (argNode.childNodes.length != 0))
         }

         //we bring back focus to the text area in order to ensure that angular updates the model.
         //when focus is brought back,implicitly an on focus event is generated.
         //we have added code in the on focus handler present in the contenteditable directive to update angular model
         private bringBackFocus(argNode: Node, argEndContainerIndex: number) {

             if ((argNode != null) && (argNode.childNodes.length != 0)) {
                 var newRange = document.createRange();
                 var s = window.getSelection();

                 //newRange.setStart(argNode, argEndContainerIndex+1);
                 //newRange.collapse(true);
                 if (argNode.childNodes[argEndContainerIndex].nodeType == 3)
                     newRange.setStart(argNode.childNodes[argEndContainerIndex],
                         argNode.childNodes[argEndContainerIndex].textContent.length);
                 else
                     newRange.setStart(argNode.childNodes[argEndContainerIndex].firstChild,
                         argNode.childNodes[argEndContainerIndex].firstChild.textContent.length);
                 s.removeAllRanges();
                 s.addRange(newRange);

                 this._element.focus();
             } //if ((argNode != null) && (argNode.childNodes.length != 0))

         }//private bringBackFocus(argNode: Node, argEndContainerIndex: number)

         private createNodeofGivenStyle(argTextContent: string, argNewStyle: SnRSPhraseGenerator.TextAreaNodeStyle): Node {

             switch (argNewStyle) {
                 case SnRSPhraseGenerator.TextAreaNodeStyle.Underline:
                     {
                         var newUnderlinedNode = document.createElement("U");
                         var t = document.createTextNode(argTextContent);
                         newUnderlinedNode.appendChild(t);

                         return newUnderlinedNode;
                     }

                 case SnRSPhraseGenerator.TextAreaNodeStyle.DoubleUnderline:
                     {
                         var newDoubleUnderlinedNode = document.createElement("I");
                         var t = document.createTextNode(argTextContent);
                         newDoubleUnderlinedNode.appendChild(t);
                         return newDoubleUnderlinedNode;
                     }

                 case SnRSPhraseGenerator.TextAreaNodeStyle.Normal:
                     {
                         var newNormalNode = document.createTextNode(argTextContent);
                         return newNormalNode;

                     }
                 case SnRSPhraseGenerator.TextAreaNodeStyle.TextNode:
                     {
                         console.log("DOMBroker::createNodeofGivenStyle() Unexpected TextNode Encountered !!!");
                         return null;
                     }
                 default:
                     {
                         console.log("DOMBroker::createNodeofGivenStyle() Unexpected Undefined Node Encountered !!!");
                         return null;
                     }

             }//switch (argNewStyle)

             //return newNode;

         }//private createNodeofGivenStyle(argTextContent: string, argNewStyle: SnRSPhraseGenerator.TextAreaNodeStyle): Node


          createHTMLNodeListAndReplaceTextAreaAfterUndoRedo(argLstContentEditableNode: Array<SnRSPhraseGenerator.UndoRedoNodeDetail>) {
             //remove all child of p of contenteditable div
             var pTagNode = this.getPNode();
             var fc = pTagNode.firstChild;

             while (fc) {
                 pTagNode.removeChild(fc);
                 fc = pTagNode.firstChild;
             }

             var focusOffset: number = -1;
             var focusNodeIndex: number = -1;
             //create append the new html node one after another from argListOfStyleAppliedRhythmNode
             for (var i = 0; i < argLstContentEditableNode.length; i++) {
                 //var targetText = this.insertSpaceBothEnd(listOfStyleAppliedRhythmNode[i].nodeInnerText); 
                 var targetText = argLstContentEditableNode[i].nodeInnerText;
                 var targetHTMLNode = this.createNodeofGivenStyle(targetText, argLstContentEditableNode[i].nodeStyle);
                 if (targetHTMLNode != null) {
                     pTagNode.appendChild(targetHTMLNode);
                     if (argLstContentEditableNode[i].isfocusNode == true) {
                         focusOffset = argLstContentEditableNode[i].offsetInsideNode;
                         focusNodeIndex = i;
                     }
                 }

             }

             this.setCursorLocation(pTagNode, focusNodeIndex, focusOffset);
         }

    }
}