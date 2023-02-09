const express = require('express');
const userRoutes = require("./users");
const productRoutes = require("./products");
const authRoutes = require("./auth");
const cartRoutes = require("./cart");
const router=express.Router();

module.exports=() => {
    router.use("/users",userRoutes());
    router.use("/products",productRoutes());
    router.use("/auth",authRoutes());
    router.use("/cart",cartRoutes());
    
    return router;
}