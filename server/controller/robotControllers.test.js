const Robot = require("../../database/models/robot");
const {
  getFakeRobots,
  getFakeRobot,
} = require("../../factories/robotsFactory");
const {
  getRobots,
  getRobotById,
  deleteRobotById,
  createRobot,
} = require("./robotsControllers");

describe("Given  a getRobots function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke his method json", async () => {
      const robots = getFakeRobots();
      Robot.find = jest.fn().mockResolvedValue(robots);
      const res = {
        json: jest.fn(),
      };

      await getRobots(null, res);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robots);
    });
  });
});

describe("Given a getRobotById function", () => {
  describe("When it recieves a req with and id 10, a res object and a next function", () => {
    test("Then it should invoke Robot.findById with a 10", async () => {
      Robot.findById = jest.fn().mockResolvedValue({});
      const idRobot = 10;
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};

      await getRobotById(req, res, next);

      expect(Robot.findById).toHaveBeenCalledWith(idRobot);
    });
  });

  describe("And Robot.findById rejects", () => {
    test("Then it should invoke next function with the error rejected", async () => {
      const error = {};
      Robot.findById = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          idRobot: 0,
        },
      };
      const res = {};
      const next = jest.fn();

      await getRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });

  describe("and Robot.findById resolves to fakeRobot", () => {
    test("Then it should invoke res.json with the object fakeRobot", async () => {
      const idRobot = 10;
      const fakeRobot = getFakeRobot();
      Robot.findById = jest.fn().mockResolvedValue(fakeRobot);
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: jest.fn(),
      };

      await getRobotById(req, res);

      expect(res.json).toHaveBeenCalledWith(fakeRobot);
    });
  });

  describe("and Robot.findByIdAndDelete resolves and id undefined", () => {
    test("then it should invoke next function with the error created", async () => {
      const error = new Error("Robot not found (??????????????????? ?????????");
      error.code = 404;
      Robot.findById = jest.fn();
      const req = {
        params: {
          idRobot: 0,
        },
      };
      const res = {};
      const next = jest.fn();

      await getRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
    });
  });
});

describe("Given a deleteRobotById function", () => {
  describe("When it receives a req with an id 10, a res object and a next function", () => {
    test("Then it should invoke Robot.findByIdandDelete with the id 10", async () => {
      const idRobot = 10;
      Robot.findByIdAndDelete = jest.fn().mockResolvedValue({});
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = () => {};

      await deleteRobotById(req, res, next);

      expect(Robot.findByIdAndDelete).toHaveBeenCalledWith(idRobot);
    });
  });
  describe("And Robot.findByIdAndDelete rejects", () => {
    test("Then it should invoke next function with the error rejected", async () => {
      const error = {};
      Robot.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          idRobot: 0,
        },
      };
      const res = {};
      const next = jest.fn();

      await deleteRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
  describe("and Robot.findByIdAndDelete resolves and id undefined", () => {
    test("then it should invoke next function with the error created", async () => {
      const error = new Error("Robot not found  (??????????????????? ?????????");
      error.code = 404;
      Robot.findByIdAndDelete = jest.fn();
      const req = {
        params: {
          idRobot: 0,
        },
      };
      const res = {};
      const next = jest.fn();

      await deleteRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
    });
  });

  describe("and Robot.findById resolves to fakeRobot", () => {
    test("Then it should invoke res.json with the string Deleted ????? ??????????????", async () => {
      const idRobot = 1;
      const fakeRobot = getFakeRobot();
      Robot.findByIdAndDelete = jest.fn().mockResolvedValue(fakeRobot);
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();

      await deleteRobotById(req, res, next);

      expect(res.json).toHaveBeenCalledWith(fakeRobot);
    });
  });
});

describe("Given a createRobot function", () => {
  describe("When it receives a req object with a body, a res objetc and with and a next function", () => {
    test("Then it should invoke the method json of res with the Robot.Create", async () => {
      const robotcito = getFakeRobot();

      const req = {
        body: robotcito,
      };

      Robot.create = jest.fn().mockResolvedValue(robotcito);
      const res = {
        json: jest.fn(),
      };
      const next = () => {};

      await createRobot(req, res, next);

      expect(Robot.create).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robotcito);
    });
  });
  describe("And Robot.findById rejects", () => {
    test("Then it should invoke next function with the error rejected", async () => {
      const error = {};
      Robot.create = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          idRobot: 0,
        },
      };
      const res = {};
      const next = jest.fn();

      await createRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });
});
