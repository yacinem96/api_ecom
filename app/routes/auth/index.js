const express = require('express');
const AuthController = require('../../controllers/AuthController');
const { checkLogin } = require('../../middleware/auth');
const router = express.Router();

module.exports = () => {
    // regisrer
    router.post("/register", AuthController.register);
    // login
    router.post("/login", AuthController.login);
    // acces to profil
    router.get("/user/profile",checkLogin,AuthController.account);
    return router;
}