module rhythmBlendTestingApp.services {

    export class rhythmBlendTestingAppService {
        httpService: ng.IHttpService;
        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            this.httpService = $http;
        }

        generateRhythmBlendJson(createRhythmBlendJSON, successCallback: Function, errorCallback: Function) {
          //  console.log(createRhythmBlendJSON);
            this.httpService.post('/generatedRhythmBlendJSON', createRhythmBlendJSON)
                .success((data) => {
                console.log(data);
                    successCallback(data);
                }).error((error) => {
                    errorCallback(error);
                });
        }

        getListofRhythmBlendJson(successCallback: Function, errorCallback: Function) {
            this.httpService.get('/listofRhythmBlendJSoN')
                .success((data) => {
                    console.log(data);
                    successCallback(data);
                }).error((error) => {
                    errorCallback(error);
                })
        }

        saveRhythmBlends(RhythmBlendJSON, successCallback: Function, errorCallback: Function) {
            this.httpService.post('/saveRhythmBlends', RhythmBlendJSON)
                .success((successdata) => {
                    successCallback(successdata);
                }).error((erroresponse) => {
                    errorCallback(erroresponse);
                });
        }
        
        updateStatusoflistOfRhythmBlendJSON(ListofRhythmBlendJSON, successCallback: Function, errorCallback: Function) {
            this.httpService.post('/updateStatusOfRhythmBlendJSON', ListofRhythmBlendJSON)
                .success((successdata) => {
                    successCallback(successdata);
                }).error((erroresponse) => {
                    errorCallback(erroresponse);
                });
        }

        getPresets(successCallback: Function, errorCallback: Function) {
            this.httpService.get('/presets').success((data, status) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }

    }
    angular.module("rhythmBlendTestingApp").service("rhythmBlendTestingApp.services.rhythmBlendTestingAppService", rhythmBlendTestingAppService)
}