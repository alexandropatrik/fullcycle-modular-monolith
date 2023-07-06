import Id from "../../_shared/domain/value-object/id.value-object";
import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { OrderItemModel } from "./order-item.model";
import { OrderModel } from "./order.model";

export default class CheckoutRepository implements CheckoutGateway {

    async addOrder(order: Order): Promise<void> {
        await OrderModel.create(
            {
                id: order.id.id,
                clientId: order.client.id.id,
                items: order.products.map((product) => ({
                    id: new Id().id,
                    productId: product.id.id,
                    orderId: order.id.id,
                })),
            },
            {
                include: [ 
                    {
                        model: OrderItemModel,
                        required: true
                    }
                 ]
            }
        );
    }

    async findOrder(id: string): Promise<Order> {
        throw new Error("findOrder Method not implemented.");
    }

}