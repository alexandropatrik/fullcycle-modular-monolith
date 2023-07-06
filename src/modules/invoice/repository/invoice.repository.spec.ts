import { Sequelize } from "sequelize-typescript";
import Id from "../../_shared/domain/value-object/id.value-object";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemModel } from "./invoice-item.model";
import Invoice from "../domain/invoice.entity";
import InvoiceRepository from "./invoice.repository";
import Product from "../domain/product.entity";
import Address from "../domain/address.vo";

const product1 = new Product({
    id: new Id("1"),
    name: "monitor",
    price: 750
});
const product2 = new Product({
    id: new Id("2"),
    name: "teclado",
    price: 250
});
const address = new Address("av 1", "0", "casa", "toledo", "pr", "0000000");

const invoice = new Invoice ({
    id: new Id("1"),
    name: "patrik",
    document: "000",
    address: address,
    items: [product1, product2]
});

describe("invoice repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });
    
    it ("should find a client", async () => {
        const repository = new InvoiceRepository();
        await repository.generate(invoice);

        const result = await repository.find(invoice.id.id);

        expect(result.id.id).toBe(invoice.id.id);
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.total).toBe(invoice.total);
        expect(result.items.length).toBe(2);
        expect(result.items[0].id.id).toBeDefined();
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id.id).toBeDefined();
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.createdAt).toEqual(invoice.createdAt);
        expect(result.updatedAt).toEqual(invoice.updatedAt);
    });

    it ("should create an invoice", async () => {
        const repository = new InvoiceRepository();
        await repository.generate(invoice);

        const invoiceDb = await InvoiceModel.findOne( 
            { 
                where: { id: "1" },
                include: "items"
            }
        );

        expect(invoiceDb).toBeDefined();
        expect(invoiceDb.id).toBe(invoice.id.id);
        expect(invoiceDb.name).toBe(invoice.name);
        expect(invoiceDb.document).toBe(invoice.document);
        expect(invoiceDb.street).toBe(invoice.address.street);
        expect(invoiceDb.number).toBe(invoice.address.number);
        expect(invoiceDb.complement).toBe(invoice.address.complement);
        expect(invoiceDb.city).toBe(invoice.address.city);
        expect(invoiceDb.state).toBe(invoice.address.state);
        expect(invoiceDb.zipCode).toBe(invoice.address.zipCode);
        expect(invoiceDb.total).toBe(invoice.total);
        expect(invoiceDb.items.length).toBe(2);
        expect(invoiceDb.items[0].id).toBeDefined();
        expect(invoiceDb.items[0].name).toBe(invoice.items[0].name);
        expect(invoiceDb.items[0].price).toBe(invoice.items[0].price);
        expect(invoiceDb.items[1].id).toBeDefined();
        expect(invoiceDb.items[1].name).toBe(invoice.items[1].name);
        expect(invoiceDb.items[1].price).toBe(invoice.items[1].price);
        expect(invoiceDb.createdAt).toEqual(invoice.createdAt);
        expect(invoiceDb.updatedAt).toEqual(invoice.updatedAt);
    });

});