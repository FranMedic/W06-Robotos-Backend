const chalk = require("chalk");
const { ValidationError } = require("express-validation");

const debug = require("debug")("robots:errors");

const notFoundHandler = (req, res) => {
  res.status(404).json({ error: "Endpoint not found (╯°□°）╯︵ ┻━┻`" });
};
// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    error.code = 400;
    error.message = "WHAT DID U SEND ME! (╯°□°）╯︵ ┻━┻";
  }
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
