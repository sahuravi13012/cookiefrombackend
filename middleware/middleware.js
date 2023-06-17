const jwt = require("jsonwebtoken");
function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, "ravisahu", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.userId = decoded.userId;
    // req.role = decoded.admin;
    next();
  });
}
module.exports = { authenticateToken };
