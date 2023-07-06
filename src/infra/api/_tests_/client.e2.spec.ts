import { app, sequelize} from '../express';
import request from "supertest";

describe("E2E test for client", () => {

    beforeEach(async () => {
        await sequelize.sync({force: true})
    });

    afterAll(async () => {
        await sequelize.close();
    })

    it ("should create a new client", async () => {
        const response = await request(app)
            .post("/clients")
            .send({
                id: "1",
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

        expect(response.status).toBe(200); 
    });

});