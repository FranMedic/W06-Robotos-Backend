const express = require("express");

const debug = require("debug")("robots:server");
const morgan = require("morgan");
const chalk = require("chalk");
const { notFoundHandler, generalErrorHandler } = require("./error");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.magentaBright(`Listen to port: ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("A wild error appeared"));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`The port ${port} is already in use (╯°□°）╯︵ ┻━┻`));
    }
  });
};

app.use(morgan("dev"));
app.use(express.json());
app.use((req, res) => {
  debug(chalk.green("REQUEST ARRIVED ʕง•ᴥ•ʔง"));
  res.json("LLEGUE MA BRO ＼ʕ •ᴥ•ʔ／");
});

app.use(notFoundHandler);
app.use(generalErrorHandler);
module.exports = initializeServer;