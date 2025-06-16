import jwt from "jsonwebtoken";
import User from "../models/user/User.js";

// Middleware to protect routes and check user roles
// This middleware checks if the user is authenticated and has the required role to access the route
export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Middleware to authorize roles
// This middleware checks if the user has the required role to access the route
// It takes a list of roles (user, admin) as arguments and checks if the user's role is included in that list
// If the user's role is not included, it returns a 403 Forbidden response
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You don't have permission to access this resource" });
    }
    next();
  };
};
