const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error("wrong credentials (╯°□°）╯︵ ┻━┻");
    error.code = 401;
    next(error);
  } else {
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      const error = new Error("wrong credentials (╯°□°）╯︵ ┻━┻");
      error.code = 400;
      next(error);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
        },
        process.env.SECRETE,
        { expiresIn: 24 * 60 * 60 }
      );
      res.json({ token });
    }
  }
};

module.exports = loginUser;
