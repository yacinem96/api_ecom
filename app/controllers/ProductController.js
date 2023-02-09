const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).send("Product not found")
        }
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.addProduct = async (req, res) => {
    try {
        const { title, price, description, category, image } = req.body;
        if (!(title && price && description && category && image)) {
            res.status(400).send("all inputs are required")
        }
        const newProduct = await new Product({ title, price, description, category, image });
        newProduct.save();
        res.status(200).send(newProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.removeProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).send("Product not found")
        }
        await Product.deleteOne({ _id: req.params.id });
        res.status(200).send("Product deleted");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.getProductById = async (req, res) => {
    try {
        const uProduct=await Product.findByIdAndUpdate({ _id: req.params.id },
            req.body,
            { new: true, useFindAndModify: false });
        res.status(200).send(uProduct);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
