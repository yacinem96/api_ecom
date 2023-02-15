const express = require('express');
const ProductController = require('../../controllers/ProductController');
const upload = require('../../middleware/upload');
const router=express.Router();

module.exports=() => {
    // get All products
    router.get("/",ProductController.getAllProducts);
    // get one product by id
    router.get("/:id",ProductController.getProductById);
    // get Products By Category
    router.get("/category/:category",ProductController.getProductById);
    // add product
    router.post("/",upload.single("img"),ProductController.addProduct);
    // remove product
    router.delete("/:id",ProductController.removeProduct);
    // update product
    router.put("/:id",upload.single("img"),ProductController.updateProductById);

    return router;
}