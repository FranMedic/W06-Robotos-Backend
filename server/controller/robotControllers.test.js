const Robot = require("../../database/models/robot");
const { getFakeRobots } = require("../../factories/robotsFactory");
const { getRobots, getRobotById } = require("./robotsControllers");

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
});
