import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";

describe("place order unit tests", () => {

    describe("validate products method", () => {
        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUseCase();

        it ("should thrown error if no products are selected", async () => {
            const input: PlaceOrderInputDto = {
                clientId: "0", 
                products: [],
            };
    
            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("No products selected"));
        });

        it ("should thrown an error when product is out of stock", async () => {
            const mockProductFacade = {
                checkStock: jest.fn(({ productId }: { productId: string }) => 
                    Promise.resolve({
                        productId,
                        stock: productId === "1" ? 0 : 1,
                    })
                ),
            };

            //@ts-expect-error - force set productFacade
            placeOrderUseCase["_productFacade"] = mockProductFacade;

            let input: PlaceOrderInputDto = {
                clientId: "0",
                products: [{productId: "1"}]
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"));

            input = {
                clientId: "0",
                products: [{productId: "0"}, {productId: "1"}]
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"));
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

            input = {
                clientId: "0",
                products: [{productId: "0"}, {productId: "1"}, {productId: "2"}]
            };

            await expect(placeOrderUseCase["validateProducts"](input)).rejects.toThrow(new Error("Product 1 is not available in stock"));
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);
        });

    });

    describe("execute method", () => {

        it ("should thrown an error when client not found", async () => {
            const mockClientFacade = {
                find: jest.fn().mockReturnValue(null),
            };

            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();
            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;
    
            const input: PlaceOrderInputDto = {
                clientId: "0", 
                products: [],
            };

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error("Client not found"));
        });

        it ("should thrown an error when products are not valid", async () => {
            const mockClientFacade = {
                find: jest.fn().mockReturnValue(true),
            };
        
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUseCase();

            const mockValidateProducts = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - not return never
                .mockRejectedValue(new Error("No products selected"));
    
            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;
    
            const input: PlaceOrderInputDto = {
                clientId: "1", 
                products: [],
            };
    
            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error("No products selected"));
            expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        });
    
    });

    

});

    /*it ("should place an order", async () => {

    });*/