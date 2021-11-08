const express = require("express");

const {
  getRobots,
  getRobotById,
  deleteRobotById,
  createRobot,
} = require("../controller/robotsControllers");

const entryPassword = require("../middleware/robotToken");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotById);

router.delete("/delete/:idRobot", entryPassword, deleteRobotById);

router.post("/create", entryPassword, createRobot);
/*

})(); router.put("/update", updateRobot);
*/
module.exports = router;
