const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: [true, "Please enter the name of product"] },
  desc: {
    type: String,
    required: [true, "Enter description of your product"],
  },
  price: { type: Number, required: [true, "Enter the price"] },
  ratings: { type: Number, default: 0 },
  images: [
    {
      public_id: { type: String, required: true },
      url: { required: true, type: String },
    },
  ],
  category: { type: String, required: [true, "Enter product category"] },
  stock: {
    type: Number,
    required: [true, "Enter current number of stocks"],
    default: 1,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  numOfReviews: { type: Number, default: 0 },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
