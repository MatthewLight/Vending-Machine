#!/usr/bin/env node
const commander = require('commander');
const { addCategory,
        addItem,
        purchase,
        list,
        clear } = require('./controllers/controller');

commander
  .command('addCategory <name> <price> <availableAmount>')
  .description('add category')
  .action((name, price, availableAmount) => {
    addCategory({ name, price, availableAmount });
  });

commander
  .command('addItem <name> <availableAmount>')
  .description('add item')
  .action((name, availableAmount) => {
    addItem({ name, availableAmount });
  });

commander
  .command('purchase <name> <date>')
  .description('purchase item')
  .action((name, date) => {
    purchase({ name, date });
  });

commander
  .command('list')
  .description('list of items')
  .action(() => {
    list();
  });

commander
  .command('clear')
  .description('clear categories with no items available')
  .action(() => {
    clear();
  });

commander.parse(process.argv);