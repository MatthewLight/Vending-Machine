const Category = require("../models/Category");

const addCategory = async (item) => {
  try {
    const alreadyExists = await Category.checkIfExistsByName(item.name);
    if (alreadyExists) {
      console.log("Category already exists!");
    } else {
      const itemContainer = await await Category.create(item);
      console.log(`${itemContainer.name} ${itemContainer.price} ${itemContainer.availableAmount}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const addItem = async (item) => {
  try {
    const amount = await Category.find({ name: item.name });
    let price,
      total = 0;
    if (amount.length === 0) {
      console.log('Nothing to update...');
    } else {
      for (let [key, value] of Object.entries(amount)) {
        price = value.price;
        total = value.availableAmount;
      }

      total += parseInt(item.availableAmount);

      await Category.findOneAndUpdate({ name: item.name }, { availableAmount: total });
      console.log(`${item.name} ${price} ${item.availableAmount}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const list = async () => {
  try {
    const list = await Category.find().sort({ availableAmount: -1 });
    if (list.length === 0) {
      console.log('No categories added :(');
    } else {
      for (let i = 0; i < list.length; i++) {
        console.log(`${list[i].name} ${list[i].price} ${list[i].availableAmount}`);
      }
    }
  } catch (error) {
      console.log(error);
  }
};

const clear = async () => {
  try {
    const noItemsAvailable = await Category.find({ availableAmount: 0 });
    if (noItemsAvailable.length === 0) {
      console.log('Nothing to remove...');
    } else {
      for (let i = 0; i < noItemsAvailable.length; i++)
        console.log(noItemsAvailable[i].name + ' ' + noItemsAvailable[i].price);
  
      await Category.deleteMany({ availableAmount: 0 });
    }
  } catch(error) {
    console.log(error);
  }
}

module.exports = {
  addCategory,
  addItem,
  list,
  clear
};
