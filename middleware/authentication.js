require("dotenv").config();
const jwt = require("jsonwebtoken");
const CustomError = require("../errors/CustomError");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomError("Unauthenticated", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.userId, email: decoded.email };
    next();
  } catch (error) {
    throw new CustomError("Unauthenticated", 401);
  }
};

module.exports = auth;
