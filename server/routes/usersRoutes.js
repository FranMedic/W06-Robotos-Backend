const express = require("express");
const { validate } = require("express-validation");

const loginUser = require("../controller/loginController");
const loginSchema = require("../schemas/loginSchema");
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

router.post("/login", validate(loginSchema), loginUser);

module.exports = router;
