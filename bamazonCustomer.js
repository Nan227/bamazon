var mysql = require("mysql");
var cTable = require("console.table");
var inquirer = require("inquirer");
require('dotenv').config()

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.mySQLP,
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  itemsForSale();
});

function itemsForSale() {
  connection.query("SELECT * FROM store", function (err, results) {
    if (err) throw err;
    console.table(results);
  })
  setTimeout(function () {
    start()
  }, 1000);
}

// function which promptcs the user for what action they should take
function start() {
  inquirer
    .prompt([{
      name: "item",
      message: "Which item would you like to purchase?",
    }, {
      name: "amount",
      messeage: " How many would you like?"

    }])
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      buyProduct(answer.item, answer.amount);
    });
};

function buyProduct(item, amount) {
  connection.query("SELECT * FROM store WHERE Item_id = ?", item, function (err, results) {
    if (err) throw err;

    if (results.length) {

      if (results[0].Stock_quantity > amount) {
        const newQuantity = results[0].Stock_quantity - amount;
        const DBquery = "UPDATE store SET stock_quantity = ? WHERE Item_id = ?"

        connection.query(DBquery, [newQuantity, item], function (err, results) {
          if (err) throw err;
          console.log("Thank you for you purchase.  Come again soon.");
          connection.end();
        })

      } else {
        console.log(`\r\n  Sorry, we only have ${results[0].Stock_quantity} at this time.  Please try again.\r\n`);
        start();
      };

    } else {
      console.log("\r\n  Sorry, we do not have that item at this time.  Please try again.\r\n");
      start();
    }
  })
}