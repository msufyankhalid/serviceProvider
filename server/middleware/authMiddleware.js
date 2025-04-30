const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Extract kiya token from the Authorization header
  const token = req.header("Authorization");

  // Check token exists krta ha yh ni
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  // If token exists remove Bearer and get only the token part
  const tokenWithoutBearer = token.split(" ")[1];

  try {
    // token ko verify kiya..
    const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded information to the request object
    next(); // Proceed to the next middleware or route handler..
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = authMiddleware;
