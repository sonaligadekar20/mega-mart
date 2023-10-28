import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from "./models/Product.js";
import Order from "./models/Order.js";
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

// const products = [];
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

// Get product by id
app.get('/product/:id', async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    res.json({
        success: true,
        data: product,
        message: "Get details of products."
    })
});

// Delete product by id
app.delete('/product/:id', async (req, res) => {
    const { id } = req.params;
    await Product.deleteOne({ _id: id });

    res.json({
        success: true,    
        message: `Successfully deleted product with id ${id}`,
    })
});

// Put product
app.put('/product/:id', async (req, res) => {
    const { id } = req.params;

    const { name, description, price, image, category, brand } = req.body;

    await Product.updateOne({ _id: id },
        {
            $set: {
                name: name,
                description: description,
                price: price,
                image: image,
                category: category,
                brand: brand
            }
        });

    const updatedProduct = await Product.findById(id);
    res.json({
        success: true,
        data: updatedProduct,
        message: "Product updated successfully."
    })
});

// GET /products/search?q=Sam
app.get("/products/search", async (req, res) => {
    const { q } = req.query;

    const products = await Product.find({ name: { $regex: q, $options: "i" } });

    res.json({
        success:true,
        data: products,
        message: "Products fetched successfully"
    });
});

// Post/order
app.post('/order', async(req, res)=>{
    const {user, product, quantity, shippingAddress, delivaryCharges} = req.body;

    const order = new Order({
        user:user,
        product:product,
        quantity: quantity,
        shippingAddress: shippingAddress,
        delivaryCharges:delivaryCharges    
    });

    try{
        const savedOrder = await order.save();
        res.json({
            success:true,
            data:savedOrder,
            message: " Ordered created successfully "
        })
    }
    catch(e){
        res.json({
            success: false,
            message: e.message
        })
    }
})

// GET/order/:id
app.get('/order/:id', async(req, res)=>{
    const {id } = req.params;

    const order = await Order.findById(id).populate("user product");
    order.user.password= undefined;

    res.json({
        success:true,
        data: order,
        message: "Order featched successfully"
    }) 
});

// GET/orders
app.get('/orders', async(req, res)=>{
    const orders = await Order.find();

    res.json({
        success: true,
        data:orders,
        message: "Orders featched successfully"
    })
});

// GET/orders/user/:id
app.get('/orders/user/:id', async(req, res)=>{
    const {id} = req.params;
     
    const orders = await Order.find({user:id}).populate("user product");
  
    res.json({
        success: true,
        data:orders,
        message: "Orders featched successfully" 
    })
  });
  
  // PATCH/order/status/:id
  app.patch('/order/status/:id', async(req, res)=>{
    const {id} = req.params;
  
    const {status} = req.body;
    
    await Order.updateOne ({_id: id},
        {$set: {status:status}});
  
    const updatedProduct = await Order.findOne({_id: id})
  
    res.json({
        success: true,
        data: updatedProduct,
        message: "Order status updated successfully." 
    });
  });
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
    connectDB();
});



