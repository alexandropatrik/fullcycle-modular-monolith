import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";

describe ("client adm facade test", () => {

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

    it ("should create a cliente", async () => {

        const repository = new ClientRepository();
        const addUseCase = new AddClientUseCase(repository);
        const facade = new ClientAdmFacade({
            addUseCase: addUseCase,
            findUseCase: undefined,
        });

        const input = {
            id: "1",
            name: "patrik",
            email: "alexandropatrik@gmail.com",
            document: "1",
            street: "r 1",
            number: 0,
            complement: "c",
            city: "toledo",
            state: "pr",
            zipCode: "000"
        };
        await facade.add(input);

        const client = await ClientModel.findOne({ where: { id: "1" }});
        expect(client).toBeDefined();
        expect(client!.name).toBe(input.name);
        expect(client!.email).toBe(input.email);
        expect(client!.street).toBe(input.street);
    });

    it ("should find a client", async () => {
        // const repository = new ClientRepository();
        // const addUseCase = new AddClientUseCase(repository);
        // const findUseCase = new FindClientUseCase(repository);
        // const facade = new ClientAdmFacade({
        //     addUseCase: addUseCase,
        //     findUseCase: findUseCase,
        // });
        const facade = ClientAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "patrik",
            email: "alexandropatrik@gmail.com",
            document: "1",
            street: "r 1",
            number: 0,
            complement: "c",
            city: "toledo",
            state: "pr",
            zipCode: "000"
        };
        await facade.add(input);

        const client = await facade.find( { id: "1" } );
        expect(client).toBeDefined();
        expect(client.id).toEqual(input.id);
        expect(client.name).toEqual(input.name);
        expect(client.email).toEqual(input.email);
        expect(client.street).toEqual(input.street);
    });

});