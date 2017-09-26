module SarnarBugFilingApp.viewmodels {

    export class EnumeratedBugList {

        bugId: string;
        testerName: string;
        appName: string;
        buildDescription: string;
        bugDescription: string;
        bugFixDescription: string;
        priority: number;
        status: boolean;
        bugFiledDate: Date;
        bugFixedDate: Date;
    }
}