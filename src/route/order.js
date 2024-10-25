const express = require('express');
const { buyProduct,getUserOrders,getOrderById } = require('../controllers/order');
const { auth } = require('../middleware/authorization'); 
const router = express.Router();

router.post('/place-order', auth, buyProduct);
router.get('/', auth, getUserOrders); 
router.get('/:orderId',auth, getOrderById); 
module.exports = router;
