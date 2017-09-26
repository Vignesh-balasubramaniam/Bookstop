module RhythmMakerMigrateApp.services {
    export class RhythmMakerMigrateService {
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

        getAllRhythmBlendsFromWebApi(successCallback: Function, errorCallback: Function) {
            this.httpService.get("/rhythmBlends").success((data) => {
                console.log(data);
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }//getAllRhythmBlendsFromWebApi(successCallback: Function, errorCallback: Function) {


        getRhythmBlendsByNameFromWebApi(rhythmblendName: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/rhythmBlendsByName?name=" + rhythmblendName).success((data) => {
                console.log(data);
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });

        }//getRhythmBlendsByNameFromWebApi(rhythmblendName: string, successCallback: Function, errorCallback: Function) {


        //	$http.get("http://"+$rootScope.webserver.ipaddress+":"+$rootScope.webserver.portno+'/api/RhythmBlends?keyword='+$scope.search.Keyword
        getRhythmBlendsByKeywordFromWebApi(rhythmblendKeyword: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/rhythmBlendsByKeyword?keyword=" + rhythmblendKeyword).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });

        }//getRhythmBlendByIdFromWebApi(rhythmblendId: string, successCallback: Function, errorCallback: Function)

        getRhythmBlendsByNameAndKeywordFromWebApi(rhythmblendName, rhythmblendKeyword: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/rhythmBlendsByNameAndKeyword?name=" + rhythmblendName + "&keyword=" + rhythmblendKeyword).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });

        }//getRhythmBlendsByNameAndKeywordFromWebApi(rhythmblendKeyword: string, successCallback: Function, errorCallback: Function) 


        // $http.get("http://"+$rootScope.webserver.ipaddress+":"+$rootScope.webserver.portno+'/api/RhythmBlends?startCreatedDate='+sdate+'&endCreatedDate='+edate
        getRhythmBlendByDateRangeFromWebApi(startDateTime: string, endDateTime: string, successCallback: Function, errorCallback: Function) {
            this.httpService.get("/rhythmBlendsByDate?startCreatedDate=" + startDateTime + "&endCreatedDate=" + endDateTime).success((data) => {
                successCallback(data);
            }).error((error) => {
                errorCallback(error);
            });
        }//getRhythmBlendByDateRangeFromWebApi(startDateTime: Date, endDateTime: Date, successCallback: Function, errorCallback: Function)

    }

    angular.module("RhythmMakerMigrateApp").service("RhythmMakerMigrateApp.services.RhythmMakerMigrateService", RhythmMakerMigrateService);

}