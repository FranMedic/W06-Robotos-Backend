const debug = require("debug")("robots:database");

const chalk = require("chalk");
const mongoose = require("mongoose");

const dataBaseInitializer = (robotsDB) => {
  mongoose.connect(robotsDB, (error) => {
    if (error) {
      debug(
        chalk.red("Connection to Server failed, what a pity : (╯°□°）╯︵ ┻━┻)")
      );
      debug.apply(chalk.red(error.message));
      return;
    }
    debug(chalk.bgMagenta("Connect to Server Succesful YAY!  ＼ʕ •ᴥ•ʔ／ "));
  });
};

module.exports = dataBaseInitializer;
