import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

@Table({
    tableName: "invoice_item",
    timestamps: false
})
export class InvoiceItemModel extends Model {

    @PrimaryKey
    @Column({allowNull: false})
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare price: number;

    @Column({allowNull: false})
    declare productId: string;

    @ForeignKey(() => InvoiceModel)
    @Column( { allowNull: false, field: "invoice_id" } )
    declare invoiceId: string;

    @BelongsTo(() => InvoiceModel)
    declare invoice: InvoiceModel;

}