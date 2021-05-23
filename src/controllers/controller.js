const moment = require('moment');
const categoryService = require('../services/CategoryService');
const purchaseService = require('../services/PurchaseService');

const addCategory = async (item) => {
  await categoryService.addCategory(item);
}

const addItem = async (item) => {
  await categoryService.addItem(item);
}

const purchase = async (item) => {
  await purchaseService.purchase(item);
}

const list = async () => {
  await categoryService.list();
}

const clear = async () => {
  await categoryService.clear();
}

const getPurchases = async (options) => {
  await purchaseService.getPurchases(options);
}

const report = async (item) => {
  const monthPattern = /\d{4}\-\d{2}/;
  const sinceDatePattern = /\d{4}\-\d{2}\-\d{2}/
  try {
    if (item.date.match(sinceDatePattern)) {
      const date = moment(item.date);

      const options = { date: { $gt: date.toDate() }};
      await getPurchases(options);
    } else if (item.date.match(monthPattern)) {
      const date = moment(item.date);
      const endOfMonth = date.clone().endOf('month');

      const options = { date: { $gt: date.toDate() }, date: { $lt: endOfMonth.toDate() }};
      await getPurchases(options);
    } else {
      console.log('Incorrect date format. Try yyyy-MM-dd or yyyy-MM');
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addCategory,
  addItem,
  purchase,
  list,
  clear,
  report
};