export const mockedCreateContact = {
  fullName: "Victoria Milan",
  email: "victoria@gmail.com",
  phone: "19989484772",
  isDefault: true,
};

export const mockedCreateContactToList = {
  fullName: "Hanzo",
  email: "hanzo@gmail.com",
  phone: "19989484772",
  isDefault: true,
};

export const mockedCreateContactResponse = {
  id: "3d81749b-c128-4a00-b273-9800c869e51e",
  fullName: "Victoria Milan",
  email: "victoria@gmail.com",
  phone: "19989484772",
  isDefault: false,
  createdAt: "2023-03-22",
  updatedAt: "2023-03-22",
  deletedAt: null,
};

export const mockedCreateContactInvalidBody = {
  fullNameee: "Victoria Milan",
};

export const mockedCreateContactInvalidBodyResponse = {
  message: {
    fullName: ["Required"],
    email: ["Required"],
    phone: ["Required"],
    isDefault: ["Required"],
  },
};
