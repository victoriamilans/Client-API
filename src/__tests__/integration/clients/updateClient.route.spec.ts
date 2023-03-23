import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedClientToList,
  mockedCreateClient,
} from "../../mocks/createClient.route.mock";

describe("PATCH /client", () => {
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

  it("PATCH /client/:id - Should not be able to update client without authentication", async () => {
    const clientLoginResponse = await request(app)
      .post("/login")
      .send(mockedCreateClient);
    const clientToBeUpdated = await request(app)
      .get("/client")
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`);
    const response = await request(app).patch(
      `/client/${clientToBeUpdated.body.clients[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization");
    expect(response.status).toBe(401);
  });

  it("PATCH /client/:id - Should not be able to update client without permission", async () => {
    const clientLoginResponse = await request(app)
      .post("/login")
      .send(mockedCreateClient);
    const token = `Bearer ${clientLoginResponse.body.token}`;

    const clientToBeUpdated = await request(app)
      .get("/client")
      .set("Authorization", token);

    const client = await request(app).post("/client").send(mockedClientToList);
    const response = await request(app)
      .patch(`/client/${client.body.id}`)
      .set("Authorization", token);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing permission");
    expect(response.status).toBe(401);
  });

  it("PATCH /client/:id - Should not be able to update a client with invalid id", async () => {
    const newValues = { name: "Altieris", email: "altieris@mail.com" };

    const clientLoginResponse = await request(app)
      .post("/login")
      .send(mockedCreateClient);
    const token = `Bearer ${clientLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`/client/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("PATCH /client/:id - Should be able to update client", async () => {
    const newValues = { fullName: "Felipe", email: "felipes@mail.com" };

    const LoginResponse = await request(app)
      .post("/login")
      .send(mockedCreateClient);
    const token = `Bearer ${LoginResponse.body.token}`;

    const clientTobeUpdateRequest = await request(app)
      .get("/client")
      .set("Authorization", token);
    const clientTobeUpdateId = clientTobeUpdateRequest.body.clients[0].id;

    const response = await request(app)
      .patch(`/client/${clientTobeUpdateId}`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.status).toBe(200);
    expect(response.body.fullName).toEqual("Felipe");
    expect(response.body).not.toHaveProperty("password");
  });
});
