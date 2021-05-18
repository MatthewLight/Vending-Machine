const commander = require('commander');
const { addSnack } = require('./controllers/controller');

commander
  .command('addCategory <itemCategory> <price> <purchasable>')
  .alias('a')
  .description('add category')
  .action((itemCategory, price, purchasable) => {
    addSnack({ itemCategory, price, purchasable });
  });

commander.parse(process.argv);