const mongoose = require('mongoose');
const Category = require('../models/Category');
const Purchase = require('../models/Purchase');

mongoose.set('useFindAndModify', false);

const addCategory = async (item) => {
  const itemContainer = await (await Category.create(item)).save();
  console.info(`${itemContainer.name} added`);
}

const addItem = async (item) => {
  const amount = await Category.find({ name: item.name });
  const total = amount[0].availableAmount + parseInt(item.availableAmount);

  await Category.findOneAndUpdate({ name: item.name }, { availableAmount: total });
  console.info('updated!');
}

const purchase = async (item) => {
  const amount = await Category.find({ name: item.name });
  const total = amount[0].availableAmount - 1;
  
  const itemContainer = await (await Purchase.create(item)).save();
  await Category.findOneAndUpdate({ name: item.name }, { availableAmount: total });
  console.info(`${itemContainer.name} added`);
}

const list = async () => {
  const list = await Category.find()
  console.log(list[0].name + ' ' + list[0].price + ' ' + list[0].availableAmount);
}

module.exports = {
  addCategory,
  addItem,
  purchase,
  list
};