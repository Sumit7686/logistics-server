const jwt = require("jsonwebtoken");
const config = require("../utils/auth.config");
module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.json({ message: "Not Authorize." });
    }
    const payload = jwt.verify(jwtToken, config.secret);
    req.user = payload.user;
  } catch (err) {
    return res.json(err.message);
  }

  next();
};
