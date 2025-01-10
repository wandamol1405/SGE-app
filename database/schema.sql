CREATE DATABASE sge_app;
USE sge_app;
CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255),
    cuit VARCHAR(255),
    gross_revenue INT,
    bussiness_address VARCHAR(255),
    IVA_condition VARCHAR(255),
    start_date DATE,
    email VARCHAR(255),
    password VARCHAR(255),
    is_admin BOOLEAN,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);