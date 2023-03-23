import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedCreateClient } from "../../mocks/createClient.route.mock";

describe("GET /clients/:id", () => {
  let connection: DataSource;
  let clientId: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app)
      .post("/client")
      .send(mockedCreateClient)
      .then((res) => {
        clientId = res.body.id;
      });

    await request(app).post("/client").send(mockedCreateClient);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("GET/client/:id - Must be able to list a client", async () => {
    const tokenAdmin = await request(app)
      .post("/login")
      .send(mockedCreateClient)
      .then((res) => res.body.token);

    const response = await request(app)
      .get(`/client/${clientId}`)
      .set("Authorization", `Bearer ${tokenAdmin}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("fullName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("deletedAt");
  });

  it("GET/client/:id - Should not be able to list non-existent client", async () => {
    const userNonExistent = "f71a2eb2-e641-4936-9b56-e364a9dba7a3";

    const token = await request(app)
      .post("/login")
      .send(mockedCreateClient)
      .then((res) => res.body.token);

    const response = await request(app)
      .get(`/client/${userNonExistent}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Client not found");
  });
});
