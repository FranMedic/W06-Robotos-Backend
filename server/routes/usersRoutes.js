const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../database/models/user");

const router = express.Router();
router.get("/", async () => {
  User.create({
    name: "Franny",
    username: "thegreatfranny",
    password: await bcrypt.hash("zoylamazmejor", 10),
  });
});

module.exports = router;
