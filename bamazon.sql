DROP DATABASE IF EXISTS starwars_db;
CREATE DATABASE starwars_db;
USE starwars_db;

-- Create the characters table
CREATE TABLE characters
(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR (255) NOT NULL,
  role VARCHAR (255) NOT NULL,
  age INT NOT NULL,
  forcePoints INT NOT NULL,
  PRIMARY KEY(id)
);
--  * item_id (unique id for each product)

--   * product_name (Name of product)

 --  * department_name

--   * price (cost to customer)

--   * stock_quantity (how much of the product is available in stores)