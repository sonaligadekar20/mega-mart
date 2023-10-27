import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from "./models/Product.js";
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

app.post("/signup", async (req, res) => {
    const { name, email, password, mobile, address, gender } = req.body;

    const user = new User({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        address: address,
        gender: gender
    });

    try {
        const savedUser = await user.save();

        res.json({
            success: true,
            data: savedUser,
            message: "Signup Successful"
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
});

// Post login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Please provide email and password"
        })
    }

    const user = await User.findOne({
        email: email,
        password: password
    }).select("name email mobile")

    if (user) {
        return res.json({
            success: true,
            data: user,
            message: "Login successful"
        });
    } else {
        return res.json({
            success: false,
            message: "Invalid credentials"
        })
    }
});

//   Get products

const products = [];
app.get('/products', async (req, res) => {
    const products = await Product.find();

    res.json({
        success: true,
        data: products,
        message: "Successfully featched all products."
    })
});

// Post product
app.post('/product', async (req, res) => {
    const { name, description, price, image, category, brand } = req.body;

    const product = new Product({
        name: name,
        description: description,
        price: price,
        image: image,
        category: category,
        brand: brand
    });
    try {
        const saveProduct = await product.save();
        res.json({
            success: true,
            data: saveProduct,
            message: "Successfully added new product"
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
  });

// Get product 
app.get('/product/:id', async (req, res)=>{
    const {id }= req.params;

    const product = await Product.findById(id);
    res.json({
        success: true,
        data: product,
        message: "Get details of products."
    })
});

// Delete product
app.delete('/product/:id', async (req, res) => {
    const {id } = req.params;
    await Product.deleteOne({ id: id });

    res.json({
        success: true,
        data: {},
        message: `Successfully deleted product with id ${id}`,
    })
});

// Put product
app.put('/product/:id', async (req, res)=>{
    const {id} = req.params;

    const {name, description, price, image, category, brand} = req.body;

    const product = await Product.updateOne(
        {id: id},
        {
            $set: {
                name: name,
                description: description,
                price: price,
                image: image,
                category: category,
                brand: brand
            }
        }
    );

    const updatedProduct = await Product.findById(id);
    res.json({
        success: true,
        data: updatedProduct,
        message: "Product updated successfully."
    })   
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
    connectDB();
});