module RhythmMakerTransferApp.controller {

    export class RhythmMakerTransferController
{
    name: string;
    keywords: string;
    isDemoLoadingImageVisible: boolean;
    isProductionLoadingImageVisible: boolean;
    _enumerateProductionRhythmBlendList: Array<RhythmMakerTransferApp.model.EnumerateRhythmBlends>;
    _enumerateDemoRhythmBlendList: Array<RhythmMakerTransferApp.model.EnumerateRhythmBlends>;

    static $inject = [ "RhythmMakerTransferApp.services.RhythmMakerTransferService"];
    constructor(protected _rhythmMakerTransferService: RhythmMakerTransferApp.services.RhythmMakerTransferService) {
        this.name = "";
        this.keywords = "";
        this._enumerateProductionRhythmBlendList = new Array<RhythmMakerTransferApp.model.EnumerateRhythmBlends>();
        this._enumerateDemoRhythmBlendList = new Array<RhythmMakerTransferApp.model.EnumerateRhythmBlends>();
        this.isDemoLoadingImageVisible = false;
        this.isProductionLoadingImageVisible = false;
        this.getAllProductionRhythmBlendsFromWebApi();
        this.getAllDemoRhythmBlendsFromWebApi();
        
       }//constructor(protected _rhythmMakerMigrateService: RhythmMakerMigrateApp.services.RhythmMakerMigrateService) {

        getAllProductionRhythmBlendsFromWebApi()
        {
            this.isProductionLoadingImageVisible = true;
            this._rhythmMakerTransferService.getAllProductionRhythmBlendsFromWebApi((enumeratedRbListFromWebApi) => {
                this._enumerateProductionRhythmBlendList = enumeratedRbListFromWebApi;
                this.isProductionLoadingImageVisible = false;
            }, (errorMessage) =>
            {
                this.isProductionLoadingImageVisible = false;
                    alert(errorMessage);
            });
                
    }// getAllRhythmBlendsFromWebApi()

        getAllDemoRhythmBlendsFromWebApi() {
            this.isDemoLoadingImageVisible = true;
            this._rhythmMakerTransferService.getAllDemoRhythmBlendsFromWebApi((enumeratedRbListFromWebApi) => {
                this._enumerateDemoRhythmBlendList = enumeratedRbListFromWebApi;
                this.isDemoLoadingImageVisible = false;
            }, (errorMessage) => {
                this.isDemoLoadingImageVisible = false;
                    alert(errorMessage);
                });

        }// getAllRhythmBlendsFromWebApi()

        getRhythmBlendByNameorKeyWord(argName: string, argKeywords: string) {
            this.getDemoRhythmBlendByNameorKeyWord(argName, argKeywords);
            this.getProductionRhythmBlendByNameorKeyWord(argName, argKeywords);
        }

        getProductionRhythmBlendByNameorKeyWord(argName: string, argKeywords: string) {
            this.isProductionLoadingImageVisible = true;
            this._enumerateProductionRhythmBlendList = new Array<RhythmMakerTransferApp.model.EnumerateRhythmBlends>();
            if ((argName !== "") && (argKeywords !== ""))
            {
                
                this._rhythmMakerTransferService.getProductionRhythmBlendsByNameAndKeywordFromWebApi(argName, argKeywords,
                    (enumeratedRbListFromWebApi) =>
                    {
                        this.isProductionLoadingImageVisible = false;
                        this._enumerateProductionRhythmBlendList = enumeratedRbListFromWebApi;
                    },
                    (errorMessage) =>
                    {
                        this.isProductionLoadingImageVisible = false;
                        alert(errorMessage);
                    });

            }
            else {
                if (argName !== "") {
                    this._rhythmMakerTransferService.getProductionRhythmBlendsByNameFromWebApi(argName,
                        (enumeratedRbListByNameFromWebApi) => {
                            this.isProductionLoadingImageVisible = false;
                            this._enumerateProductionRhythmBlendList = enumeratedRbListByNameFromWebApi;
                        },
                        (errorMessage) => {
                            this.isProductionLoadingImageVisible = false;
                                  alert(errorMessage);
                        });
                }
                else
                {
                    this._rhythmMakerTransferService.getProductionRhythmBlendsByKeywordFromWebApi( argKeywords,
                        (enumeratedRbListByKeywordsFromWebApi) =>
                        {
                            this.isProductionLoadingImageVisible = false;
                            this._enumerateProductionRhythmBlendList = enumeratedRbListByKeywordsFromWebApi;
                        },
                        (errorMessage) =>
                        {
                            this.isProductionLoadingImageVisible = false;
                                 alert(errorMessage);
                        });
                }

            }
        }// getOldRhythmBlendByNameorKeyWord(argName: string,argKeywords:string){

