import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../_shared/domain/value-object/id.value-object";

describe("client repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });
    
    it ("should find a client", async () => {
        const client = await ClientModel.create({
            id: "1",
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

        const repository = new ClientRepository();
        const result = await repository.find(client.id);

        expect(result.id.id).toBe(client.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.street).toBe(client.street);
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);
    });

    it ("should create a client", async () => {
        const client = new Client({
            id: new Id("1"),
            name: "patrik",
            email: "alexandropatrik@gmail.com",
            document: "1",
            street: "r 1",
            number: 0,
            complement: "c",
            city: "toledo",
            state: "pr",
            zipCode: "000"
        });

        const repository = new ClientRepository();
        await repository.add(client);

        const clientDb = await ClientModel.findOne( { where: { id: "1" }});

        expect(clientDb).toBeDefined();
        expect(clientDb.id).toBe(client.id.id);
        expect(clientDb.name).toBe(client.name);
        expect(clientDb.email).toBe(client.email);
        expect(clientDb.street).toBe(client.street);
        expect(clientDb.createdAt).toEqual(client.createdAt);
        expect(clientDb.updatedAt).toEqual(client.updatedAt);
    });

});