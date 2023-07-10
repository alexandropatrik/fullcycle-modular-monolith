import { app, sequelize} from '../express';
import request from "supertest";

describe("E2E test for invoice", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true})
    });

    afterAll(async () => {
        await sequelize.close();
    })


    it ("should get a invoice", async () => {

        //create a client
        const clientResponse = await request(app)
            .post("/clients")
            .send({
                id: "c1",
                name: "patrik",
                email: "alexandropatrik@gmail.com",
                document: "123",
                street: "rua",
                number: 1,
                complement: "casa",
                city: "toledo",
                state: "pr",
                zipCode: "000"
            });

        expect(clientResponse.status).toBe(200); 

        //create a product
        const productResponse = await request(app)
            .post("/products")
            .send({
                id: "p1",
                name: "mouse usb",
                description: "mouse usb desc",
                purchasePrice: 150,
                salesPrice: 250,
                stock: 30
            });
        expect(productResponse.status).toBe(200);
        
        // create an order
        const responseCheckout = await request(app)
            .post("/checkout")
            .send({
                clientId: "c1",
                products: [
                    {
                        productId: "p1"
                    }
                ]
            });
        expect(responseCheckout.status).toBe(200);

        // get invoice
        const response = await request(app)
            .get(`/invoice/${responseCheckout.body.invoiceId}`);
        expect(response.status).toBe(200);
        expect(response.body.total).toBe(250);
    });

});