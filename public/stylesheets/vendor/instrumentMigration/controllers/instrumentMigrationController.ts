module instrumentMigrationApp.controller {

 
    export class InstrumentMigrationController{
        listOfVirtualInstruments: any;
        listOfOldInstrument: any;
        listOfPresets: any;
        listofUserAuthoredInstrument: any;
    IMservices: instrumentMigrationApp.services.instrumentMigrationServices;
    static $inject = ['instrumentMigrationApp.services.instrumentMigrationServices'];
    constructor(argIMservices: instrumentMigrationApp.services.instrumentMigrationServices)
    {
        this.IMservices = argIMservices;
        this.listOfOldInstrument = [];
        this.listOfVirtualInstruments = [];
        this.listOfPresets = [];
        this.listofUserAuthoredInstrument = [];
        this.getPresets();
        this.getListOfVirtualInstrument();
        this.getListOfOldInstrument();
        this.getUserAuthoredInstrument();
    }

    getListOfOldInstrument = () => {
        this.IMservices.getListOfOldInstrument((success) => {
            this.listOfOldInstrument = success;
        }, (error) => {
            console.log(error);
            })
    }//getListUserAuthorizedInstrument


    getListOfVirtualInstrument = () => {
        this.IMservices.getListOfVirtualInstrument((success) => {
            
            this.listOfVirtualInstruments = success;
            console.log(this.listOfVirtualInstruments);
        }, (error) => {

        })

    }//getListOfVirtualInstrument

    migratePresets = (argId) => {
        this.IMservices.migratePresetsToVI(argId, (success) => {
            console.log(success);
            this.getListOfVirtualInstrument();
        }, (error) => {

            })
    }

    getPresets = () => {
        this.IMservices.getsyllableSoundPreset((success) => {
            console.log(success);
            this.listOfPresets = success;
        }, (error) => {

        })
    }

    getUserAuthoredInstrument = () => {
        this.IMservices.getUserAuthoredInstrument((userAuthoredInstrumentList) => {
            console.log(userAuthoredInstrumentList);
            this.listofUserAuthoredInstrument = userAuthoredInstrumentList;
        }, (error) => {
            console.log(error);
            })
    }
   

    }
    angular.module('instrumentMigrationApp').controller('instrumentMigrationApp.controller.InstrumentMigrationController', InstrumentMigrationController);
}