import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import { mockedCreateClient } from "../../mocks/createClient.route.mock";
import { mockedCreateContact } from "../../mocks/createContact.route.mock";

describe("GET /contact", () => {
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
  });

  afterAll(async () => {
    await conn.destroy();
  });

  it("GET /contact - Must be able to list contacts", async () => {
    const token = await request(app)
      .post("/login")
      .send(mockedCreateClient)
      .then((res) => res.body.token);

    await request(app)
      .post("/contact")
      .send(mockedCreateContact)
      .set("Authorization", `Bearer ${token}`);

    await request(app)
      .post("/contact")
      .send(mockedCreateContact)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get("/contact")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body.contacts).toHaveLength(2);
    expect(response.body.contacts[0]).toHaveProperty("id");
    expect(response.body.contacts[0]).toHaveProperty("fullName");
    expect(response.body.contacts[0]).toHaveProperty("email");
    expect(response.body.contacts[0]).toHaveProperty("phone");
    expect(response.body.contacts[0]).toHaveProperty("createdAt");
    expect(response.body.contacts[0]).toHaveProperty("updatedAt");
    expect(response.body.contacts[0]).toHaveProperty("deletedAt");
    expect(response.body.contacts[0]).toHaveProperty("isDefault");
  });
});
