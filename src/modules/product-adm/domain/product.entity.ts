import BaseEntity from "../../_shared/domain/entity/base.entity"
import AggregateRoot from "../../_shared/domain/entity/aggregate-root.interface"
import Id from "../../_shared/domain/value-object/id.value-object";

type ProductProps = {
    id?: Id,
    name: string,
    description: string,
    purchasePrice: number,
    salesPrice: number,
    stock: number,
    createdAt?: Date,
    updatedAt?: Date
}

export default class Product extends BaseEntity implements AggregateRoot {

    private _name: string;
    private _description: string;
    private _purchasePrice: number;
    private _salesPrice: number;
    private _stock: number;

    constructor(props: ProductProps) {
        super(props.id);
        this._name = props.name;
        this._description = props.description;
        this._purchasePrice = props.purchasePrice;
        this._salesPrice = props.salesPrice;
        this._stock = props.stock;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get purchasePrice(): number {
        return this._purchasePrice;
    }

    get stock(): number {
        return this._stock;
    }

    get salesPrice(): number {
        return this._salesPrice;
    }

    set name(name: string) {
        this._name = name;
    }

    set description(description: string) {
        this._description = description;
    }

    set purchasePrice(purchasePrice: number) {
        this.purchasePrice = purchasePrice;
    }

    set stock(stock: number) {
        this._stock = stock;
    }

    set salesPrice(salesPrice: number) {
        this._salesPrice = salesPrice;
    }
}