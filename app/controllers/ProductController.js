const Product = require('../models/Product');
const { deleteImage } = require('../helpers');

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
            return res.status(404).send("Product not found")
        }
        res.status(200).send(product);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).send(products);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.addProduct = async (req, res) => {
    const { title, price, description, category } = req.body;
    if (!(title && price && description && category)) {
        return res.status(400).send("all inputs are required")
    }
    try {
        if (req.file) {
            const url = req.protocol + "://" + req.get("host");
            const newProduct = await Product.create(
                {
                    title,
                    price,
                    description,
                    category,
                    image: url + "/uploads/" + req.file.filename,
                }
            );
            res.status(200).send(newProduct);
        } else {
            const newProduct = new Product({ title, price, description, category });
            const savedProduct = await newProduct.save();
            res.status(200).send(savedProduct);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.removeProduct = async (req, res) => {
    try {
        // find product if exist
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found")
        }
        // delete img from local dir
        if (product.image !== "https://via.placeholder.com/300") {
            let imgName = product.image.split("/")[4];
            deleteImage(imgName);
        }
        await Product.deleteOne({ _id: req.params.id });
        res.status(200).send("Product deleted");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

exports.updateProductById = async (req, res) => {
    try {
        if (req.file) {
            // find and delete img from local dir
            Product.findOne({ _id: req.params.id }).then((data) => {
                let imgName = data.image.split("/")[4];
                deleteImage(imgName);
            });
            const url = req.protocol + "://" + req.get("host");
            // update product
            const updatedProduct = await Product.findOneAndUpdate(
                { _id: req.params.id },
                {
                    title: req.body.title,
                    price: req.body.price,
                    description: req.body.description,
                    category: req.body.category,
                    image: url + "/uploads/" + req.file.filename,
                },
                { new: true, useFindAndModify: false }
            );
            if (!updatedProduct) {
                return res.status(404).send("Product not foud");
            }
            res.status(200).json({ msg: "Product updated", data: updatedProduct });
        } else {
            const uProduct = await Product.findByIdAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true, useFindAndModify: false });
            if (!uProduct) {
                return res.status(404).send("Product not foud");
            }
            res.status(200).json({ msg: "Product updated", data: uProduct });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}
