import { Sequelize } from "sequelize-typescript";
import Id from "../../_shared/domain/value-object/id.value-object";
import { OrderModel } from "./order.model";
import { OrderItemModel } from "./order-item.model";
import CheckoutRepository from "./checkout.repository";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import Client from "../domain/client.entity";
import { ProductModel } from "../../product-adm/repository/product.model";
import { ClientModel } from "../../client-adm/repository/client.model";

const product1 = new Product({
    id: new Id("p1"),
    name: "Product 1",
    description: "Product 2 description",
    salesPrice: 100
});
const product2 = new Product({
    id: new Id("p2"),
    name: "Product 2",
    description: "Product 2 description",
    salesPrice: 200
});

const client1 = new Client({
    id: new Id("c1"),
    name: "fulano",
    email: "fulano@a.b",
    document: "000",
    street: "rua",
    number: 0,
    complement: "casa",
    city: "toledo",
    state: "pr",
    zipCode: "000"
});

const order1 = new Order ({
    id: new Id("c1"),
    client: client1,
    products: [
        product1, product2
    ]
});

describe("checkout repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([OrderModel, OrderItemModel, ClientModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });
    
    it ("should create and find an order", async () => {
        await ClientModel.create({
            id: "c1",
            name: "patrik",
            email: "alexandropatrik@gmail.com",
            document: "0",
            street: "r1",
            number: 0,
            complement: "c",
            city: "toledo",
            state: "pr",
            zipCode: "0",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await ProductModel.create({
            id: "p1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await ProductModel.create({
            id: "p2",
            name: "Product 2",
            description: "Product 2 description",
            purchasePrice: 200,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const repository = new CheckoutRepository();
        try {
            await repository.addOrder(order1);
        }
        catch (error) {
            console.log(error);
        }

        const order = await repository.findOrder(order1.id.id);

        expect(order.id.id).toBe(order1.id.id);
        expect(order.products.length).toBe(2);
        expect(order.products[0].name).toBe("Product 1");
    });

    
});