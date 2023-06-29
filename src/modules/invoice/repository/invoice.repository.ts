import Id from "../../_shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

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
            street: invoice.street,
            number: invoice.number,
            complement: invoice.complement,
            city: invoice.city,
            state: invoice.state,
            zipCode: invoice.zipCode,
            items: invoice.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price
            })),
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

    /*async find(id: string): Promise<Client> {
        const client = await ClientModel.findOne({where: { id } });
        if (!client) {
            throw new Error("Client not found");
        }

        return new Client({
            id: new Id(client.id),
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        })
    }*/

}