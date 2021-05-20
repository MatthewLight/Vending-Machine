const mongoose = require('mongoose');
const { Schema } = mongoose;

const purchaseSchema = new Schema({
  name: String,
  date: String
});

module.exports = mongoose.model('Purchase', purchaseSchema);