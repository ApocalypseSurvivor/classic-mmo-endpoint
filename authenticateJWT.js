import jwt from "jsonwebtoken";
//import { AuthenticationError } from "apollo-server-errors";

// Secret key for JWT
const SECRET_KEY = "your_secret_key";

const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"];
  //console.log("authenticateJWT: ", token);

  if (!token) {
    req.user = null;
  } else {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        req.user = null; // Set user to null if verification fails
      } else {
        req.user = decoded; // Set decoded user on the request
      }
    });
  }
  next(); // Ensure next middleware is called
};

export default authenticateJWT;
