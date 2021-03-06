const express = require("express");

const {
  getRobots,
  getRobotById,
  deleteRobotById,
  createRobot,
} = require("../controller/robotsControllers");

// const entryPassword = require("../middleware/robotToken");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotById);

router.delete("/delete/:idRobot", deleteRobotById);

router.post("/create", createRobot);
/*

})(); router.put("/update", updateRobot);
*/
module.exports = router;
