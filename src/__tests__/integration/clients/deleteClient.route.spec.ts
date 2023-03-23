import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedCreateClient } from "../../mocks/createClient.route.mock";

describe("DELETE /client", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/client").send(mockedCreateClient);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("DELETE /client/:id - hould not be able to delete client without authentication", async () => {
    const clientTobeDeleted = await request(app).get("/client");

    const response = await request(app).delete(
      `/client/${clientTobeDeleted.body.clients[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization");
    expect(response.status).toBe(401);
  });

  it("DELETE /client/:id - Must be able to soft delete a client", async () => {
    const clientLoginResponse = await request(app)
      .post("/login")
      .send(mockedCreateClient);

    const clientTobeDeleted = await request(app).get("/client");

    const response = await request(app)
      .delete(`/client/${clientTobeDeleted.body.clients[0].id}`)
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });
});
