const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;
  // console.log("hedaers", authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // console.log(token);
    // const token = authHeader.slice(7, authHeader.length);
    // console.log("token", token);

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).json("token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("you are not authenticated");
  }
}
module.exports = verify;
