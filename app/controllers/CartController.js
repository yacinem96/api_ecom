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
        let cart = await Cart.findOne({ userId: req.params.id });
        if (!cart){
            cart = new Cart({ userId:req.params.id, products:[] })
        }
        res.status(200).send(cart);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.addProductToCart = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [{ productId, quantity: 1 }] });
        } else {
            const existingProductIndex = cart.products.findIndex(
                (product) => product.productId.toString() === productId.toString()
            );

            if (existingProductIndex === -1) {
                cart.products.push({ productId, quantity: 1 });
            } else {
                cart.products[existingProductIndex].quantity += 1;
            }
        }

        const updatedCart = await cart.save();
        return res.status(200).send(updatedCart);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


exports.updateCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(400).send("Cart not found")
        }
        const existingProductIndex = cart.products.findIndex(
            (product) => product.productId.toString() === productId.toString()
        );
        if (existingProductIndex === -1) {
            return res.status(401).send("Product not found")
        }
        if (parseInt(quantity) === 0) {
            cart.products = cart.products.filter(
                (product) => product.productId.toString() !== productId.toString()
            );
            
        } else {
            cart.products[existingProductIndex].quantity = quantity
        }
        const updatedCart = await cart.save();
        return res.status(200).send(updatedCart);

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

exports.deleteAll = async (req, res) => {
    try {
        await Cart.deleteMany({});
        res.status(200).send("delete all drom cart");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

