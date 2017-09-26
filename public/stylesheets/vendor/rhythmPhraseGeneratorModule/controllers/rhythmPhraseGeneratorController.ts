module SnRSPhraseGenerator.controllers {
    interface syllableGeneratorInput {
        InputText: string;
        PresetId: string;
    }

    export class SnRSPhraseGeneratorController {
        syllableGeneratorInput: syllableGeneratorInput;
        listOfpresets: any;
        service: SnRSPhraseGenerator.services.RSPhraseGeneratorService;
        lstOfgeneratedSyllables: any;
        syllableVariationMenuOptions = [];
        scope: any;
        isSyllableListDisplay: boolean;
        phraseActionOptionMenu= [];
            
        static $inject = ["$scope","RSPhraseGenerator.services.RSPhraseGeneratorService"];
        constructor(scope,service: SnRSPhraseGenerator.services.RSPhraseGeneratorService) {
            this.service = service;
            this.scope = scope;
            
            this.isSyllableListDisplay = false;

            this.syllableGeneratorInput = {
                InputText: "<p> </p>",
                PresetId: " "
            };

            this.service.getPresets(
                (successResponse) => {
                    this.listOfpresets = successResponse;
                },
                (errorResponse) => { console.log(errorResponse); }
            );
            this.syllableVariationMenuOptions = [
                ['variation in comma', function ($itemScope, $event, color) {
                    alert($itemScope);
                    console.log($itemScope);
                }],
                //null,
                ['variation in silence', function ($itemScope, $event, color) {
                    alert($itemScope);
                }],
                ['variation in nadai', [
                    ["half variation", function ($itemScope, $event, color) {
                       // alert($itemScope);
                    }],
                    ["quarter variation", function ($itemScope, $event, color) {
                       // alert($itemScope);
                    }]
                ]],
                ['show all variation', function ($itemScope, $event, color) {
                    $itemScope.RBPGTCtrl.generateRhythmSyllablePhrase();
                }],
            ];

            this.phraseActionOptionMenu=[['create new rhythmclip'],['replace the clip rhythm syllable']]
            //this.syllableVariationMenuOptions = [
            //    ["Different variation"],null,
            //    ["ta ki tha",[["replace rhythm syllable"],["create a new rhythmclip"]]],
            //        ["ta , tha", [["replace rhythm syllable"], ["create a new rhythmclip"]]],
            //        ["ta dheem num", [["replace rhythm syllable"], ["create a new rhythmclip"]]]
            //];
          }
        generateRhythmSyllablePhrase() {
            this.lstOfgeneratedSyllables = "";
            this.service.generateRhythmSyllablePhrase(this.syllableGeneratorInput,(successResponse) => {
                console.log(successResponse);
                this.lstOfgeneratedSyllables = successResponse;
                this.isSyllableListDisplay = true;
            },
                (errorResponse) => {
                    console.log(errorResponse);
                });
        }

        //doAfterClickOnBody() {
        //    this.isSyllableListDisplay = false;
        //}
    }
    angular.module("RSPhraseGenerator").controller("RSPhraseGenerator.controllers.SnRSPhraseGeneratorController", SnRSPhraseGeneratorController)
}