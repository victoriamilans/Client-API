import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { mockedCreateClient } from "../../mocks/createClient.route.mock";
import { mockedCreateContact } from "../../mocks/createContact.route.mock";

describe("DELETE /contact", () => {
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

  it("DELETE /contact/:id - Should not be able to delete a contact without authentication", async () => {
    const clientLoginResponse = await request(app)
      .post("/login")
      .send(mockedCreateClient);

    const createResponse = await request(app)
      .post("/contact")
      .send(mockedCreateContact)
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`);

    const contactTobeDeleted = await request(app)
      .get("/contact")
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`);

    const response = await request(app).delete(
      `/contact/${contactTobeDeleted.body.contacts[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Missing authorization");
    expect(response.status).toBe(401);
  });

  it("DELETE /contact/:id - Must be able to soft delete a contact", async () => {
    const clientLoginResponse = await request(app)
      .post("/login")
      .send(mockedCreateClient);

    const createResponse = await request(app)
      .post("/contact")
      .send(mockedCreateContact)
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`);

    const contactTobeDeleted = await request(app)
      .get("/contact")
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/contact/${contactTobeDeleted.body.contacts[0].id}`)
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`);

    expect(response.status).toBe(204);
  });

  it("DELETE /contact/:id - Should not be able to delete contact with invalid id", async () => {
    const clientLoginResponse = await request(app)
      .post("/login")
      .send(mockedCreateClient);

    const createResponse = await request(app)
      .post("/contact")
      .send(mockedCreateContact)
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`);

    const contactTobeDeleted = await request(app)
      .get("/contact")
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`);

    const response = await request(app)
      .delete(`/contact/13970660-5dbe-423a-9a9d-5c23b37943cf`)
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Contact not found");
  });
});
