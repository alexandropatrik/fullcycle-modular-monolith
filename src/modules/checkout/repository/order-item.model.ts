import { BelongsTo, Column, ForeignKey, HasOne, Model, PrimaryKey, Table } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import { ProductModel } from "../../product-adm/repository/product.model";

@Table({
    tableName: "order_item",
    timestamps: false
})
export class OrderItemModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;

    @ForeignKey(() => ProductModel)
    @Column( { allowNull: false, field: "product_id" } )
    declare productId: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column( { allowNull: false, field: "order_id" } )
    declare orderId: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;
}