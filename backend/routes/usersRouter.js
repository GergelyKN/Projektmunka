const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.post("/registration", usersController.postNewUser);
usersRouter.post("/login", usersController.postLogin);

module.exports = usersRouter;