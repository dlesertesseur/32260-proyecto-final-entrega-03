import jwt from "jsonwebtoken";
import config from "../config/config.js";

function generateAuthToken(user) {
  const token = jwt.sign({id: user.id, email: user.email}, config.SESSION_SECRET, { expiresIn: "1h" });
  return token;
}

export { generateAuthToken };
