module instrumentMigrationApp.services {

    export class instrumentMigrationServices {
        httpService: ng.IHttpService;
        static $inject = ['$http'];
        constructor(arg$httpService: ng.IHttpService) {
            this.httpService = arg$httpService;
        }

        getListOfOldInstrument(successCallback, errorCallback) {
            this.httpService.get('/instrumentsList')
                .success((data) => {
                    
                    successCallback(data);
                }).error((error) => {
                    errorCallback(error);
                })

        }// getUserAuthorizedInstrumentList(successCallback, errorCallback) {

        getListOfVirtualInstrument(successCallback, errorCallback) {
            this.httpService.get('/VirtualInstrument')
                .success((data) => {
                  
                    successCallback(data);
                })
                .error((error) => {

                })
        }


        migratePresetsToVI(argInstrumentId, successCallback, errorCallback) {
            this.httpService.get('/migrateInstrument?InstrumentId=' + argInstrumentId)
                .success((data) => {
                   
                    successCallback(data);
                })
                .error((error) => {

                })
        }


        getsyllableSoundPreset(successCallback, errorCallback) {
            this.httpService.get('/syllableSoundPreset')
                .success((success) => {
                    successCallback(success);
                })
                .error((error) => {
                    errorCallback(error);
                })

        }

        getUserAuthoredInstrument(successCallback, errorCallback) {
            this.httpService.get('/userAuthoredInstrument')
                .success((success) => {
                    successCallback(success);
                })
                .error((error) => {
                    errorCallback(error);
                })
        }
    }
    angular.module('instrumentMigrationApp').service('instrumentMigrationApp.services.instrumentMigrationServices', instrumentMigrationServices);
}