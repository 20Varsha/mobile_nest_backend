const Order = require('../models/order');
const { SUCCESS_MESSAGES, ERROR_MESSAGES,ERROR } = require('../utils/constants');

exports.buyProduct = async (req, res) => {
    const { productId, accountDetails } = req.body;
    const userId = req.user._id;     
    try {
        const order = await Order.create({ userId, productId, accountDetails });
                return res.status(201).json({ 
            message: SUCCESS_MESSAGES.ORDER_PLACED, 
            order 
        });
    } catch (error) {
        return res.status(500).json({ 
            message:ERROR, 
            error: error.message 
        });
    }
};

