const express = require('express');
const { addProduct, listProducts, getProductDetails } = require('../controllers/product');
const { auth } = require('../middleware/authorization'); 
const router = express.Router();

router.post('/add', auth, addProduct);
router.get('/',auth, listProducts);
router.get('/:id',auth, getProductDetails);

module.exports = router;
