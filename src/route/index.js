const express = require('express');
const router = express.Router()
const productRoutes = require('../route/product');
const orderRoutes = require('../route/order');

router.use('/backend/health-check', health)
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

module.exports=router

