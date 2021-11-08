const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error = new Error("wrong authorization  (╯°□°）╯︵ ┻━┻");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ");
    if (!token) {
      const error = new Error("wrong authorization (╯°□°）╯︵ ┻━┻");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = jwt.verify(token, process.env.SECRETE);
        req.userId = user.id;
        next();
      } catch (error) {
        error.message("wrong authorization  (╯°□°）╯︵ ┻━┻");
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = auth;
