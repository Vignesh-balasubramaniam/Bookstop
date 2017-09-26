module frequencyEnvelopeApp.service {

    export class frequencyEnvelopeService {
        httpService: ng.IHttpService;
        static $inject = ['$http'];
        constructor($http: ng.IHttpService) {
            this.httpService = $http;
        }

        uploadfile(argUploadfileInfo, successcallback, errorcallback) {
            console.log(argUploadfileInfo);
            this.httpService({
                method: 'POST',
                url: "/soundClipUpload",
                headers:
                { 'Content-Type': undefined },
                transformRequest: function (data) {
                    var formData = new FormData();
                    formData.append("SoundClipUploadDescriptor", JSON.stringify(data.model));
                    //for more than file
                    //  for(var i=0; i<data.files.length;i++){
                    //  if(data.files[i],File.length!=0){
                    //formData.append(data.files[i].file);
                    //}
                    formData.append("file", data.file);
                    //}
                    return formData;
                },
                data: { model: argUploadfileInfo.fileInfo, file: argUploadfileInfo.file }
            })


        }

    }
    angular.module('frequencyEnvelopeApp').service('frequencyEnvelopeApp.service.frequencyEnvelopeService', frequencyEnvelopeService);
}