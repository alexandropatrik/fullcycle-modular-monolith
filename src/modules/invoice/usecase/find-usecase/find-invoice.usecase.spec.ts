import Id from "../../../_shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice ({
    id: new Id("1"),
    name: "patrik",
    document: "000",
    street: "av 1",
    number: "0",
    complement: "casa",
    city: "toledo",
    state: "pr",
    zipCode: "0000000",
    items: [
        {
            id: "1",
            name: "monitor",
            price: 750
        },
        {
            id: "2",
            name: "teclado",
            price: 250
        },
    ]
});

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}

describe("find invoice usecase unit test", () => {

    it ("should find an invoce", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1"
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        
        expect(result.items.length).toBe(invoice.items.length);
        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);

        expect(result.total).toBe(1000);
    });

});