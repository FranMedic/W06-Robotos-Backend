const chalk = require("chalk");
const debug = require("debug")("robots:token");

const entryPassword = (req, res, next) => {
  const { token } = req.query;
  if (token === process.env.TOKEN) {
    debug(chalk.green("You are welcome we have cookies! ʕ♡˙ᴥ˙♡ʔ "));
    next();
  } else {
    debug(chalk.red("You are in the wrong place Dude "));
    res
      .status(401)
      .json({ error: "You are in the wrong place ma dude ʕ； •`ᴥ•´ʔ " });
  }
};

module.exports = entryPassword;
