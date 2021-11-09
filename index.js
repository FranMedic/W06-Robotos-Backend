require("dotenv").config();
const dataBaseInitializer = require("./database/index");

const { initializeServer } = require("./server/index");

const robotsDB = process.env.MONGODB_ROBOTS;

const port = process.env.PORT ?? process.env.SERVER_PORT_API ?? 6000;
(async () => {
  try {
    await dataBaseInitializer(robotsDB);
    await initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
