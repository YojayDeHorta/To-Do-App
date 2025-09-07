require('dotenv').config();
const sequelize = require('sequelize');
const db = new sequelize('', process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: 'mysql'
});

const createDatabase = async () => {
    try {
        await db.authenticate();
        await db.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
        console.log('Base de datos creada correctamente.');
    } catch (err) {
        console.error('Error al crear la base de datos:', err.message);
    }
};

createDatabase();