const express = require("express");
const cors = require("cors");
const {
  getRobots,
  getRobotById,
  deleteRobotById,
  createRobot,
} = require("../controller/robotsControllers");

const entryPassword = require("../middleware/robotToken");

const router = express.Router();

const auth = require("../middleware/auth");

router.get("/", cors(), auth, getRobots);

router.get("/:idRobot", cors(), auth, getRobotById);

router.delete("/delete/:idRobot", cors(), auth, entryPassword, deleteRobotById);

router.post("/create", cors(), auth, entryPassword, createRobot);
/*

})(); router.put("/update", updateRobot);
*/
module.exports = router;
