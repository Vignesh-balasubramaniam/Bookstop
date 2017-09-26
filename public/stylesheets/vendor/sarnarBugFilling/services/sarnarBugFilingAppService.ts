module SarnarBugFilingApp.services {

    export  class SarnarBugFilingAppService {

        httpService: ng.IHttpService;
        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            this.httpService = $http;
        }// constructor($http: ng.IHttpService)


        getListOfTester(successCallback: Function, errorCallback: Function) {
            this.httpService.get("/listofTesters").success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }

        getListOfBugs(successCallback: Function, errorCallback: Function) {
            this.httpService.get('/getListOfBugs')
                .success((data) => {
                    successCallback(data);
                }).error((error) => {
                    errorCallback(error);
                });
        }

        fileABugReport(bugDescriptionDetails, successCallback: Function, errorCallback: Function) {
            this.httpService.post("/fileBugReport", bugDescriptionDetails ).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }

        addTester(username, successCallback: Function, errorCallback: Function) {
            this.httpService.post("/addAuser", username)
                .success((data) => {
                    successCallback(data);
                }).error((error) => {

                });

        }

        SubmitABugFixReport(bugDescriptionDetails, successCallback: Function, errorCallback: Function) {
            this.httpService.post("/SubmitBugFixReport" ,bugDescriptionDetails).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }

        updateBug(bugDescriptionDetails, successCallback: Function, errorCallback: Function) {
            this.httpService.post("/updateBug", bugDescriptionDetails).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }
      
    }
    angular.module("SarnarBugFilingApp").service("SarnarBugFilingApp.services.SarnarBugFilingAppService", SarnarBugFilingAppService);
}