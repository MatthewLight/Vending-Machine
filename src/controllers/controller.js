const Category = require('../models/Category');
const Purchase = require('../models/Purchase');

const addCategory = async (item) => {
  try {
    const alreadyExists = await Category.checkIfExistsByName(item.name);
    if (alreadyExists) {
      console.log('Category already exists!');
    } else {
      const itemContainer = await (await Category.create(item));
      console.log(`${itemContainer.name} ${itemContainer.price} ${itemContainer.availableAmount}`);
    }
  } catch (error) {
    console.log(error)
  }
}

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
}

const purchase = async (item) => {
  try {
    const categoryItems = await Category.find({ name: item.name });
    let price,
        total = 0,
        categoryId;
    for (let i = 0; i < categoryItems.length; i++)
      if (categoryItems[i].availableAmount > 0) {
        price = categoryItems[i].price;
        total = categoryItems[i].availableAmount - 1;
        categoryId = categoryItems[i]._id;
        
        const purchaseWithCategoryId = Object.assign({}, item, { category: categoryId });

        const itemContainer = await Purchase.create(purchaseWithCategoryId);
        await Category.findOneAndUpdate({ name: item.name }, { availableAmount: total });
        console.log(`${item.date} \n${itemContainer.name} ${price}`);
      } else {
        console.log(`No ${item.name} left :(`)
      }
  } catch (error) {
    console.log(error);
   }
}

const list = async () => {
  try {
    const list = await Category.find().sort({ availableAmount: -1 });
    if (list.length === 0) {
      console.log('No categories added :(');
    } else {
      for (let i = 0; i < list.length; i++) {
        console.log(list[i].name + ' ' + list[i].price + ' ' + list[i].availableAmount);
      }
    }
  } catch (error) {
      console.log(error);
  }
}

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

const report = async (item) => {
  const monthPattern = /\d{4}\-\d{2}/;
  const sinceDatePattern = /\d{4}\-\d{2}\-\d{2}/
  try {
    if (item.date.match(monthPattern)) {
      // get amount of purchase items for each category from Purchase;
      // multiply amount by price
      // get available amount from Category
      const itemsByMonth = await Purchase.find({ date: { $regex: item.date }});
      
      // Гавнокод
      let categoryItemById,
          name,
          price,
          availableAmount,
          amountOfPurchases,
          total = 0;
      for (let i = 0; i < itemsByMonth.length; i++) {
        categoryItemById = itemsByMonth[i].category;
      

      const categoryByMonth = await Category.find({ _id: categoryItemById });

      for (let i = 0; i < categoryByMonth.length; i++) {
        name = categoryByMonth[i].name;
        availableAmount = categoryByMonth[i].availableAmount; 
        amountOfPurchases = await Purchase.countDocuments({ name })
        price = categoryByMonth[i].price * amountOfPurchases;
        total += price;
      }

      console.log(`${name} ${price} ${availableAmount}` );
    }
    console.log(`>Total ${total}`);
      // console.log(itemsByMonth);
      // console.log(item.date);
    } else if (item.date.match(sinceDatePattern)) {
      console.log(item.date);
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