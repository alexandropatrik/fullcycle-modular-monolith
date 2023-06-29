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
            address: "toledo"
        };

        const result = await usecase.execute(input);

        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
    });

});