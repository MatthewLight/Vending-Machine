const mongoose = require('mongoose');
const { Schema } = mongoose;

const earningsSchema = new Schema({
  itemCategory: String,
  earnings: Number,
  purchaseDate: Date
});

module.exports = mongoose.model('Snack', earningsSchema);