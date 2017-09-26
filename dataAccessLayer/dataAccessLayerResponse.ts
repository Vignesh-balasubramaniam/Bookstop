export class DataAccessLayerResponse<T>
{
    //public T ReturnValue { get; set; }
    public ErrorDetails: Array<ErrorDescription>;
    public Value: T;
    public IsSuccess(): boolean {
        if ((this.ErrorDetails.length == 1) && (this.ErrorDetails[0].Number == 0)) {
            return true;
        }
        else
            return false;
    }

    public SetSuccessResult(successValue: T) {
        this.Value = successValue;
        this.ErrorDetails = new Array<ErrorDescription>();
        this.ErrorDetails.push(new ErrorDescription("Success", 0));
    }

    public SetSuccessResultv2(successValue: T, message: string) {
        this.Value = successValue;
        this.ErrorDetails = new Array<ErrorDescription>();
        this.ErrorDetails.push(new ErrorDescription(message, 0));
    }

    public AddErrorDescription(errorNumber: number, errorMessage: string, errorReason: string = null) {

        if (this.ErrorDetails == null) {
            //if (!string.IsNullOrEmpty(errorReason)) {
            if (!errorReason) {
                this.ErrorDetails = new Array<ErrorDescription>();
                this.ErrorDetails.push(new ErrorDescription(errorMessage + "Reason :" + errorReason, errorNumber));
            }
            else {
                this.ErrorDetails = new Array<ErrorDescription>();
                this.ErrorDetails.push(new ErrorDescription(errorMessage, errorNumber));
            }
        }
        else {
            if (!errorReason) {
                this.ErrorDetails.push(new ErrorDescription(errorMessage + "Reason :" + errorReason, errorNumber));

            }
            else {
                this.ErrorDetails.push(new ErrorDescription(errorMessage, errorNumber));
            }
        }
    }

    public ErrorSummary(): string {

        {
            var result: string = '';
            for (var ed in this.ErrorDetails) {
                result = result + this.ErrorDetails[ed].Description;
            }
            return result;
        }
    }
}

export class ErrorDescription {
    public Description: string;
    public Number: number;
    public GenerateMessage<T>(param: T): string {
        return this.Description + " " + param;
    }
    constructor(argDescription: string, argNumber: number) {
        this.Description = argDescription;
        this.Number = argNumber;
    }
}

