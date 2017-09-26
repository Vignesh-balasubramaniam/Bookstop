

  class bugFilingDetailsClass {

        _bugId: string;
        _testerName: string;
        _appName: string;
        _buildDescription: string;
        _bugDescription: string;
        _bugFixDescription: string;
        _priority: number;
        _status: boolean;
        _bugFiledDate: Date;
        _bugFixeddate: Date;

        constructor() {
            this.bugId = "";
            this.testerName = "";
            this.appName = "";
            this.buildDescription = "";
            this.bugDescription = "";
            this.bugFixDescription = "";
            this.priority = 1;
            this.status = true;
            this.bugfileddate = null;
            this.bugfixeddate = null;
        }

        get bugId(): string { return this._bugId; }

        get testerName(): string { return this._testerName; }

        get appName(): string { return this._appName; }

        get bugDescription(): string { return this._bugDescription; }

        get bugFixDescription(): string { return this._bugFixDescription; }

        get buildDescription(): string { return this._buildDescription; }

        get priority(): number { return this._priority; }

        get status(): boolean { return this._status; }

        get bugfileddate(): Date { return this._bugFiledDate; }

        get bugfixeddate(): Date { return this._bugFixeddate; }


        set bugId(argbugId: string) { this._bugId = argbugId; }

        set testerName(argtesterName: string) { this._testerName = argtesterName; }

        set appName(argappName: string) { this._appName = argappName; }

        set bugDescription(argbugDescription: string) { this._bugDescription = argbugDescription; }

        set bugFixDescription(argbugFixDescription) { this._bugFixDescription = argbugFixDescription; }

        set buildDescription(argbuildDescription: string) { this._buildDescription = argbuildDescription; }

        set priority(argpriority: number) { this._priority = argpriority; }

        set status(argstatus: boolean) { this._status = argstatus; }

        set bugfileddate(argbugFiledDate: Date) { this._bugFiledDate = argbugFiledDate; }

        set bugfixeddate(argbugFixdDate: Date) { this._bugFixeddate = argbugFixdDate; }
    }
