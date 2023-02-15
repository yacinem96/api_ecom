const Cart = require('../models/Cart');


exports.getAllCartProducts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).send(carts);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.getCartByUserId = async (req, res) => {
    try {
        const cart = await Cart.findOne({userId:req.params.id});
        res.status(200).send(cart);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.addProductToCart = async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).send(savedCart);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateCart = async (req, res) => {
    try {
        const cartUpdated = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true, useFindAndModify: false }
        );
        res.status(200).send(cartUpdated);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.deleteCartProduct = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).send("Cart has been deleted");
      } catch (err) {
        res.status(500).send(err.message);
      }
}

