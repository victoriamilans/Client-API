import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import {
  mockedClientToList,
  mockedCreateClient,
} from "../../mocks/createClient.route.mock";

describe("GET /clients", () => {
  let conn: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        conn = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/client").send(mockedCreateClient);
    await request(app).post("/client").send(mockedClientToList);
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("GET/client - Must be able to list clients", async () => {
    const token = await request(app)
      .post("/login")
      .send(mockedCreateClient)
      .then((res) => res.body.token);

    const response = await request(app)
      .get("/client")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.clients).toHaveLength(2);
    expect(response.body.clients[0]).toHaveProperty("id");
    expect(response.body.clients[0]).toHaveProperty("fullName");
    expect(response.body.clients[0]).toHaveProperty("email");
    expect(response.body.clients[0]).toHaveProperty("phone");
    expect(response.body.clients[0]).toHaveProperty("isActive");
    expect(response.body.clients[0]).toHaveProperty("createdAt");
    expect(response.body.clients[0]).toHaveProperty("updatedAt");
    expect(response.body.clients[0]).toHaveProperty("deletedAt");
  });
});
