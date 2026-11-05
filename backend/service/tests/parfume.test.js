import request from "supertest";
import {app} from "backend/server.js";

describe("GET /parfumes", () => {

    test("повинен повернути парфуми", async () => {
        const response = await request(app)
            .get("/parfumes");

        expect(response.statusCode).toBe(200);

        expect(response.body)
        console.log(response.body);
    });

});
describe("POST /parfumes", () => {

    test("помилка без name", async () => {
        const response = await request(app)
            .post("/parfumes")
            .send({
                price: 3000,
                volume: 100,
                gender: "male"
            });

        expect(response.statusCode).toBe(400);
    });

    test("помилка без price", async () => {
        const response = await request(app)
            .post("/parfumes")
            .send({
                name: "Dior Sauvage",
                volume: 100,
                gender: "male"
            });

        expect(response.statusCode).toBe(400);
    });

});