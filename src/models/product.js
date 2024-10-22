const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  specifications: [
      {
          key: { type: String, required: true },
          value: { type: String, required: true }
      }
  ], 
});

module.exports = mongoose.model('Product', productSchema);
