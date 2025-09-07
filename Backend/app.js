const express = require("express")
const app = express()
const path = require('path');

//capturar el body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', 
    optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));

//variables de entorno
require('dotenv').config()

console.log(process.env.DB_PORT);
console.log(process.env.DB_HOST);
console.log(process.env.DB_NAME);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

const db = require('./models/db');
// sincronizando la base de datos
db.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.error('Error al sincronizar la base de datos:', err));

// route middlewares
app.use('/auth', require('./routes/auth'));
app.use('/tasks', require('./routes/tasks'));

// preparamos el front para produccion
app.use(express.static(path.join(__dirname, 'dist')));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
//configurando el puerto  
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})