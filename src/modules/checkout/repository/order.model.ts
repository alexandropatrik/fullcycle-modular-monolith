import { Column, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderItemModel } from "./order-item.model";

@Table({
    tableName: "orders",
    timestamps: false
})
export class OrderModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @Column({allowNull: false})
    clientId: string;

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];

}