const debug = require("debug")("robots:controller");
const chalk = require("chalk");
const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots);
};

const getRobotById = async (req, res, next) => {
  const { idRobot } = req.params;
  try {
    const searchRobot = await Robot.findById(idRobot);
    if (searchRobot) {
      debug(chalk.green("loaded item ʕ •ᴥ•ʔゝ☆"));
      res.json(searchRobot);
    } else {
      const error = new Error("Robot not found (╯°□°）╯︵ ┻━┻");
      error.code = 404;
      throw error;
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

module.exports = {
  getRobots,
  getRobotById,
};
