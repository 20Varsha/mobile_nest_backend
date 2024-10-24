const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1, required: true },
    shippingAddress: {
        fullName: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phoneNumber: { type: String, required: true }
    },
    paymentMethod: { type: String,default:"bank_transfer" },
    accountDetails: {
        accountNumber: { type: String ,required: true},
        ifsc: { type: String,required: true },
        bankName: { type: String ,required: true}
    },
    totalPrice: { type: Number, required: true },
    taxAmount: { type: Number, required: true }, 
    shippingCost: { type: Number, required: true }, 
    orderStatus: { type: String, default: 'Pending' },
    orderDate: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', orderSchema);
