DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE  products(

    item_id INT NOT NULL AUTO_INCREMENT, --    * item_id (unique id for each product)
    product_name VARCHAR(100) NOT NULL, --    * product_name (Name of product)
    department_name VARCHAR(100) NOT NULL, --    * department_name
    price DECIMAL(10,2) NOT NULL,--    * price (cost to customer)
    stock_quantity INT (100) NOT NULL,--    * stock_quantity (how much of the product is available in stores)
    PRIMARY KEY(item_id) -- ID

);

SELECT * FROM products


INSERT INTO products (product_name, department_name, price, stock_quantity)
Values ("Staedtler","Office Products", 11.78, 400),
("Bose SoundSport Free", "Electronic", 199.00, 100),
("Tesvor Robot Vacuum Cleaner", "Appliances", 199.99, 40);