require("dotenv").config()

const productsData = require("./data/products");
const Product = require('./models/Product');

// connecting db
require("./config/db").connect()
const importData = async () => {
    try {
        // await Product.deleteMany({});
        await Product.insertMany(productsData);

        console.log("DATA Import Success");
        process.exit()
    } catch (error) {
        console.log("ERROR with DATA Import");
        process.exit(1)
    }
}

importData()
