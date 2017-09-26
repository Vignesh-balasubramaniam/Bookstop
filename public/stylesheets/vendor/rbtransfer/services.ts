module RhythmMakerTransferApp.services {
    export class RhythmMakerTransferService {
        httpService: ng.IHttpService;
        static $inject = ["$http"];
        constructor($http: ng.IHttpService) {
            this.httpService = $http;
        }// constructor($http: ng.IHttpService)

        //$http.get("http://" + $rootScope.webserver.ipaddress + ":" + $rootScope.webserver.portno + '/api/RhythmBlends?rhythmBlendId=' + rhythmblendId
        migrate(rhythmblendId: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/migrate?rhythmid=" + rhythmblendId).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }//  migrate(rhythmblendId: string, successCallback: Function, errorCallback: Function) {

        getAllProductionRhythmBlendsFromWebApi(successCallback: Function, errorCallback: Function) {
            this.httpService.get("/productionrhythmBlends").success((data) => {
                console.log(data);
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }//getAllRhythmBlendsFromWebApi(successCallback: Function, errorCallback: Function) {


        getProductionRhythmBlendsByNameFromWebApi(rhythmblendName: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/productionrhythmBlendsByName?name=" + rhythmblendName).success((data) => {
                console.log(data);
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });

        }//getRhythmBlendsByNameFromWebApi(rhythmblendName: string, successCallback: Function, errorCallback: Function) {


        //	$http.get("http://"+$rootScope.webserver.ipaddress+":"+$rootScope.webserver.portno+'/api/RhythmBlends?keyword='+$scope.search.Keyword
        getProductionRhythmBlendsByKeywordFromWebApi(rhythmblendKeyword: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/productionrhythmBlendsByKeyword?keyword=" + rhythmblendKeyword).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });

        }//getRhythmBlendByIdFromWebApi(rhythmblendId: string, successCallback: Function, errorCallback: Function)

        getProductionRhythmBlendsByNameAndKeywordFromWebApi(rhythmblendName, rhythmblendKeyword: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/productionrhythmBlendsByNameAndKeyword?name=" + rhythmblendName + "&keyword=" + rhythmblendKeyword).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });

        }//getRhythmBlendsByNameAndKeywordFromWebApi(rhythmblendKeyword: string, successCallback: Function, errorCallback: Function) 

        // $http.get("http://"+$rootScope.webserver.ipaddress+":"+$rootScope.webserver.portno+'/api/RhythmBlends?startCreatedDate='+sdate+'&endCreatedDate='+edate
        getProductionRhythmBlendByDateRangeFromWebApi(startDateTime: string, endDateTime: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/rhythmBlendsByDate?startCreatedDate=" + startDateTime + "&endCreatedDate=" + endDateTime).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }//getRhythmBlendByDateRangeFromWebApi(startDateTime: Date, endDateTime: Date, successCallback: Function, errorCallback: Function)

        getAllDemoRhythmBlendsFromWebApi(successCallback: Function, errorCallback: Function) {
            this.httpService.get("/demorhythmBlends").success((data) => {
                console.log(data);
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }//getAllRhythmBlendsFromWebApi(successCallback: Function, errorCallback: Function) {

        getDemoRhythmBlendsByNameFromWebApi(rhythmblendName: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/demorhythmBlendsByName?name=" + rhythmblendName).success((data) => {
                console.log(data);
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });

        }//getRhythmBlendsByNameFromWebApi(rhythmblendName: string, successCallback: Function, errorCallback: Function) {

        //	$http.get("http://"+$rootScope.webserver.ipaddress+":"+$rootScope.webserver.portno+'/api/RhythmBlends?keyword='+$scope.search.Keyword
        getDemoRhythmBlendsByKeywordFromWebApi(rhythmblendKeyword: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/demorhythmBlendsByKeyword?keyword=" + rhythmblendKeyword).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });

        }//getRhythmBlendByIdFromWebApi(rhythmblendId: string, successCallback: Function, errorCallback: Function)

        getDemoRhythmBlendsByNameAndKeywordFromWebApi(rhythmblendName, rhythmblendKeyword: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/demorhythmBlendsByNameAndKeyword?name=" + rhythmblendName + "&keyword=" + rhythmblendKeyword).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });

        }//getRhythmBlendsByNameAndKeywordFromWebApi(rhythmblendKeyword: string, successCallback: Function, errorCallback: Function) 

        transferFromProductionToDemo(argId:string,successCallback: Function, errorCallback: Function) {
            this.httpService.get("/transferFromProductionToDemo?id=" + argId).success((data) => {
               
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }

        transferFromDemoToProduction(argId: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/transferFromDemoToProduction?id=" + argId).success((data) => {
                
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }

        deleteDemoRhythmBlend(argId: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/deleteRhythmBlendFromDemoWebapi?id=" + argId).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }

        deleteProductionRhythmBlend(argId: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/deleteRhythmBlendFromProductionWebapi?id=" + argId).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }

    }

    angular.module("RhythmMakerTransferApp").service("RhythmMakerTransferApp.services.RhythmMakerTransferService", RhythmMakerTransferService);

}