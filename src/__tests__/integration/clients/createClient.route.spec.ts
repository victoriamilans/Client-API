import supertest from "supertest";
import { DataSource } from "typeorm";
import app from "../../../app";
import { AppDataSource } from "../../../data-source";
import Client from "../../../entities/client.entity";
import createClientRouteMock from "../../mocks/createClient.route.mock";

describe("POST /client", () => {
  let connection: DataSource;

  const baseUrl: string = "/client";
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

  it("Success: Must be able to create a client", async () => {
    const response = await supertest(app)
      .post(baseUrl)
      .send(createClientRouteMock.clientComplete);

    const { password, ...bodyEqual } = createClientRouteMock.clientComplete;
    const expectResults = {
      status: 201,
    };

    expect(response.status).toBe(expectResults.status);
    expect(response.body).toEqual(expect.objectContaining(bodyEqual));

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        deletedAt: null,
      })
    );
  });
});
