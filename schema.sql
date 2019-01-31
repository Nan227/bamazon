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
