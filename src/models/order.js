const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    accountDetails: {
        accountNumber: { type: String, required: true },
        ifsc: { type: String, required: true },
        bankName: { type: String, required: true },
    },
});

module.exports = mongoose.model('Order', orderSchema);
