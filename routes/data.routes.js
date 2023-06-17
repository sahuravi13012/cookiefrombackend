const express = require("express");
const adddataRouter = express.Router();
const { authenticateToken } = require("../middleware/middleware");
const { getData, addData } = require("../controlller/data.controller");

adddataRouter.route("/getdata").get(authenticateToken, getData);
adddataRouter.route("/adddata").post(authenticateToken, addData);

module.exports = { adddataRouter };
