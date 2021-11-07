const entryPassword = require("./robotToken");

describe("Given a entryPassword function", () => {
  describe("When it receives an object req with a correct token", () => {
    test("Then it should invoke the function next", async () => {
      const req = {
        query: {
          token: process.env.TOKEN,
        },
      };

      const res = {};

      const next = jest.fn();

      await entryPassword(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it receives an object req with an incorrect token", () => {
    test("Then it should respond with an error", async () => {
      const req = {
        query: {
          token: "BAD TOKEN",
        },
      };

      const res = {
        json: jest.fn(),
        status: jest.fn(),
      };

      const next = jest.fn();

      await entryPassword(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
