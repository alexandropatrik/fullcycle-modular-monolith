import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "./order.model";

@Table({
    tableName: "order_item",
    timestamps: false
})
export class OrderItemModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    productId: string;

    @ForeignKey(() => OrderModel)
    @Column( { allowNull: false, field: "order_id" } )
    declare orderId: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;
}