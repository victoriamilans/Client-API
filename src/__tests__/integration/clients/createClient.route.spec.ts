import supertest from "supertest";
import request from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import Client from "../../../entities/client.entity";
import {
  mockedClientInvalidBody,
  mockedClientInvalidBodyResponse,
  mockedClientUniqueEmailResponse,
  mockedCreateClient,
  mockedCreatedClientResponse,
} from "../../mocks/createClient.route.mock";

describe("POST /contact", () => {
  let connection: DataSource;
  const clientRepository = AppDataSource.getRepository(Client);

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((error) => console.error(error));
  });

  beforeEach(async () => {
    const client: Array<Client> = await clientRepository.find();
    await clientRepository.remove(client);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("POST /client Must be able to create a contact", async () => {
    const response = await request(app)
      .post("/client")
      .send(mockedCreateClient);

    const expectedResults = {
      status: 201,
      bodyToEqual: mockedCreatedClientResponse,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("fullName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("phone");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body).toHaveProperty("deletedAt");
    expect(response.body).toHaveProperty("isActive");

    expect(response.body).not.toHaveProperty("password");

    expect(response.body).not.toEqual(
      expect.objectContaining({ password: expect.any(String) })
    );

    const [client, amount] = await clientRepository.findAndCountBy({
      id: response.body.id,
    });
    expect(amount).toBe(1);
  });

  it("POST /client - Should not be able to create client with nvalid Body", async () => {
    const response = await request(app)
      .post("/client")
      .send(mockedClientInvalidBody);

    const expectedResults = {
      status: 400,
      bodyToEqual: mockedClientInvalidBodyResponse,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining({
        message: expect.objectContaining(expectedResults.bodyToEqual.message),
      })
    );

    const [users, amount] = await clientRepository.findAndCount();
    expect(amount).toBe(0);
  });

  it("POST /client - Should not be able to create user with an email that alredy exists", async () => {
    const user = clientRepository.create(mockedCreateClient);
    await clientRepository.save(user);

    const response = await request(app)
      .post("/client")
      .send(mockedCreateClient);

    const expectedResults = {
      status: 409,
      bodyToEqual: mockedClientUniqueEmailResponse,
    };

    expect(response.status).toBe(expectedResults.status);
    expect(response.body).toEqual(
      expect.objectContaining(expectedResults.bodyToEqual)
    );

    const [users, amount] = await clientRepository.findAndCount();
    expect(amount).toBe(1);
  });
});
