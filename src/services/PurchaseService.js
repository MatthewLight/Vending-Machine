const Purchase = require('../models/Purchase');
const Category = require('../models/Category');

const purchase = async (item) => {
  try {
    const category = await Category.findOne({ name: item.name });
      let price,
          total = 0,
          categoryId;
  
      if (!category) {
        console.log('Incorrect category name')
        return;
      }
  
      if (category.availableAmount > 0) {
        price = category.price;
        total = category.availableAmount - 1;
        categoryId = category._id;
          
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
};

const getPurchases = async (options) => {
  let result = {};
  let total = 0;
  
  const itemsByMonth = await Purchase.find(options).populate('category').sort({ name: 1 });
  
  itemsByMonth.forEach(item => {
    if (result.hasOwnProperty(item.name)) {
      result[item.name].price += item.category.price;
    } else {
       result[item.name] = { price: item.category.price, availableAmount: item.category.availableAmount }
    }
      total += item.category.price;
  });
      
  Object.keys(result).forEach(key => {
    console.log(key, result[key].price, result[key].availableAmount);
  });
  
  console.log(`>Total ${total}`);
};

module.exports = {
    purchase,
    getPurchases
}