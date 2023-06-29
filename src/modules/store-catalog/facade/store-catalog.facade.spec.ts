import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/facade.factory";
import Id from "../../_shared/domain/value-object/id.value-object";

describe ("store catalog facade test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it ("should find a product", async () => {
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 150
        });

        const facade = StoreCatalogFacadeFactory.create();
        const result = await facade.find({ id: "1" });
        expect(result.id).toBe("1");
        expect(result.name).toBe("Product 1");
        expect(result.description).toBe("Product 1 description");
        expect(result.salesPrice).toBe(150);
    })

    it ("should find all products", async () => {
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 150
        });
        await ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Product 2 description",
            salesPrice: 250
        });

        const facade = StoreCatalogFacadeFactory.create();
        const result = await facade.findAll();

        expect(result.products.length).toBe(2);

        expect(result.products[0].id.id).toBe("1");
        expect(result.products[0].name).toBe("Product 1");
        expect(result.products[0].description).toBe("Product 1 description");
        expect(result.products[0].salesPrice).toBe(150);
        expect(result.products[1].id.id).toBe("2");
        expect(result.products[1].name).toBe("Product 2");
        expect(result.products[1].description).toBe("Product 2 description");
        expect(result.products[1].salesPrice).toBe(250);
    })

});