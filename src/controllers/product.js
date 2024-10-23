const Product = require('../models/product');
const { SUCCESS_MESSAGES, ERROR_MESSAGES,ERROR } = require('../utils/constants');

// Add a new product (Admin only)
exports.addProduct = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: ERROR_MESSAGES.UNAUTHORIZED });
    }
    const { name, image,price, specifications } = req.body;
    try {
        const product = await Product.create({ name, image,price, specifications });
        res.status(201).json({ message: SUCCESS_MESSAGES.PRODUCT_ADDED, product });
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR, error: error.message });
    }
};

// List all products
exports.listProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: ERROR, error: error.message });
    }
};

// Get details of a specific product
exports.getProductDetails = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: ERROR, error: error.message });
    }
};
