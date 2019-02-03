DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Create the characters table
CREATE TABLE store
(
  Item_id INT NOT NULL AUTO_INCREMENT,
  Product_name VARCHAR (200) NOT NULL,
  Department_name VARCHAR (200) NOT NULL,
  Price DECIMAL (10,2) NOT NULL,
  Stock_quantity INT NOT NULL,
  PRIMARY KEY(Item_id)
);

