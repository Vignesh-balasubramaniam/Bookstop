var frequencyEnvelopeApp;
(function (frequencyEnvelopeApp) {
    var service;
    (function (service) {
        var frequencyEnvelopeService = (function () {
            function frequencyEnvelopeService($http) {
                this.httpService = $http;
            }
            frequencyEnvelopeService.prototype.uploadfile = function (argUploadfileInfo, successcallback, errorcallback) {
                console.log(argUploadfileInfo);
                this.httpService({
                    method: 'POST',
                    url: "/soundClipUpload",
                    headers: { 'Content-Type': undefined },
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
                });
            };
            frequencyEnvelopeService.$inject = ['$http'];
            return frequencyEnvelopeService;
        }());
        service.frequencyEnvelopeService = frequencyEnvelopeService;
        angular.module('frequencyEnvelopeApp').service('frequencyEnvelopeApp.service.frequencyEnvelopeService', frequencyEnvelopeService);
    })(service = frequencyEnvelopeApp.service || (frequencyEnvelopeApp.service = {}));
})(frequencyEnvelopeApp || (frequencyEnvelopeApp = {}));
//# sourceMappingURL=frequencyEnvelopeService.js.map