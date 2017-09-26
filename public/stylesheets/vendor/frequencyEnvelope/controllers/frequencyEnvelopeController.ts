module frequencyEnvelopeApp.controller{
    
    export class frequencyEnvelopeController {

        
        uploadedFileInfo: {
            fileInfo: {
                name: string,
                ragam: string,
                basepitch: string
            },
            file: any
        };
        feService: frequencyEnvelopeApp.service.frequencyEnvelopeService;
        static $inject = ['frequencyEnvelopeApp.service.frequencyEnvelopeService']
        constructor(argfeService: frequencyEnvelopeApp.service.frequencyEnvelopeService) {
            this.feService = argfeService;
            
            this.uploadedFileInfo = {
                            fileInfo:
                            {
                                name: '',
                                ragam: '',
                                basepitch: ''
                            },
                            file: null
            };
    }
        

        showthedetailsOftheFile = () => {
            
            this.feService.uploadfile(this.uploadedFileInfo, (success) => {

            }, (error) => {

                })
        }
    }
    angular.module('frequencyEnvelopeApp').controller('frequencyEnvelopeApp.controller.frequencyEnvelopeController', frequencyEnvelopeController);
}