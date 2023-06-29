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
            address: "toledo",
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const repository = new ClientRepository();
        const result = await repository.find(client.id);

        expect(result.id.id).toBe(client.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address).toBe(client.address);
        expect(result.createdAt).toEqual(client.createdAt);
        expect(result.updatedAt).toEqual(client.updatedAt);
    });

    it ("should create a client", async () => {
        const client = new Client({
            id: new Id("1"),
            name: "patrik",
            email: "alexandropatrik@gmail.com",
            address: "toledo"
        });

        const repository = new ClientRepository();
        await repository.add(client);

        const clientDb = await ClientModel.findOne( { where: { id: "1" }});

        expect(clientDb).toBeDefined();
        expect(clientDb.id).toBe(client.id.id);
        expect(clientDb.name).toBe(client.name);
        expect(clientDb.email).toBe(client.email);
        expect(clientDb.address).toBe(client.address);
        expect(clientDb.createdAt).toEqual(client.createdAt);
        expect(clientDb.updatedAt).toEqual(client.updatedAt);
    });

});