import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import ProductRepository from "./product.repository";

describe("produto repository test", () => {
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
    
    it("should find all products", async () => {
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 150,
        });
        await ProductModel.create({
            id: "2",
            name: "Product 2",
            description: "Product 2 description",
            salesPrice: 250,
        });

        const productRepository = new ProductRepository();
        const result = await productRepository.findAll();

        expect(result.length).toBe(2);
        expect(result[0].id.id).toBe("1");
        expect(result[0].name).toBe("Product 1");
        expect(result[0].description).toBe("Product 1 description");
        expect(result[0].salesPrice).toBe(150);
        expect(result[1].id.id).toBe("2");
        expect(result[1].name).toBe("Product 2");
        expect(result[1].description).toBe("Product 2 description");
        expect(result[1].salesPrice).toBe(250);

    });

    it("should find a product", async () => {
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 150,
        });

        const productRepository = new ProductRepository();
        const result = await productRepository.find("1");

        expect(result.id.id).toEqual("1");
        expect(result.name).toEqual("Product 1");
        expect(result.description).toEqual("Product 1 description");
        expect(result.salesPrice).toEqual(150);
    });

});