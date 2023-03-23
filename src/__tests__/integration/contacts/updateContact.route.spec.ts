import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedClientToList,
  mockedCreateClient,
} from "../../mocks/createClient.route.mock";
import {
  mockedCreateContact,
  mockedCreateContactToList,
} from "../../mocks/createContact.route.mock";

describe("PATCH /contact", () => {
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

  it("PATCH /contact/:id - Should not be able to update a contact without authentication", async () => {
    const response = await request(app).get("/contact");

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization");
    expect(response.status).toBe(401);
  });

  it("PATCH /contact/:id - Should not be able to update a contact with invalid id", async () => {
    const newValues = { fullName: "Altieris", email: "altieris@mail.com" };

    const clientLoginResponse = await request(app)
      .post("/login")
      .send(mockedCreateClient);
    const token = `Bearer ${clientLoginResponse.body.token}`;

    const response = await request(app)
      .patch(`/contact/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", token)
      .send(newValues);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  it("PATCH /contact/:id - Should be able to update a contact", async () => {
    const newValues = { fullName: "Felipe", email: "felipes@mail.com" };

    const clientLoginResponse = await request(app)
      .post("/login")
      .send(mockedCreateClient);

    const createResponse = await request(app)
      .post("/contact")
      .send(mockedCreateContact)
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`);

    const contactTobeUpdateRequest = await request(app)
      .get("/contact")
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`);

    const response = await request(app)
      .patch(`/contact/${contactTobeUpdateRequest.body.contacts[0].id}`)
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`)
      .send(newValues);

    expect(response.status).toBe(200);
    expect(response.body.fullName).toEqual("Felipe");
  });
});
