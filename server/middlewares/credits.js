const User = require("../model/User");

const credits = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    if (user.credits < 1) throw new Error();
    next();
  } catch (e) {
    res.status(401).send("Not enough credits, sorry");
  }
};

module.exports = credits;
