import Id from "../../../_shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new Id("1"),
    name: "patrik",
    email: "alexandropatrik@gmail.com",
    address: "toledo",
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client))
    }
}

describe ("find client unit test", () => {

    it("should find a cliente", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);
        const input = {
            id: "1"
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBe("1");
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
    });

})