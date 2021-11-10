const express = require("express");
const cors = require("cors");
const debug = require("debug")("robots:server");
const morgan = require("morgan");
const chalk = require("chalk");

const { notFoundHandler, generalErrorHandler } = require("./error");
const robotsRoutes = require("./routes/robotsRoutes");
const userRoutes = require("./routes/usersRoutes");
const auth = require("./middleware/auth");

const app = express();

const initializeServer = (port) =>
  new Promise((resolve) => {
    const server = app.listen(port, () => {
      debug(chalk.magentaBright(`Listen to port: ${port}`));
    });

    server.on("error", (error) => {
      debug(chalk.red("A wild error appeared"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`The port ${port} is already in use (╯°□°）╯︵ ┻━┻`));
      }
    });
    resolve(server);
  });

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  debug(chalk.green("REQUEST ARRIVED ʕง•ᴥ•ʔง"));
  next();
});

app.use("/robots", auth, robotsRoutes);
app.use("/users", userRoutes);

app.use(notFoundHandler);
app.use(generalErrorHandler);

module.exports = { initializeServer, app };
