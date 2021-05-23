const mongoose = require('../../mongo');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
  price: Number,
  availableAmount: { type: Number, default: 0},
});

categorySchema.statics.checkIfExistsByName = function(name) {
  return this.exists({ name });
};

module.exports = mongoose.mongoose.model('Category', categorySchema);