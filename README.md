<h2>Snack vending machine - CLI node js application</h2>

**How to use**

1. Clone repository
2. Open IDE terminal and use snack-machine-cli <command> to run specific command

**Examples**

1. snack-machine-cli --help    |  shows a list of available commands with description
2. snack-machine-cli addCategory <name> <price> <amount>       | add category
3. snack-machine-cli addItem <name> <amount>         | add items to category
4. snack-machine-cli purchase <name> <date>          | purchase an item
5. snack-machine-cli list                            | shows a list of available categories
6. snack-machine-cli clear                           | remove categories with no items available for sale
7. snack-machine-cli report <date>                   | show reports according to date format (yyyy-MM or yyyy-MM-dd)
