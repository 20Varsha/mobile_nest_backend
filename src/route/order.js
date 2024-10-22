const express = require('express');
const { buyProduct } = require('../controllers/order');
const { auth } = require('../middleware/authorization'); 
const router = express.Router();

router.post('/buy', auth, buyProduct);

module.exports = router;
