import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { postApiLogin, postApiSignup } from "./controllers/user.js";
import { deleteApiProduct, getApiProduct, getApiProductById, getApiProductsBySearch, postApiProduct, putApiProduct } from "./controllers/product.js";
import { getApiOrderById, getApiOrders, getApiOrderUserById, patchApiOrderStatus, postApiOrder } from "./controllers/order.js";
dotenv.config();

const app = express();
app.use(express.json());

const MONGODB_URI = "";
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
        console.log('MONGODB connected');
    }
}

// POST signup
app.post('/api/signup', postApiSignup);

// Post login
app.post('/api/login', postApiLogin);

// Post product
app.post('/api/product', postApiProduct );

// const products = [];
//   Get products
app.get('/api/products', getApiProduct);

// Get product by id
app.get('/api/product/:id', getApiProductById);

// GET /products/search?q=Sam
app.get("/api/products/search", getApiProductsBySearch );

// Delete product by id
app.delete('/api/product/:id', deleteApiProduct);

// Put product
app.put('/api/product/:id', putApiProduct);

// Post/order
app.post('/order', postApiOrder);

// GET/orders
app.get('/orders', getApiOrders);

// GET/order/:id
app.get('/order/:id', getApiOrderById);

// GET/orders/user/:id
app.get('/orders/user/:id', getApiOrderUserById);
  
// PATCH/order/status/:id
app.patch('/order/status/:id', patchApiOrderStatus);
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
    connectDB();
});
