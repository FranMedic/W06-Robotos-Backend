const Robot = require("../../database/models/robot");
const { getFakeRobots } = require("../../factories/robotsFactory");
const { getRobots } = require("./robotsControllers");

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
