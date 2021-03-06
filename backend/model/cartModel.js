const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "User",
  },
  items: { 
    type: Array, 
    ref: "CartItem",
  },

});

module.exports = mongoose.model("Cart", cartSchema);
