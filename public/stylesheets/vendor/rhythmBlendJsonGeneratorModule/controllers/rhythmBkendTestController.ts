module rhythmBlendTestingApp.controllers {

    export class rhythmBlendTestingAppController {

        createRhythmBlendJSON: rhythmBlendTestingApp.viewmodels.createRhythmBlendJSON;
       
        _service: rhythmBlendTestingApp.services.rhythmBlendTestingAppService;
        listOfRhythmBlendJSON: any;
        isLoadingImageVisible: boolean;
        listOfpresets: any;

        static $inject = ["rhythmBlendTestingApp.services.rhythmBlendTestingAppService"];
        constructor(argrhythmBlendTestingAppService: rhythmBlendTestingApp.services.rhythmBlendTestingAppService) {
            this._service = argrhythmBlendTestingAppService;
            this.ShowTrackDetails();
            this.getListOfRhythmBlend();
            this.listOfRhythmBlendJSON = [];
            this.isLoadingImageVisible = false;

            this._service.getPresets(
                (successResponse) => {
                    this.listOfpresets = successResponse;
                },
                (errorResponse) => { console.log(errorResponse); }
            );
        }

        getListOfRhythmBlend = () => {
            this._service.getListofRhythmBlendJson((listofRhythmBlendJSON) => {

                this.listOfRhythmBlendJSON = listofRhythmBlendJSON.ListOfRhythmBlendJSON;
                console.log(this.listOfRhythmBlendJSON);
            }, (error) => {

                });
        }

        ShowTrackDetails= () => {
           
           
            var targetTrackDetailList = new Array<rhythmBlendTestingApp.viewmodels.trackDetails>();
           
            targetTrackDetailList.push(new rhythmBlendTestingApp.viewmodels.trackDetails(3));
            
                this.createRhythmBlendJSON = new rhythmBlendTestingApp.viewmodels.createRhythmBlendJSON(3, targetTrackDetailList, "", "","");

            console.log(this.createRhythmBlendJSON);
        }


        addRhythmBlendTracks = () => {
            console.log("add RhythmBlend Track");
            
            this.createRhythmBlendJSON.trackDetails.push(new rhythmBlendTestingApp.viewmodels.trackDetails(1));
            console.log(this.createRhythmBlendJSON);
        }

        deleteRhythmBlendTracks = (argTrack) => {
            this.createRhythmBlendJSON.trackDetails.splice(this.createRhythmBlendJSON.trackDetails.indexOf(argTrack), 1);
        }


        generateRhythmBlendJson = () => {

            console.log("generateRhythmBlendJson is clicked");
            console.log(this.createRhythmBlendJSON);
            this._service.generateRhythmBlendJson(this.createRhythmBlendJSON,
                (successResponse) => {
                    this.getListOfRhythmBlend();

            }, (errorresponse) => {

            })
        }

        SaveAllRhythmBlend = () => {
            var noOfRunningQueries = 0;
            
            for (let i = 0; i < this.listOfRhythmBlendJSON.length; i++) {
               
                if (this.listOfRhythmBlendJSON[i].SSClientAssetTag == "0") {
                    ++noOfRunningQueries;
                    this.isLoadingImageVisible = true;
                    this._service.saveRhythmBlends(this.listOfRhythmBlendJSON[i], (successResponse) => {
                        this.listOfRhythmBlendJSON[i].SSClientAssetTag = "1";
                        --noOfRunningQueries;
                        if (noOfRunningQueries === 0) {
                            this.isLoadingImageVisible = false;
                            this._service.updateStatusoflistOfRhythmBlendJSON(this.listOfRhythmBlendJSON,
                                (successResponse) => {
                                    console.log(successResponse);
                                },
                                (errorResponse) => {
                                    console.log(errorResponse);
                                }
                            );
                        }
                    }, (errorResponse) => {
                        console.log(errorResponse);
                        --noOfRunningQueries;
                        if (noOfRunningQueries == 0) {
                            this.isLoadingImageVisible = false;
                        }
                    });
                }
            }
        }
    }
    angular.module("rhythmBlendTestingApp").controller("rhythmBlendTestingApp.controllers.rhythmBlendTestingAppController", rhythmBlendTestingAppController)
}