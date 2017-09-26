module RhythmMakerMigrateApp.controller {

export class RhythmMakerMigrateController
{
    name: string;
    keywords: string;
    isLoadingImageVisible: boolean;
    _enumerateRhythmBlendList:Array<RhythmMakerMigrateApp.model.EnumerateOldRhythmBlends>;
    static $inject = [ "RhythmMakerMigrateApp.services.RhythmMakerMigrateService"];
    constructor(protected _rhythmMakerMigrateService: RhythmMakerMigrateApp.services.RhythmMakerMigrateService) {
        this.name = "";
        this.keywords = "";
        this._enumerateRhythmBlendList = new Array<RhythmMakerMigrateApp.model.EnumerateOldRhythmBlends>();
        this.isLoadingImageVisible = false;
        this.getAllRhythmBlendsFromWebApi();
        
       }//constructor(protected _rhythmMakerMigrateService: RhythmMakerMigrateApp.services.RhythmMakerMigrateService) {

    migrateRhythmBlend(argRhythmClipId: string) {
        this.isLoadingImageVisible = true;
        if (argRhythmClipId != "") {
            this._rhythmMakerMigrateService.migrate(argRhythmClipId, (successmessage) => {
                this.isLoadingImageVisible = false;
                if ((this.name == "") && (this.keywords == ""))
                    this.getAllRhythmBlendsFromWebApi();
                else
                    this.getOldRhythmBlendByNameorKeyWord(this.name, this.keywords);
                alert(successmessage);
            },
                (errormessage) => {
                    this.isLoadingImageVisible = false;
                    alert(errormessage);
                });
        }
        else {
            alert("null input passed in"); 

        }
    }// migrateRhythmBlend(argRhythmClipId: string)

        getAllRhythmBlendsFromWebApi()
        {
            this.isLoadingImageVisible = true;
            this._rhythmMakerMigrateService.getAllRhythmBlendsFromWebApi((enumeratedRbListFromWebApi) => {
                this._enumerateRhythmBlendList = enumeratedRbListFromWebApi;
                this.isLoadingImageVisible = false;
            }, (errorMessage) =>
            {
                this.isLoadingImageVisible = false;
                    alert(errorMessage);
            });
                
    }// getAllRhythmBlendsFromWebApi()


        getOldRhythmBlendByNameorKeyWord(argName: string, argKeywords: string) {
            this.isLoadingImageVisible = true;
            this._enumerateRhythmBlendList = new Array<RhythmMakerMigrateApp.model.EnumerateOldRhythmBlends>();
            if ((argName !== "") && (argKeywords !== ""))
            {
                
                this._rhythmMakerMigrateService.getRhythmBlendsByNameAndKeywordFromWebApi(argName, argKeywords,
                    (enumeratedRbListFromWebApi) =>
                    {
                        this.isLoadingImageVisible = false;
                        this._enumerateRhythmBlendList = enumeratedRbListFromWebApi;
                    },
                    (errorMessage) =>
                    {
                        this.isLoadingImageVisible = false;
                        alert(errorMessage);
                    });

            }
            else {
                if (argName !== "") {
                    this._rhythmMakerMigrateService.getRhythmBlendsByNameFromWebApi(argName,
                        (enumeratedRbListByNameFromWebApi) => {
                            this.isLoadingImageVisible = false;
                                 this._enumerateRhythmBlendList = enumeratedRbListByNameFromWebApi;
                        },
                        (errorMessage) => {
                            this.isLoadingImageVisible = false;
                                  alert(errorMessage);
                        });
                }
                else
                {
                    this._rhythmMakerMigrateService.getRhythmBlendsByKeywordFromWebApi( argKeywords,
                        (enumeratedRbListByKeywordsFromWebApi) =>
                        {
                            this.isLoadingImageVisible = false;
                                 this._enumerateRhythmBlendList = enumeratedRbListByKeywordsFromWebApi;
                        },
                        (errorMessage) =>
                        {
                            this.isLoadingImageVisible = false;
                                 alert(errorMessage);
                        });
                }

            }
        }// getOldRhythmBlendByNameorKeyWord(argName: string,argKeywords:string){

   

    }//export class RhythmMakerMigrateController
    angular.module("RhythmMakerMigrateApp").controller("RhythmMakerMigrateApp.controllers.RhythmMakerMigrateController", RhythmMakerMigrateController);
}
