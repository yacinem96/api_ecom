const mongoose = require('mongoose');

const cartShchema = new mongoose.Schema({

  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  products: [{
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product"
    },
    quantity: {
      type: Number,
      default: 1
    }
  }],

});

const Cart = mongoose.model("Cart", cartShchema);

module.exports = Cart;