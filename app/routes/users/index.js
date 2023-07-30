const express = require('express');
const UserController = require('../../controllers/UserController');
const { checkAdmin, checkLogin } = require('../../middleware/auth');
const router = express.Router();

module.exports = () => {
    // get all
    router.get("/", UserController.getAllUsers);
    // get user by ID
    router.get("/:id", UserController.getUserById);
    // get user by Token
    router.get("/token/:token", UserController.getUserByToken);
    // add to user
    router.post("/",  UserController.addUser);
    // update user
    router.put("/:id",  UserController.updateUser);
    // delete user
    router.delete("/:id",  UserController.removeUser);

    return router;
}