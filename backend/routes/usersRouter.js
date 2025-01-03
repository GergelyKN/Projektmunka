const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.post("/registration", usersController.postNewUser);
usersRouter.post("/login", usersController.postLogin);
usersRouter.put("/updateuser", usersController.updateUser);
usersRouter.put("/resetpassword", usersController.resetPassword);
usersRouter.delete("/deleteuser", usersController.deleteUser);
usersRouter.get("/getusers", usersController.getUsers);

module.exports = usersRouter;
