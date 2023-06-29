import Id from "../../../_shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 150
});
const product2 = new Product({
    id: new Id("2"),
    name: "Product 2",
    description: "Product 2 description",
    salesPrice: 250
});

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
    }
}

describe ("find all products use case unit test", () => {

    it ("should find all products", async () => {
        const productRespository = MockRepository();
        const usecase = new FindAllProductsUseCase(productRespository);

        const result = await usecase.execute();
        expect(productRespository.findAll).toHaveBeenCalled();
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

})