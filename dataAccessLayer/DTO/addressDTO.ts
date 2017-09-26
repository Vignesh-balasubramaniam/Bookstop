export class AddressDTO {
    id: string;
    housenumber:string;
    street: string;
    area: string;
    city: string;
    state:string
    pincode: number;
    constructor(argId: string, argHouseno: string, argStreet: string, argArea: string, argCity: string, argState: string, argPinCode: number) {
        this.id=argId;
        this.housenumber = argHouseno;
        this.street = argStreet;
        this.area = argArea;
        this.city = argCity;
        this.state = argState;
        this.pincode = argPinCode;
    }

}