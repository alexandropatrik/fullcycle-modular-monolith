import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

describe("add client use case unit test", () => {

    it ("should add client", async () => {
        const repository = MockRepository();
        const usecase = new AddClientUseCase(repository);
        const input = {
            id: "1",
            name: "patrik",
            email: "alexandropatrik@gmail.com",
            document: "0",
            street: "r1",
            number: 0,
            complement: "c",
            city: "toledo",
            state: "pr",
            zipCode: "0"
        };

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
    });

});