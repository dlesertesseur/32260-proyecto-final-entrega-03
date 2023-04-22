import {
  loginPage,
  loginPassport,
  logout,
  registerPassport,
  registerPage,
} from "../controllers/auth.controller.js";
import { Router } from "express";
import passport from "passport";

const authRoute = Router();

authRoute.get("/login", loginPage);
authRoute.get("/register", registerPage);
authRoute.get("/logout", logout);

authRoute.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "registerError" }),
  registerPassport
);

authRoute.get("/registerError", (req, res) => {
  const err = { message: req.flash("registerMessage") };
  res.render("register-error", { err });
});

authRoute.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "loginError",
    session: false,
  }),
  loginPassport
);

authRoute.get("/loginError", (req, res) => {
  const err = { message: req.flash("loginMessage") };
  res.render("login-error", { err });
});
export default authRoute;
