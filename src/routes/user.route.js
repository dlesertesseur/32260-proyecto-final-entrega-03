import passport from "passport";
import { addCart, changeRole } from "../controllers/user.controller.js";
import { Router } from "express";
import { roleUserValidation } from "../middlewares/index.js";

const userRoute = Router();

userRoute.put(
  "/addCart/:uid",
  passport.authenticate("current", { session: false }),
  roleUserValidation,
  addCart
);

userRoute.put(
  "/premium/:uid",
  passport.authenticate("current", { session: false }),
  changeRole
);


export default userRoute;
