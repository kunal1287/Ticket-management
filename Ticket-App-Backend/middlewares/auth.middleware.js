import jwt from "jsonwebtoken";

export const AuthMiddleware = async (req, res, next) => {
  try {
    const authProvider = req.headers.authorization;
    if (!authProvider) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authProvider.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
