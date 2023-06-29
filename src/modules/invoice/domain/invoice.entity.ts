import BaseEntity from "../../_shared/domain/entity/base.entity";
import Address from "./address.vo";
import Product from "./product.entity";
import Id from "../../_shared/domain/value-object/id.value-object";

type InvoceProps = {
    id?: Id;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Invoice extends BaseEntity {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: Product[];

    constructor(props: InvoceProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._document = props.document;
        this.changeAddress(props.street, props.number, props.complement, props.city, props.state, props.zipCode);
        props.items.map((item) => {
            this.addItem(new Product({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            }));
        });
        this.validate();
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }

    get items(): Product[] {
        return this._items;
    }

    get total(): number {
        return this._items.reduce( (sum, current) => sum + current.price, 0);
    }

    validate(): void {
        if (this.address == null) {
            throw new Error("Address is required");
        }
        if (this._items.length == 0) {
            throw new Error("Invoce needs at least one item");
        }
    }

    changeCurrentAddress(address: Address): void {
        this.changeAddress(address.street, address.number, address.complement, address.city, address.state, address.zipCode);
    }

    changeAddress(street: string, number: string, complement: string, city: string, state: string, zipCode: string): void {
        if (!this._address) {
            this._address = new Address(street, number, complement, city, state, zipCode);
        } else {
            this._address.street = street;
            this._address.number = number;
            this._address.complement = complement;
            this._address.city = city;
            this._address.state = state;
            this._address.zipCode = zipCode;
        }
    }

    addItem(product: Product): void {
        if (!this._items) {
            this._items = [];
        }
        this._items.push(product);
    }

}
