import jwt from "jsonwebtoken";

// Secret key for JWT
const SECRET_KEY = "your_secret_key";

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    req.user = null;
  } else {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ message: "Failed to authenticate token" });
      }

      req.user = decoded;
    });
  }
  next();
};

export default authenticateJWT;
