import jwt from "jsonwebtoken";

const adminAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      status: 401,
      message: "No token provided",
      data: null
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "Access denied: Admins only",
        data: null
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      status: 401,
      message: "Invalid token",
      data: null
    });
  }
};

export default adminAuthMiddleware;
