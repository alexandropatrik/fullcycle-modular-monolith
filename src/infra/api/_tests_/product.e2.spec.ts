import { app, sequelize} from '../express';
import request from "supertest";

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true})
    });

    afterAll(async () => {
        await sequelize.close();
    })


    it ("should create a new product", async () => {
        const response = await request(app)
            .post("/products")
            .send({
                id: "1",
                name: "mouse usb",
                description: "mouse usb desc",
                purchasePrice: 150,
                stock: 30
            });
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("mouse usb");
        expect(response.body.description).toBe("mouse usb desc");
        expect(response.body.purchasePrice).toBe(150);
        expect(response.body.stock).toBe(30);
    });

});