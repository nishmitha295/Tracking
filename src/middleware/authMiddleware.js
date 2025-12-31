const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log("Auth Header:", authHeader);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  if (!authHeader)
    return res.status(403).json({ message: "Token missing" });

  
  // Expected format: Bearer token
  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token);

  if (!token)
    return res.status(403).json({ message: "Token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("JWT Error:", err.message);
      return res.status(401).json({ message: "Invalid token", error: err.message });
    }

    console.log("Decoded:", decoded);
    req.user = decoded;
    next();
  });
};
