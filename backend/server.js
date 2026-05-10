require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

/* ================= MONGODB ================= */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

/* ================= MODELS ================= */

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  sizes: [String],
  colors: [String],
  instagramLink: String
});

const orderSchema = new mongoose.Schema({
  items: Array,
  name: String,
  phone: String,
  address: String
});

const Product = mongoose.model("Product", productSchema);
const Order = mongoose.model("Order", orderSchema);

/* ================= PRODUCTS ================= */

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  try {

    const { name, price, description, sizes, colors, instagramLink } = req.body;

    const product = new Product({
      name,
      price,
      description,
      sizes,
      colors,
      instagramLink
    });

    await product.save();

    res.json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

/* ================= ORDERS ================= */

app.post("/orders", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json({ message: "Order Saved" });
});

app.get("/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.get("/orders/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
});

/* 🔥 DELETE ORDERS */
app.delete("/orders/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order Deleted" });
});

/* ================= START ================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});