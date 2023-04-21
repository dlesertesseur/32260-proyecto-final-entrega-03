import { authenticate, registerUser } from "../services/auth.service.js";
import { createHash } from "../util/Crypt.js";
import { getRoleByUser } from "../util/RoleValidator.js";
import { generateAuthToken } from "../util/jwt.js";

const login = async (req, res) => {
  try {
    const user = await authenticate(req.body);
    req.session.email = user.email;
    req.session.first_name = user.first_name;
    req.session.last_name = user.last_name;
    req.session.age = user.age;

    /*Validacion de rol*/
    req.session.role = getRoleByUser(req.body);

    res.redirect("../../api/products/list");
  } catch (error) {
    res.render("login-error", { error });
  }
};

const loginPassport = async (req, res) => {
  try {
    const user = req.user;

    const accessToken = generateAuthToken({
      id: user._id,
      email: user.email,
      last_name: user.last_name,
      first_name: user.first_name,
      cid : user.cart?._id
    });

    res
      .cookie("authToken", accessToken, { httpOnly: true })
      .redirect("../../api/products/list");
  } catch (error) {
    console.log("loginPassport -> ", error);
    throw error;
  }
};

const register = async (req, res) => {
  try {
    const newUser = { ...req.body };

    /*VALIDA EL SUPER USUARIO*/
    newUser.role = getRoleByUser(newUser);
    newUser.password = createHash(newUser.password);

    await registerUser(newUser);
    res.redirect("/api/auth/login");
  } catch (error) {
    res.render("register-error", { error });
  }
};

const registerPassport = async (req, res) => {
  try {
    res.redirect("/api/auth/login");
  } catch (error) {
    res.render("register-error", { error });
  }
};

const loginPage = async (req, res) => {
  try {
    res.render("login", {
      title: "Login",
      style: "index.css",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const registerPage = async (req, res) => {
  try {
    res.render("register", {
      title: "Register",
      style: "index.css",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const logout = (req, res) => {
  // req.session.destroy((error) => {
  //   res.redirect("/api/auth/login");
  // });
  res.clearCookie("authToken");
  res.redirect("/api/auth/login");
};

export {
  register,
  login,
  registerPage,
  loginPage,
  logout,
  loginPassport,
  registerPassport,
};
