const express = require('express');
const CartController = require('../../controllers/CartController');
const { checkAdmin, checkLogin } = require('../../middleware/auth');
const router = express.Router();

module.exports = () => {
    // get all
    router.get("/", CartController.getAllCartProducts);
    // get cart by user ID
    router.get("/user/:id", CartController.getCartByUserId);
    // add to cart
    router.post("/", CartController.addProductToCart);
    // update cart
    router.put("/", CartController.updateCart);
    // delete cart
    router.delete("/:id", CartController.deleteCartProduct);
    // delete all cart
    router.delete("/", CartController.deleteAll);

    return router;
}