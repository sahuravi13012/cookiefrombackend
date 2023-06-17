const express = require("express");
const userRouter = express.Router();

const { signup, login, logOut } = require("../controlller/user.controller");

userRouter.route("/registeruser").post(signup);
userRouter.route("/loginuser").post(login);
// userRouter.route("/logout").get(logOut);

module.exports = { userRouter };
