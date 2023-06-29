import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemModel } from "../repository/invoice-item.model";
import Invoice from "../domain/invoice.entity";
import Id from "../../_shared/domain/value-object/id.value-object";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-usecase/generate-invoce.usecase";
import InvoiceFacade from "./invoice.facade";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

const generateInput = {
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

describe ("invoice facade test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it ("should generate an invoice", async () => {

        const repository = new InvoiceRepository();
        const generateUseCase = new GenerateInvoiceUseCase(repository);
        const facade = new InvoiceFacade({
            generateUseCase: generateUseCase,
            findUseCase: undefined,
        });

        await facade.generate(generateInput);
        // finding by document because the generate usecase doesn't allow pass Id as input parameter - as described on the code challenge
        // so, the Id will be generated automatically as an UUID v4
        const invoice = await InvoiceModel.findOne({ where: { document: "000" }, include: "items" });

        expect(invoice).toBeDefined();
        expect(invoice.name).toBe(generateInput.name);
        expect(invoice.items.length).toBe(generateInput.items.length);
        expect(invoice.street).toBe(generateInput.street);
    });

    it ("should find a client", async () => {
        const facade = InvoiceFacadeFactory.create();
        await facade.generate(generateInput);

        const invoice = await InvoiceModel.findOne({ where: { document: "000" }, include: "items" });

        expect(invoice).toBeDefined();
        expect(invoice.name).toBe(generateInput.name);
        expect(invoice.items.length).toBe(generateInput.items.length);
        expect(invoice.street).toBe(generateInput.street);
    });

});