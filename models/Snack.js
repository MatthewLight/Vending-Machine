const mongoose = require('mongoose');
const { Schema } = mongoose;

const snackSchema = new Schema({
  itemCategory: String,
  price: Number,
  purchasable: { type: Number, default: 0},
});

module.exports = mongoose.model('Snack', snackSchema);