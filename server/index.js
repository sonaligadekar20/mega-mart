import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import Order from "./models/Order.js";
import { postApiLogin, postApiSignup } from "./controllers/user.js";
import { deleteApiProduct, getApiProduct, getApiProductById, getApiProductsBySearch, postApiProduct, putApiProduct } from "./controllers/product.js";
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

    const STATUS_PRIORITY_MAP = {
        pending: 0,
        shipped: 1,
        delivered: 2,
        returned: 3,
        cancelled: 4,
        rejected: 5
    }
    
    const order = await Order.findById(id);
    const currentStatus = order.status;

    const currentPriority = STATUS_PRIORITY_MAP [currentStatus];
    const newPriority = STATUS_PRIORITY_MAP [status];

    if(currentPriority > newPriority){
        return res.json({
            success: false,
            message: `${status} cannot be set once order is ${currentStatus}` });
    }
    
    await Order.updateOne ({_id: id},
        {$set: {status:status}});
  
    const updatedProduct = await Order.findOne({_id: id});

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
