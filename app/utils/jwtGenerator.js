const jwt = require("jsonwebtoken");
const config = require("../utils/auth.config");

jwtGenerator = (user_id) => {
  const payload = {
    user: user_id,
  };
  return jwt.sign(payload, config.secret, { expiresIn: "12hr" });
};

module.exports = jwtGenerator;
