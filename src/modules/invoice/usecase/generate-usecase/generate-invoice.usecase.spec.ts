import GenerateInvoiceUseCase from "./generate-invoce.usecase";

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn()
    }
}

describe("generate invoice usecase unit test", () => {

    it ("should generante an invoce", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(repository);

        const input = {
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
        };

        const result = await usecase.execute(input);

        expect(repository.generate).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        
        expect(result.items.length).toBe(input.items.length);
        expect(result.items[0].id).toBe(input.items[0].id);
        expect(result.items[0].name).toBe(input.items[0].name);
        expect(result.items[0].price).toBe(input.items[0].price);
        expect(result.items[1].id).toBe(input.items[1].id);
        expect(result.items[1].name).toBe(input.items[1].name);
        expect(result.items[1].price).toBe(input.items[1].price);

        expect(result.total).toBe(1000);
    });

});