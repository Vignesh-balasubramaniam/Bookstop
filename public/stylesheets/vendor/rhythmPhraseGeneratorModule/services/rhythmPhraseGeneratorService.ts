module SnRSPhraseGenerator.services {

    export class RSPhraseGeneratorService {
        httpService: ng.IHttpService;
        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            this.httpService = $http;
        }

        getPresets(successCallback: Function, errorCallback: Function) {
            this.httpService.get('/presets').success((data, status) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }

        generateRhythmSyllablePhrase(argObject, successCallback: Function, errorCallback: Function) {
            this.httpService.post('/generateRhythmSyllables', JSON.stringify(argObject))
                .success((successdata) => {
                    successCallback(successdata);
                }).error((erroresponse) => {
                    errorCallback(erroresponse);
                });
        }

    }
    angular.module("RSPhraseGenerator").service("RSPhraseGenerator.services.RSPhraseGeneratorService", RSPhraseGeneratorService)
}