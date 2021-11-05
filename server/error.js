const chalk = require("chalk");

const debug = require("debug")("robots:errors");

const notFoundHandler = (req, res) => {
  res.status(404).json({ error: "Endpoint not found (╯°□°）╯︵ ┻━┻`" });
};
// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  debug(chalk.red("Hubo un errosito de nada(╯°□°）╯︵ ┻━┻: ", error.message));
  const message = error.code
    ? error.message
    : "errosito General Petation (╯°□°）╯︵ ┻━┻";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  notFoundHandler,
  generalErrorHandler,
};
