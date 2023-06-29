export default class Address {
    private _street: string;
    private _number: string;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(street: string, number: string, complement: string, city: string, state: string, zipCode: string) {
        this._street = street;
        this._number = number;
        this._complement = complement;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    set street(street: string) {
        this._street = street;
    }

    set number(number: string) {
        this._number = number;
    }
    set complement(complement: string) {
        this._complement = complement;
    }
    set city(city: string) {
        this._city = city;
    }
    set state(state: string) {
        this._state = state;
    }
    set zipCode(zipCode: string) {
        this._zipCode = zipCode;
    }
}