import passport from "passport";
import { addCart } from "../controllers/user.controller.js";
import { Router } from "express";

const userRoute = Router();

userRoute.put(
  "/addCart/:uid",
  passport.authenticate("current", { session: false }),
  addCart
);

export default userRoute;
