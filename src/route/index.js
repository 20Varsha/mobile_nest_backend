const express = require('express');
const router = express.Router();
const authRoutes = require('../route/user');
const productRoutes = require('../route/product');
const orderRoutes = require('../route/order');
const healthCheck = require('../route/health');

// Health check route
router.use('/backend/health-check', healthCheck);

// Authentication routes
router.use('/auth', authRoutes);

// Product routes
router.use('/products', productRoutes);

// Order routes
router.use('/orders', orderRoutes);

module.exports = router;