        getDemoRhythmBlendByNameorKeyWord(argName: string, argKeywords: string) {
            this.isDemoLoadingImageVisible = true;
            this._enumerateDemoRhythmBlendList = new Array<RhythmMakerTransferApp.model.EnumerateRhythmBlends>();
            if ((argName !== "") && (argKeywords !== "")) {

                this._rhythmMakerTransferService.getDemoRhythmBlendsByNameAndKeywordFromWebApi(argName, argKeywords,
                    (enumeratedRbListFromWebApi) => {
                        this.isDemoLoadingImageVisible = false;
                        this._enumerateDemoRhythmBlendList = enumeratedRbListFromWebApi;
                    },
                    (errorMessage) => {
                        this.isDemoLoadingImageVisible = false;
                        alert(errorMessage);
                    });

            }
            else {
                if (argName !== "") {
                    this._rhythmMakerTransferService.getDemoRhythmBlendsByNameFromWebApi(argName,
                        (enumeratedRbListByNameFromWebApi) => {
                            this.isDemoLoadingImageVisible = false;
                            this._enumerateDemoRhythmBlendList = enumeratedRbListByNameFromWebApi;
                        },
                        (errorMessage) => {
                            this.isDemoLoadingImageVisible = false;
                            alert(errorMessage);
                        });
                }
                else {
                    this._rhythmMakerTransferService.getDemoRhythmBlendsByKeywordFromWebApi(argKeywords,
                        (enumeratedRbListByKeywordsFromWebApi) => {
                            this.isDemoLoadingImageVisible = false;
                            this._enumerateDemoRhythmBlendList = enumeratedRbListByKeywordsFromWebApi;
                        },
                        (errorMessage) => {
                            this.isDemoLoadingImageVisible = false;
                            alert(errorMessage);
                        });
                }

            }
        }// getOldRhythmBlendByNameorKeyWord(argName: string,argKeywords:string){

        transferFromProductionToDemo(argRhythmId: string) {
            this.isDemoLoadingImageVisible = true;
            this._rhythmMakerTransferService.transferFromProductionToDemo(argRhythmId,
                (successMessage) => {
                    this.isDemoLoadingImageVisible = false;
                    if ((this.name == "") && (this.keywords == "")) {
                        this.getAllDemoRhythmBlendsFromWebApi();
                    }
                    else {
                        this.getDemoRhythmBlendByNameorKeyWord(this.name, this.keywords);
                    }
                    alert(successMessage);
                },
                (errorMessage) => {
                    this.isDemoLoadingImageVisible = false;
                    alert(errorMessage);
                }
            );
        }
        transferFromDemoToProduction(argRhythmId: string) {
            this.isProductionLoadingImageVisible = true;
            this._rhythmMakerTransferService.transferFromDemoToProduction (argRhythmId,
                (successMessage) => {
                    this.isDemoLoadingImageVisible = false;
                    if ((this.name == "") && (this.keywords == "")) {
                        this.getAllProductionRhythmBlendsFromWebApi();
                    }
                    else {
                        this.getProductionRhythmBlendByNameorKeyWord(this.name, this.keywords);
                    }
                    alert(successMessage);
                },
                (errorMessage) => {
                    this.isDemoLoadingImageVisible = false;
                    alert(errorMessage);
                }
            );
        }

        deleteDemoRhythmBlend(argRhythmBlendId: string) {
            this._rhythmMakerTransferService.deleteDemoRhythmBlend(argRhythmBlendId,
                (successResponse) => {
                    alert(successResponse);
                    if ((this.name == "") && (this.keywords == "")) {
                        this.getAllDemoRhythmBlendsFromWebApi();
                    }
                    else {
                        this.getDemoRhythmBlendByNameorKeyWord(this.name, this.keywords); 
                    }
                },
                (errorResponse) => {
                    alert(errorResponse);
                }
            );
        }

        deleteProductionRhythmBlend(argRhythmBlendId: string) {
            this._rhythmMakerTransferService.deleteProductionRhythmBlend(argRhythmBlendId,
                (successResponse) => {
                    alert(successResponse);
                    if ((this.name == "") && (this.keywords == "")) {
                        this.getAllProductionRhythmBlendsFromWebApi();
                    }
                    else {
                        this.getProductionRhythmBlendByNameorKeyWord(this.name, this.keywords);
                    }
                },
                (errorResponse) => {
                    alert(errorResponse);
                }
            );
        }

        playDemoRhythmBlendSound(argRhythmBlendId: string) {
            var audio = new Audio("/getDemoRhythmBlendSound?id=" + argRhythmBlendId);
            audio.play();
        }

        playProductionRhythmBlendSound(argRhythmBlendId: string) {
            var audio = new Audio("/getProductionRhythmBlendSound?id=" + argRhythmBlendId);
            audio.play();
        }
    }//export class RhythmMakerMigrateController
    angular.module("RhythmMakerTransferApp").controller("RhythmMakerTransferApp.controllers.RhythmMakerTransferController", RhythmMakerTransferController);
}
