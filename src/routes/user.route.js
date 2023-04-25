import passport from "passport";
import { addCart } from "../controllers/user.controller.js";
import { Router } from "express";
import { roleUserValidation } from "../middlewares/index.js";

const userRoute = Router();

userRoute.put(
  "/addCart/:uid",
  passport.authenticate("current", { session: false }),
  roleUserValidation,
  addCart
);

export default userRoute;
