const mongoose = require('../../mongo');
const { Schema } = mongoose;

const purchaseSchema = new Schema({
  name: String,
  date: Date,
  category: { type: Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.mongoose.model('Purchase', purchaseSchema); 