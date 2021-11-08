const express = require("express");

const {
  getRobots,
  getRobotById,
  deleteRobotById,
  createRobot,
} = require("../controller/robotsControllers");

const entryPassword = require("../middleware/robotToken");

const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, getRobots);

router.get("/:idRobot", auth, getRobotById);

router.delete("/delete/:idRobot", auth, entryPassword, deleteRobotById);

router.post("/create", auth, entryPassword, createRobot);
/*

})(); router.put("/update", updateRobot);
*/
module.exports = router;
