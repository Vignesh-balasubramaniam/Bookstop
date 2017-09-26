var frequencyEnvelopeApp;
(function (frequencyEnvelopeApp) {
    var controller;
    (function (controller) {
        var frequencyEnvelopeController = (function () {
            function frequencyEnvelopeController(argfeService) {
                var _this = this;
                this.showthedetailsOftheFile = function () {
                    _this.feService.uploadfile(_this.uploadedFileInfo, function (success) {
                    }, function (error) {
                    });
                };
                this.feService = argfeService;
                this.uploadedFileInfo = {
                    fileInfo: {
                        name: '',
                        ragam: '',
                        basepitch: ''
                    },
                    file: null
                };
            }
            frequencyEnvelopeController.$inject = ['frequencyEnvelopeApp.service.frequencyEnvelopeService'];
            return frequencyEnvelopeController;
        }());
        controller.frequencyEnvelopeController = frequencyEnvelopeController;
        angular.module('frequencyEnvelopeApp').controller('frequencyEnvelopeApp.controller.frequencyEnvelopeController', frequencyEnvelopeController);
    })(controller = frequencyEnvelopeApp.controller || (frequencyEnvelopeApp.controller = {}));
})(frequencyEnvelopeApp || (frequencyEnvelopeApp = {}));
//# sourceMappingURL=frequencyEnvelopeController.js.map