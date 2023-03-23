import { IClient, IClientResponse } from "../../interfaces/client.interface";

export const mockedCreateClient: IClient = {
  fullName: "Victoria Milan",
  email: "victoria@gmail.com",
  phone: "19989484772",
  password: "Senha123!",
};

export const mockedCreatedClientResponse: IClientResponse = {
  fullName: "Victoria Milan",
  email: "victoria@gmail.com",
  phone: "19989484772",
  id: "1b03bd87-59a5-4f37-9d97-f08485537a9c",
  createdAt: "2023-03-23",
  updatedAt: "2023-03-23",
  deletedAt: null,
  isActive: true,
};

export const mockedClientInvalidBody: any = {
  fullNamee: "Victoria Milan",
  emaill: "victoria10@gmail.com",
  telephonee: "19989484772",
};

export const mockedClientInvalidBodyResponse: any = {
  message: {
    fullName: ["Required"],
    email: ["Required"],
    password: ["Required"],
    phone: ["Required"],
  },
};

export const mockedClientUniqueEmailResponse: any = {
  message: "Email alredy exists",
};

export const mockedClientToList: IClient = {
  fullName: "Hanzo",
  email: "hanzo3@gmail.com",
  phone: "19989484772",
  password: "Teste123!",
};
