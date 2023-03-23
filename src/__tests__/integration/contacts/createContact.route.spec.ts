import supertest from "supertest";
import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import Contact from "../../../entities/contact.entity";
import { mockedCreateClient } from "../../mocks/createClient.route.mock";
import {
  mockedCreateContact,
  mockedCreateContactInvalidBody,
  mockedCreateContactInvalidBodyResponse,
  mockedCreateContactResponse,
} from "../../mocks/createContact.route.mock";

describe("POST /contact", () => {
  let connection: DataSource;
  const contactRepository = AppDataSource.getRepository(Contact);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((error) => console.error(error));

    await request(app).post("/client").send(mockedCreateClient);
  });

  beforeEach(async () => {
    const contact: Array<Contact> = await contactRepository.find();
    await contactRepository.remove(contact);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /client Must be able to create a contact", async () => {
    const clientLoginResponse = await request(app)
      .post("/login")
      .send(mockedCreateClient);

    const response = await request(app)
      .post("/contact")
      .send(mockedCreateContact)
      .set("Authorization", `Bearer ${clientLoginResponse.body.token}`);

    const expectedResults = {
      status: 201,
      bodyToEqual: mockedCreateContactResponse,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("fullName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("deletedAt");
    expect(response.body).toHaveProperty("isDefault");
  });

  it("POST /client - Should not be able to create client with nvalid Body", async () => {
    const response = await request(app)
      .post("/contact")
      .send(mockedCreateContactInvalidBody);

    const expectedResults = {
      status: 400,
      bodyToEqual: mockedCreateContactInvalidBodyResponse,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.objectContaining(expectedResults.bodyToEqual.message),
      })
    );
    const [users, amount] = await contactRepository.findAndCount();
    expect(amount).toBe(0);
  });
});
