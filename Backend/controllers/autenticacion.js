const jwt = require('jsonwebtoken');
const joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

const registerSchema = joi.object({
    name: joi.string().min(3).max(255).required(),
    email: joi.string().min(8).max(255).email().required(),
    password: joi.string().min(8).max(1024).required()
});

const loginSchema = joi.object({
    email: joi.string().min(8).max(255).email().required(),
    password: joi.string().min(8).max(1024).required()
});

exports.register = async (req, res) => {
    try {
        // validaciones
        const { error } = registerSchema.validate(req.body);
        if (error) 
            return res.status(400).json({ message: error.details[0].message });
        //verificamos si el usuario ya existe
        const existingUser = await User.findOne({ where: { email: req.body.email } });
        if (existingUser) 
            return res.status(400).json({ message: 'El usuario ya existe' });
        //creamos el usuario
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ name: req.body.name, password_hash: hashedPassword, email: req.body.email });
        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.login = async (req, res) => {
    try {
        //validaciones
        const { error } = loginSchema.validate(req.body);
        if (error) 
            return res.status(400).json({ message: error.details[0].message });
        //buscamos el user y validamos
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) 
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        const validPassword = await bcrypt.compare(req.body.password, user.password_hash);
        if (!validPassword) 
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        //generamos el token
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};