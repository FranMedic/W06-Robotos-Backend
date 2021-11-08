const express = require("express");
const loginUser = require("../controller/loginController");
// const bcrypt = require("bcrypt");
// const User = require("../../database/models/user");

const router = express.Router();

/* router.get("/", async () => {
  User.create({
    name: "Franny",
    username: "thegreatfranny",
    password: await bcrypt.hash("zoylamazmejor", 10),
  });
}); */

router.post("/login", loginUser);

module.exports = router;
