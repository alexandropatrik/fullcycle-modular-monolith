import Id from "../../_shared/domain/value-object/id.value-object";
import Address from "../domain/address.vo";
import Invoice from "../domain/invoice.entity";
import Product from "../domain/product.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

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

export default class InvoiceRepository implements InvoiceGateway {
    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({
            where: { id }, 
            include: "items"
        });
        if (!invoice) {
            throw new Error("Client not found");
        }

        return new Invoice ({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: address,
            items: [product1, product2],
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        });
    }
    
    async generate(invoice: Invoice): Promise<void> {
        await InvoiceModel.create({
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
                invoiceId: invoice.id.id,
            })),
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            total: invoice.total,
        },
        {
            include: [ 
                {
                    model: InvoiceItemModel,
                    required: true
                }
             ]
        });
    }

}