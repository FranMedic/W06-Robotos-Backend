const express = require("express");
const cors = require("cors");
const {
  getRobots,
  getRobotById,
  deleteRobotById,
  createRobot,
} = require("../controller/robotsControllers");

// const entryPassword = require("../middleware/robotToken");

const router = express.Router();

const auth = require("../middleware/auth");

router.get("/", auth, getRobots);

router.get("/:idRobot", auth, getRobotById);

router.delete("/delete/:idRobot", auth, deleteRobotById);

router.post("/create", cors(), auth, createRobot);
/*

})(); router.put("/update", updateRobot);
*/
module.exports = router;
