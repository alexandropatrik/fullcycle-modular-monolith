import Id from "../../_shared/domain/value-object/id.value-object";
import { ClientModel } from "../../client-adm/repository/client.model";
import { ProductModel } from "../../product-adm/repository/product.model";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
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
                    },
                 ]
            }
        );
    }

    async findOrder(id: string): Promise<Order> {
        const order = await OrderModel.findOne({
            where: { id }, 
            include: [
                {
                    model: OrderItemModel,
                    include: [
                        {
                            model: ProductModel
                        }
                    ]
                },
                {
                    model: ClientModel
                },
            ]
        });
        if (!order) {
            throw new Error("Order not found");
        }

        return new Order ({
            id: new Id(order.id),
            client: new Client({
                id: new Id(order.clientId),
                name: order.client.name,
                email: order.client.email,
                document: order.client.document,
                street: order.client.street,
                number: order.client.number,
                complement: order.client.complement,
                city: order.client.city,
                state: order.client.state,
                zipCode: order.client.zipCode,
            }),
            products: order.items.map((item) => new Product({
                id: new Id(item.productId),
                name: item.product.name,
                description: item.product.description,
                salesPrice: item.product.salesPrice,
            })),
        });
    }

}