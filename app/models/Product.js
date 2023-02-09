const mongoose = require('mongoose');

const productShchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default:"https://via.placeholder.com/300"
    },
    rating: {
        type:Object,
      rate:{
        type: Number,
        default:0
    },
      count:{
        type: Number,
        default:0
    },
    }
});

const Product = mongoose.model("Product", productShchema);

module.exports = Product;