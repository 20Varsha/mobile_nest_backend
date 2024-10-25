const Product = require('../models/product'); 
const Order = require('../models/order'); 
const { SUCCESS_MESSAGES, ERROR_MESSAGES } = require('../utils/constants');

exports.buyProduct = async (req, res) => {
    const { productId, quantity = 1, shippingAddress, paymentMethod, accountDetails } = req.body;
    const userId = req.user._id; 

    try {
        // Fetch product details
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
        }

        // Define or calculate shipping cost and tax amount
        const shippingCost = calculateShippingCost(shippingAddress);
        const taxAmount = calculateTax(product.price);

        // Calculate the total price
        const totalPrice = (product.price * quantity) + shippingCost + taxAmount;

        // Create the order
        const order = await Order.create({ 
            userId, 
            productId, 
            quantity, 
            shippingAddress, 
            paymentMethod, 
            accountDetails, 
            totalPrice,
            taxAmount, 
            shippingCost 
        });

        return res.status(201).json({ 
            message: SUCCESS_MESSAGES.ORDER_PLACED, 
            order 
        });
    } catch (error) {
        return res.status(500).json({ 
            message: ERROR_MESSAGES.ORDER_FAILED, 
            error: error.message 
        });
    }
};

// Example function to calculate shipping cost
const calculateShippingCost = (shippingAddress) => {
    return 10; 
};

// Example function to calculate tax based on product price
const calculateTax = (price) => {
    const taxRate = 0.1; 
    return price * taxRate;
};

exports.getUserOrders = async (req, res) => {
    const userId = req.user._id; 
    try {
        const orders = await Order.find({ userId }).populate('productId'); // Populate product details if needed
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ 
            message: ERROR_MESSAGES.ORDER_FETCH_FAILED, 
            error: error.message 
        });
    }
};

exports.getOrderById = async (req, res) => {
    const { orderId } = req.params; 
    const userId = req.user._id; 
    try {
        const order = await Order.findOne({ _id: orderId, userId }).populate('productId'); 
        if (!order) {
            return res.status(404).json({ message: ERROR_MESSAGES.ORDER_NOT_FOUND });
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ 
            message: ERROR_MESSAGES.ORDER_FETCH_FAILED, 
            error: error.message 
        });
    }
};
