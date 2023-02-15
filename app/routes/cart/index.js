const express = require('express');
const CartController = require('../../controllers/CartController');
const router=express.Router();

module.exports=() => {
    // get all
    router.get("/",CartController.getAllCartProducts);
    // get cart by user ID
    router.get("/user/:id",CartController.getCartByUserId);
    // add to cart
    router.post("/",CartController.addProductToCart);
    // update cart
    router.put("/:id",CartController.updateCart); 
    // delete cart
    router.delete("/:id",CartController.deleteCartProduct);

    return router;
}