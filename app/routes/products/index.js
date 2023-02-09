const express = require('express');
const ProductController = require('../../controllers/ProductController');
const router=express.Router();

module.exports=() => {
    // get All products
    router.get("/",ProductController.getAllProducts());
    // get one product by id
    router.get("/:id",ProductController.getProductById());
    
    return router;
}