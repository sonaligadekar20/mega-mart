import Order from "../models/Order.js";
import { responder } from "../util.js";

const postApiOrder = async(req, res)=>{
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
        return responder({
            res,
            success:true,
            data:savedOrder,
            message: " Ordered created successfully "
        })
    }
    catch(e){
        return responder({
            res,
            success: false,
            message: e.message
        })
    }
}
const getApiOrders = async(req, res)=>{
    const orders = await Order.find();

    return responder({
        res,
        success: true,
        data:orders,
        message: "Orders featched successfully"
    })
}

const getApiOrderById = async(req, res)=>{
    const {id } = req.params;

    const order = await Order.findById(id).populate("user product");
    order.user.password= undefined;

    return responder({
        res,
        success:true,
        data: order,
        message: "Order featched successfully"
    }) 
}

const getApiOrderUserById = async(req, res)=>{
    const {id} = req.params;
     
    const orders = await Order.find({user:id}).populate("user product");
  
    return responder({
        res,
        success: true,
        data:orders,
        message: "Orders featched successfully" 
    })
  }

  const patchApiOrderStatus = async(req, res)=>{
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
        return responder({
            res,
            success: false,
            message: `${status} cannot be set once order is ${currentStatus}` });
    }
    
    await Order.updateOne ({_id: id},
        {$set: {status:status}});
  
    const updatedProduct = await Order.findOne({_id: id});

    return responder({
        res,
        success: true,
        data: updatedProduct,
        message: "Order status updated successfully." 
    });
  }

  export { postApiOrder, getApiOrders, getApiOrderById, getApiOrderUserById, patchApiOrderStatus}