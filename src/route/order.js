const express = require('express');
const { buyProduct } = require('../controllers/order');
const { auth } = require('../middleware/authorization'); 
const router = express.Router();

router.post('/place-order', auth, buyProduct);

module.exports = router;
