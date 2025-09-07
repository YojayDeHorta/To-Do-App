const sequelize = require('sequelize');
const db = new sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: 'mysql'
});

const connection = () => {
    db.authenticate()
        .then(() => {
            console.log('Conexion con db realizada correctamente.');
        })
        .catch(err => {
            console.error('Error en la base de datos:', err.message);
        });
};

connection();
module.exports = db;