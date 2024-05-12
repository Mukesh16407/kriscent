const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.jwt_secret, {
    expiresIn: "1h",
  });
}

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Token not provided" });

  jwt.verify(token, process.env.jwt_secret, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
}

async function protectRoute(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    if (user.role !== "Admin" && user.role !== "Author") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { generateToken, verifyToken, protectRoute };
