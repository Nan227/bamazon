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
  options();
});

// List a set of menu options:
function options() {
  inquirer
    .prompt({
      name: "departmentOfManagers",
      type: "list",
      message: "Which saleDepartment you are looking for ?",
      choices: ["Products of sale", "Low Inventory", "Add to Inventory", " Add New Product"]
    })
    .then(function(answer) {
      // based on their answer of functions
      if (answer.options === "Products of sale") {
        viewSaleProduct();
      }
      else if(answer.options === "Low Inventory") {
        lowInventory();
      }
      else if(answer.options === "Add to Inventory") {
        addInventory();
      } 
      else if(answer.options === "Add New Product") 
        {
        addNewProduct();
       } else{
        connection.end();
      }
    });
}

// function viewSaleProduct will show the item IDs, names, prices, and quantities.

function viewSaleProduct() {
  connection.query("SELECT * FROM store", function (err, results) {
    if (err) throw err;
    console.table(results);
  })
}

// function lowInventory will show which product have items less than 5.

function lowInventory(item) {
  connection.query("SELECT * FROM store WHERE Item_id = ?", item, function (err, results) {
    if (err) throw err;

    if (results.length) {
      
      if (results[0].Stock_quantity < 5) {
        const nameProduct = results[0].Product_name;
        const quantity = results[0].Stock_quantity;
        
        connection.query([quantity, nameProduct, item], function (err, results) {
          if (err) throw err;

        console.log("-------------------------------------------------");
        console.log(" Product is "+ nameProduct + "  only have  " + quantity + " unit(s)." );
        console.log(" Please refill the stock inventory soon as possible. " );
        console.log("-------------------------------------------------");
        connection.end();
        })
      } else {
        console.log(`\r\n  Sorry, we do not have any product in a low inventory at this time.  Please try again.\r\n`);
        options();
      };
    }
  })
}

function addInventory() {
    connection.query("SELECT * FROM store", function (err, results) {
      if (err) throw err;
      console.table(results);
      chooseProduct();
    })
    function chooseProduct(){
      inquirer
      .prompt([{
        name:"item",
        message: "Which item would you like to add in an inventory?"
      },{
        name: "amount",
        messeage: " How many would you like to add?"
      
      }])
      .then (function(answer){
        inventoryAdd (answer.item, answer.amount); 

        });
      function inventoryAdd (item, amount );
      
      connection.query("SELECT * FROM store WHERE Item_id = ?", item, function (err, results) {
        if (err) throw err;
    
        if (results.length) {
          if ( amount > 0) {
            const nameProduct = results[0].Product_name;
            const newQuantity = results[0].Stock_quantity + amount;

            connection.query([newQuantity, nameProduct, item], function (err, results) {
              if (err) throw err;
              console.log("-------------------------------------------------");
              console.log("Thank you for adding"+ nameProduct + ". now this stock has " + newQuantit + " unit(s).");
              console.log("-------------------------------------------------");
               connection.end();
            })
          }
        }
      }
    )
  }
}
function addNewProduct(){
  inquirer
    .prompt([{
      name: "item",
      message: "What is a new product name?",
    }, {
      name: "department",
      messeage: "what is a department's name ?"
    }, {
      name: "price",
      messeage: "what is a price of product ?"
    }, {
    name: "amount",
    messeage: "How many item ?"
  
    }])
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      newProduct(answer.item, answer.department, answer.price, answer.amount);
    }); 
    function newProduct (){
      connection.query("INSERT INTO store "[ addNewProduct[0].answer.item, addNewProduct[0].answer.department, addNewProduct[0].answer.price, addNewProduct[0].answer.amount],function (err, results) {
        if (err) throw err;
        console.log("Successful! A new inventory added.");
        
    })
  }
}
  
