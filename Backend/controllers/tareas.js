const { Task } = require('../models/task');
const Joi = require('joi');

// validamos con joi
const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(5).max(1000).required(),
    status: Joi.string().valid('pending', 'completed').required()
});

exports.getTasksByUser = async (req, res) => {
    const user_id = req.user.id; 
    try {
        // Paginacion y filtro por estado
        const { status, page = 1, limit = 3 } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);
        const where = { user_id };
        if (status) where.status = status;
        // buscamos las tareas
        const { count, rows } = await Task.findAndCountAll({ 
            where, 
            limit: parseInt(limit),
            offset,
            order: [['createdAt', 'DESC']]
        });
        // respondemos con las tareas y la paginacion
        res.json({
            tasks: rows,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.getTasksCompletedByUser = async (req, res) => {
    const user_id = req.user.id; 
    try {
        // Paginacion
        const { page = 1, limit = 3 } = req.query;
        const offset = (parseInt(page) - 1) * parseInt(limit);
        // buscamos las tareas completadas
        const { count, rows } = await Task.findAndCountAll({
            where: { user_id, status: 'completed' },
            limit: parseInt(limit),
            offset,
            order: [['createdAt', 'DESC']]
        });
        // respondemos con las tareas y la paginacion
        res.json({
            tasks: rows,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.createTask = async (req, res) => {
    //validamos
    const { title, description } = req.body;
    const { error } = schema.validate({ title, description, status: 'pending' });
    if (error) return res.status(400).json({ message: error.details[0].message });
    try {
        //creamos la tarea y la asociamos al user
        const user_id = req.user.id; 
        const newTask = await Task.create({ title, description, user_id });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.updateTask = async (req, res) => {
    //validamos
    const { id } = req.params;
    const { title, description, status } = req.body;
    const { error } = schema.validate({ title, description, status });
    if (error) return res.status(400).json({ message: error.details[0].message });
    try {
        //buscamos y actualizamos la tarea
        const task = await Task.findByPk(id);
        if (!task)
            return res.status(404).json({ message: 'Tarea no encontrada' });
        task.title = title;
        task.description = description;
        task.status = status;
        await task.save();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.deleteTask = async (req, res) => {
    //recibimos el id por params
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        // eliminamos la tarea
        await task.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
