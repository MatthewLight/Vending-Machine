const commander = require('commander');
const { addCategory,
        addItem,
        purchase,
        list } = require('./controllers/controller');

commander
  .command('addCategory <name> <price> <availableAmount>')
  .alias('a')
  .description('add category')
  .action((name, price, availableAmount) => {
    addCategory({ name, price, availableAmount });
  });

commander
  .command('addItem <name> <availableAmount>')
  .alias('i')
  .description('add item')
  .action((name, availableAmount) => {
    addItem({ name, availableAmount });
  });

commander
  .command('purchase <name> <date>')
  .alias('i')
  .description('purchase item')
  .action((name, date) => {
    purchase({ name, date });
  });

commander
  .command('list')
  .alias('i')
  .description('purchase item')
  .action(() => {
    list();
  });

commander.parse(process.argv);