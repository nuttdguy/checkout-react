DROP TABLE IF EXISTS Payments CASCADE;
DROP TABLE IF EXISTS Addresses CASCADE;
DROP TABLE IF EXISTS Users CASCADE;

DROP DATABASE IF EXISTS Checkout;

CREATE DATABASE IF NOT EXISTS Checkout;
USE Checkout;


CREATE TABLE Users (
    users_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(40),
    password VARCHAR(64),
    email VARCHAR(124)
);


CREATE TABLE Addresses (
    address_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    line_1 VARCHAR(40),
    line_2 VARCHAR(40),
    city VARCHAR(40),
    states VARCHAR(40),
    zip_code VARCHAR(40)
);

CREATE TABLE Payments (
    payments_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    credit_card_number VARCHAR(20),
    expiry_date VARCHAR(16),
    ccv VARCHAR(16),
    billing_zip_code VARCHAR(16)
);
