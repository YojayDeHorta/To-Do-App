const router = require('express').Router();
const taskController = require('../controllers/tareas');
const verifyToken = require('../middlewares/validate-token');

// Rutas de tareas
router.use(verifyToken);
router.get('/', taskController.getTasksByUser);
router.get('/completed', taskController.getTasksCompletedByUser);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
module.exports = router;
