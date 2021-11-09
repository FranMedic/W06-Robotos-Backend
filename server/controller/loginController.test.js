require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");
const loginUser = require("./loginController");

jest.mock("../../database/models/user");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Given loginUser function", () => {
  describe("When it receives a req object with wrong username and password a res object, and a next function", () => {
    test("then it should invoke the next function with an 401 error  ", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      const req = {
        body: {
          username: "texto",
          password: "deejemplo",
        },
      };
      const next = jest.fn();
      const expectedError = new Error("wrong credentials (╯°□°）╯︵ ┻━┻");
      expectedError.code = 401;

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("When it receives a right username but a wrong password", () => {
    test("then it should invoke next function with a 401 error code", async () => {
      User.findOne = jest
        .fn()
        .mockResolvedValue({ username: "texto", password: "deejmeplo" });

      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const req = {
        body: {
          username: "texto",
          password: "deejemplo",
        },
      };
      const next = jest.fn();
      const expectedError = new Error("wrong credentials (╯°□°）╯︵ ┻━┻");
      expectedError.code = 400;

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
      console.log(next.mock.calls);
    });
  });

  describe("when it receives a right username and password", () => {
    test("then it should invoke res.json with an object with a new token inside", async () => {
      User.findOne = jest.fn().mockResolvedValue({
        id: 10,
        username: "texto",
        password: "deejmeplo",
      });
      const expectedToken = "papaya";
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(expectedToken);
      const req = {
        body: {
          username: "texto",
          password: "deejemplo",
        },
      };
      const res = {
        json: jest.fn(),
      };

      const expectedResponse = { token: expectedToken };

      await loginUser(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
