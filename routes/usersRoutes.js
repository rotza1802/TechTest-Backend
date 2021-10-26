const express = require("express");
const usersRoutes = express.Router();
const userController = require("../controllers/userController");

usersRoutes.get("/artists/:name/album", userController.ArtistName);

module.exports = usersRoutes;
