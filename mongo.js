const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const credentials = process.env.MONGO_URI;

const connection = async () => {
    await mongoose.connect(`${credentials}`, { useNewUrlParser: true, useUnifiedTopology: true});
};

connection().catch(console.error);

module.exports = {
  Schema: mongoose.Schema,
  mongoose,
};