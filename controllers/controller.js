const mongoose = require('mongoose');
const Snack = require('../models/Snack');
const dotenv = require('dotenv');

dotenv.config();

const credentials = process.env.MONGO_URI;

const db = mongoose.connect(`${credentials}`, { useNewUrlParser: true, useUnifiedTopology: true});

const addSnack = async (item) => {
    const itemContainer = await (await Snack.create(item)).save();
    console.info(`${itemContainer.itemCategory} added`);
}

module.exports = {
    addSnack
};