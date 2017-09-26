module SarnarBugFilingApp.controller {

     class SarnarBugFilingAppController {

         _bugDescriptionDetails: bugFilingDetailsClass;
         _enumeratedBugList: Array<SarnarBugFilingApp.viewmodels.EnumeratedBugList>;
         _bugList: Array<any>;
         _fieldBugList: Array<any>
         _fixedBugList: Array<any>;

         listOfTesters: any;
         slectedTester: string;
         firstName: string;
         lastName: string;
         fullName: string;
         appname: string;
         priority: number;
         id_softwaretester: string;
         bugFixDetails: bugFilingDetailsClass;
         static $inject = ["SarnarBugFilingApp.services.SarnarBugFilingAppService"];
         
         constructor(protected _sarnarBugFillingAppService: SarnarBugFilingApp.services.SarnarBugFilingAppService)
         {
             this.listOfTesters = [];

             this.getListofTester();
             this.getListofBugs();
             this.slectedTester = " ";
             this.appname = "";
             this.id_softwaretester = "";
             this.priority = 1;
             this._bugDescriptionDetails = new bugFilingDetailsClass();
             this._enumeratedBugList = new Array<SarnarBugFilingApp.viewmodels.EnumeratedBugList>();
             this._bugList = [];
             this._fieldBugList = [];
             this._fixedBugList = [];
             this.firstName = "";
             this.lastName = "";
             this.fullName = "";
             this.bugFixDetails = new bugFilingDetailsClass();
         }


         getListofBugs() {
             this._sarnarBugFillingAppService.getListOfBugs((listofBugs) => {
                 this._bugList = listofBugs;
                 for (let i in listofBugs) {
                     for (let j in this.listOfTesters) {
                         if (listofBugs[i].id_softwaretester === this.listOfTesters[j].id) {
                             this._bugList[i].id_softwaretester = this.listOfTesters[j].name;
                         }
                     }

                     if (this._bugList[i].status === true) {
                         this._fieldBugList.push(this._bugList[i]);
                     }
                     else {
                         this._fixedBugList.push(this._bugList[i]);

                     }

                 }

                 console.log(this._fieldBugList);
                 console.log(this._fixedBugList);
                 console.log(this._bugList);
             }, (errormessage) => {

             }
             )
         };//  getListofBugs() 



         
         getListofTester() {
             this._sarnarBugFillingAppService.getListOfTester((listOfUsers) => {
                 this.listOfTesters = listOfUsers;
                 console.log(listOfUsers);
             }, (errormessage) => {

             });
         }// getListofTester() 


         changeInTestUser() {
             console.log(this.slectedTester);
         }

         fileABug()
         {
             this._bugDescriptionDetails.bugfileddate = new Date();
             this._bugDescriptionDetails.bugfixeddate = null;
             this._bugDescriptionDetails.testerName = this.slectedTester;
             console.log(this._bugDescriptionDetails);
             this._sarnarBugFillingAppService.fileABugReport(this._bugDescriptionDetails, (successmessage) => {
                 console.log(successmessage);
                 this._fieldBugList = [];
                 this._fixedBugList = [];
                 this._bugList = [];
                 this.getListofBugs();
                 
             },
                 (errormessage) => {
                     console.log("An has Occured");
                 });
         }//fileABug() 


         addtester() {
             this.fullName = this.firstName + " " + this.lastName;
             var testername = {name:this.fullName}
             this._sarnarBugFillingAppService.addTester(testername, (successResponse) => {
                 console.log(successResponse);
                 this.getListofTester();
                
             }, (errorResponse) => {

                 })
         }



         SubmitFixedBug(fromUi) {
             
             this.bugFixDetails.bugfixeddate = new Date();
             this.bugFixDetails.bugFixDescription = this._bugDescriptionDetails.bugFixDescription;
             this.bugFixDetails.status = false;
             console.log(this.bugFixDetails);
             this._sarnarBugFillingAppService.SubmitABugFixReport(this.bugFixDetails, (successmessage) => {
                 console.log("successfully fixed" + successmessage);
                 this._bugList = [];
                 this._fieldBugList = [];
                 this._fixedBugList = [];
                 this.getListofBugs();
             },
                 (errormessage) => {

                 });

         }// SubmitFixedBug() {

         updateBug(fromUi) {

             this._bugDescriptionDetails.testerName = this.slectedTester;
             this._sarnarBugFillingAppService.updateBug(this._bugDescriptionDetails, (successmessage) => {
                 console.log("successfully updated" + successmessage);
                 this._bugList = [];
                 this._fieldBugList = [];
                 this._fixedBugList = [];
                 this.getListofBugs();
                 this._bugDescriptionDetails = new bugFilingDetailsClass();
             },
                 (errormessage) => {
                     this._bugDescriptionDetails = new bugFilingDetailsClass();
                 });

         }// SubmitFixedBug() {

         updateBugModel(fromUi) {
             //console.log(fromUi);
             for (var i = 0; i < this.listOfTesters.length;i++){
                 if (fromUi.id_softwaretester == this.listOfTesters[i].name)
                 {   
                     this.slectedTester = this.listOfTesters[i].id;
                     break;
                 }
             }
             this._bugDescriptionDetails._bugId = fromUi.id;
             this._bugDescriptionDetails._appName = fromUi.appname;
             this._bugDescriptionDetails._buildDescription = fromUi.builddescription;
             this._bugDescriptionDetails._bugDescription = fromUi.bugfilingdescription;
             this._bugDescriptionDetails.priority = fromUi.priority;
             //console.log(this._bugDescriptionDetails);
             
         }

         submitfixId(fromUi) {
             
             this.bugFixDetails = fromUi;
            
             console.log(this.bugFixDetails);
         }
    }
     angular.module("SarnarBugFilingApp").controller("SarnarBugFilingApp.controllers.SarnarBugFilingAppController", SarnarBugFilingAppController);
}