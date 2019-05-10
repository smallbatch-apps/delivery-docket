let jwt = require('jsonwebtoken');

module.exports.checkToken = async (req, res, next) => {
  let auth = false;
  let message = "Token is not valid";
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({auth, message: "No token provided"});
    return;
  }

  const [, authToken] = token.split(" ");

  const verify = await jwt.verify(authToken, process.env.JWT_SECRET);

  if (verify) {
    req.user = verify;
    next();
    return;
  }

  res.status(401).json({auth, message});
}