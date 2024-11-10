import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    image: [
      {
        url: { type: String },
        public_id: { type: String },
      },
    ],
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
