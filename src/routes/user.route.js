import passport from "passport";
import {
  addCart,
  changeRole,
  uploadDocuments,
  uploadDocumentsPage,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { upload } from "../config/multer.js";
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

userRoute.post(
  "/:uid/documents",
  passport.authenticate("current", { session: false }),
  upload.fields([
    {
      name: "document",
    },
    {
      name: "profile",
      maxCount: 1,
    },
    {
      name: "product",
    },
  ]),
  uploadDocuments
);

userRoute.get(
  "/documents",
  passport.authenticate("current", { session: false }),
  uploadDocumentsPage
);

export default userRoute;
