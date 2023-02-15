const jwt = require("jsonwebtoken");
const User = require('../models/User');

const checkLogin = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("a token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
  return next();
};

const checkAdmin = (req, res, next) => {
  const token =
  req.body.token || req.query.token || req.headers["x-access-token"];
if (!token) {
  return res.status(403).send("a token is required for authentication");
}
try {
  const user= User.findOne({token:token});
  if (user.role==="user") {
    return res.status(402).send("permission denied");
  } else if (user.role==="admin") res.status(222).send("***admin***");
} catch (err) {
  return res.status(401).send("Invalid token");
}
  return next();
}

module.exports = { checkLogin , checkAdmin};
