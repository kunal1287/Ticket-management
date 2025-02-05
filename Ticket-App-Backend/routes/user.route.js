import express from "express";
import { LoginUser, logout, RegisterUser } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(RegisterUser);
router.route("/login").post(LoginUser);
router.route("/logout").post(logout);

export default router;
