const express = require('express');
const UserController = require('../../controllers/UserController');
const router=express.Router();

module.exports=() => {
        // get all
        router.get("/",UserController.getAllUsers);
        // get user by ID
        router.get("/:id",UserController.getUserById);
        // add to user
        router.post("/",UserController.addUser);
        // update user
        router.put("/:id",UserController.updateUser); 
        // delete user
        router.delete("/:id",UserController.removeUser);
    
    return router;
}