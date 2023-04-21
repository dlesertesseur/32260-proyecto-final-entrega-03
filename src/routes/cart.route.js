import passport from "passport";
import {
  getAll,
  findById,
  insert,
  update,
  remove,
  addProduct,
  removeProduct,
  updateProduct,
  getCartsList,
} from "../controllers/cart.controller.js";
import { Router } from "express";

const cartRoute = Router();

cartRoute.get("/", passport.authenticate("current", { session: false }), getAll);
cartRoute.get("/list", passport.authenticate("current", { session: false }), getCartsList);
cartRoute.get("/:cid", passport.authenticate("current", { session: false }), findById);

cartRoute.post("/", passport.authenticate("current", { session: false }), insert);
cartRoute.post("/:cid/products/:pid", passport.authenticate("current", { session: false }), addProduct);

cartRoute.put("/:cid/", passport.authenticate("current", { session: false }), update);
cartRoute.put("/:cid/products/:pid", passport.authenticate("current", { session: false }), updateProduct);

cartRoute.delete("/:cid", passport.authenticate("current", { session: false }), remove);
cartRoute.delete("/:cid/products/:pid", passport.authenticate("current", { session: false }), removeProduct);

export default cartRoute;
