import AggregateRoot from "../../_shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../_shared/domain/entity/base.entity";
import Id from "../../_shared/domain/value-object/id.value-object"

type ClientProps = {
    id?: Id;
    name: string;
    email: string;
    document: string;
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Client extends BaseEntity implements AggregateRoot {

    private _name: string;
    private _email: string;
    private _document: string;
    private _street: string;
    private _number: number;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor (props: ClientProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._email = props.email;
        this._document = props.document;
        this._street = props.street;
        this._number = props.number;
        this._complement = props.complement;
        this._city = props.city;
        this._state = props.state;
        this._zipCode = props.zipCode;
    }

    get name(): string {
        return this._name;
    }

    get email(): string {
        return this._email;
    }

    get document(): string {
        return this._document;
    }

    get number(): number {
        return this._number;
    }

    get street(): string {
        return this._street;
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
}