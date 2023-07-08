import { BelongsTo, Column, ForeignKey, HasMany, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderItemModel } from "./order-item.model";
import { ClientModel } from "../../client-adm/repository/client.model";

@Table({
    tableName: "orders",
    timestamps: false
})
export class OrderModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];

    @ForeignKey(() => ClientModel)
    @Column( { allowNull: false, field: "client_id" } )
    declare clientId: string;

    @BelongsTo(() => ClientModel)
    declare client: ClientModel;

}