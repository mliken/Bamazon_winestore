CREATE DATABASE IF NOT EXISTS bamazon_winestore;

USE bamazon_winestore;

CREATE TABLE IF NOT EXISTS products (
  item_id INT(10) AUTO_INCREMENT PRIMARY KEY NOT NULL
, product_name VARCHAR(100) NOT NULL
, department_name VARCHAR(30) NULL
, price FLOAT(12) NOT NULL
, stock_quantity INT(30) NOT NULL
);
