const express = require("express");
const { getRobots, getRobotById } = require("../controller/robotsController");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotById);

/* router.post("/create", createRobot);

router.delete("/delete/:idRobot", deleteRobotById);

router.put("/update", updateRobot); */

module.exports = router;
