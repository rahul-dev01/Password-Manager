const express = require("express");
const authRoutes = require("./authRoutes");
const passwordRoutes = require("./passwordRoutes");

const v1Router = express.Router();

v1Router.use("/auth", authRoutes);
v1Router.use("/password", passwordRoutes); 

module.exports = v1Router;
