import sequelize from "sequelize";
import express from "express";
import bodyParser from "body-parser";


// Conectamos la BBDD
const sequelize = new Sequelize('libros', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
        }
});