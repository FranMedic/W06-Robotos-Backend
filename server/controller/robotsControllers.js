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
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const deleteRobotById = async (req, res, next) => {
  const { idRobot } = req.params;
  try {
    const searchRobot = await Robot.findByIdAndDelete(idRobot);
    if (searchRobot) {
      debug(chalk.green("deleted item ʕ •ᴥ•ʔゝ☆ "));
      res.json(searchRobot);
    } else {
      const error = new Error("Robot not found  (╯°□°）╯︵ ┻━┻");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    const newRobot = await Robot.create(robot);
    debug(chalk.green("created item"));
    res.json(newRobot);
  } catch (error) {
    error.code = 400;
    error.message = "fallo";
    next(error);
  }
};

module.exports = {
  getRobots,
  getRobotById,
  deleteRobotById,
  createRobot,
};
