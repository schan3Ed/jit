"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/commands/hello.ts
const core_1 = require("@oclif/core");
const inquirer = require('inquirer');
class Hello extends core_1.Command {
    async run() {
        inquirer
            .prompt([
            {
                type: 'checkbox',
                message: 'Select toppings',
                name: 'toppings',
                choices: [
                    new inquirer.Separator(' = The Meats = '),
                    {
                        name: 'Pepperoni',
                    },
                    {
                        name: 'Ham',
                    },
                    {
                        name: 'Ground Meat',
                    },
                    {
                        name: 'Bacon',
                    },
                    new inquirer.Separator(' = The Cheeses = '),
                    {
                        name: 'Mozzarella',
                        checked: true,
                    },
                    {
                        name: 'Cheddar',
                    },
                    {
                        name: 'Parmesan',
                    },
                    new inquirer.Separator(' = The usual ='),
                    {
                        name: 'Mushroom',
                    },
                    {
                        name: 'Tomato',
                    },
                    new inquirer.Separator(' = The extras = '),
                    {
                        name: 'Pineapple',
                    },
                    {
                        name: 'Olives',
                        disabled: 'out of stock',
                    },
                    {
                        name: 'Extra cheese',
                    },
                ],
                validate(answer) {
                    if (answer.length === 0) {
                        return 'You must choose at least one topping.';
                    }
                    return true;
                },
            }
        ])
            .then((answers) => {
            // Use user feedback for... whatever!!
        })
            .catch((error) => {
            if (error.isTtyError) {
                console.log("can't display");
                // Prompt couldn't be rendered in the current environment
            }
            else {
                // Something else went wrong
            }
        });
    }
}
exports.default = Hello;
