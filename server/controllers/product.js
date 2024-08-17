import Product from "../models/Product.js";
import { responder} from "./../util.js";

const postApiProduct = async (req, res) => {
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
        return responder({ 
            res,
            success: true,
            data: saveProduct,
            message: "Successfully added new product"
        })
    }
    catch (e) {
        return responder({
            res,
            success: false,
            message: err.message
        })
    }
}

const getApiProduct =  async (req, res) => {
    const products = await Product.find();

    return responder({
        res,
        success: true,
        data: products,
        message: "Successfully featched all products."
    })
}

const getApiProductById =  async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);
    return responder({
        res,
        success: true,
        data: product,
        message: "Get details of products."
    })
}

const getApiProductsBySearch = async (req, res) => {
    const { q } = req.query;

    const products = await Product.find({ name: { $regex: q, $options: "i" } });

    return responder({
        res,
        success:true,
        data: products,
        message: "Products fetched successfully"
    });
}

const deleteApiProduct =  async (req, res) => {
    const { id } = req.params;
    await Product.deleteOne({ _id: id });

    return responder({
        res,
        success: true,    
        message: `Successfully deleted product with id ${id}`,
    })
}

const putApiProduct = async (req, res) => {
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
    return responder({
        res,
        success: true,
        data: updatedProduct,
        message: "Product updated successfully."
    })
}

export {postApiProduct, getApiProduct, getApiProductById, getApiProductsBySearch, deleteApiProduct, putApiProduct}