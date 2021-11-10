const debug = require("debug")("robots:database");

const chalk = require("chalk");
const mongoose = require("mongoose");

const dataBaseInitializer = (robotsDB) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v;
      },
    });
    mongoose.connect(robotsDB, (error) => {
      if (error) {
        debug(
          chalk.red(
            "Connection to Server failed, what a pity : (╯°□°）╯︵ ┻━┻)"
          )
        );
        debug(chalk.red(error.message));
        reject(error);
      }
      debug(chalk.bgMagenta("Connect to Server Succesful YAY!  ＼ʕ •ᴥ•ʔ／ "));
      resolve();
    });
    mongoose.connection.on("close", () => {
      debug(chalk.green("Desconectado de la base de datos now I DIE"));
    });
  });

module.exports = dataBaseInitializer;
