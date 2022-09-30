export const user = {
  id: Object("62b83c2e89301b1aecf6af78"),
  googleId: "testId",
  email: "test@example.com",
  firstName: "testFirstName",
  lastName: "testLastName",
  isDeleted: false,
  isActivated: false,
  password: "password",
  createdAt: new Date(),
  updatedAt: new Date(),
  otp: "",
  otpCreatedAt: null,
  otpExpiresAt: null,
};

export const userInfo = {
  id: Object("62b83c2e89301b1aecf6af78"),
  googleId: "updateId",
  email: "update@example.com",
  firstName: "updateFirstName",
  lastName: "updateLastName",
};

export const updatedUser = {
  id: Object("62b83c2e89301b1aecf6af78"),
  googleId: "updateId",
  email: "update@example.com",
  firstName: "updateFirstName",
  lastName: "updateLastName",
  isDeleted: false,
  isActivated: false,
  password: "updatedPassword",
  createdAt: new Date("2022-06-18T09:44:29.044+00:00"),
  updatedAt: new Date(),
  otp: "",
  otpCreatedAt: null,
  otpExpiresAt: null,
};

export const userArray = [
  {
    id: Object("62b83c2e89301b1aecf6af78"),
    googleId: "testIdoOne",
    email: "testOne@example.com",
    firstName: "testFirstNameOne",
    lastName: "testLastNameOne",
    isDeleted: false,
    isActivated: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    otp: "",
    otpCreatedAt: null,
    otpExpiresAt: null,
  },
  {
    id: Object("62b83c2e89301b1aecf6af79"),
    googleId: "testIdoTwo",
    email: "testTwo@example.com",
    firstName: "testTwoFirstName",
    lastName: "testTwoLastName",
    isDeleted: false,
    isActivated: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    otp: "",
    otpCreatedAt: null,
    otpExpiresAt: null,
  },
];

export const unconnectedAccount = {
  googleId: null,
  email: "test@example.com",
  updatedAt: new Date(),
};

export const connectedAccount = {
  googleId: "updatedGoogleId",
  email: "test@example.com",
  updatedAt: new Date(),
};
