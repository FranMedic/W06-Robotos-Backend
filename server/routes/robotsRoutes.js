const express = require("express");

const router = express.Router();

router.get("/", getRobots);

router.get("/pet/:idRobot", getRobotById);

router.post("/create", createRobot);

router.delete("/delete/:idRobot", deleteRobotById);

router.put("/update", updateRobot);

module.exports = router;
