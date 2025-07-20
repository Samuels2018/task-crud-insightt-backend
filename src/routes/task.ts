import {Router} from 'express';
import { tasksController } from '../controllers/taskController';
import {createTaskValidator} from '../validators/tasksValidatos';
import {verificarToken} from '../middlewares/authMiddleware';

const taskRouter = Router();

taskRouter.get('/', verificarToken, tasksController.getTasks);
taskRouter.post('/create', verificarToken, createTaskValidator, tasksController.createTask);
taskRouter.put('/update/:id', verificarToken, createTaskValidator, tasksController.updateTask);
taskRouter.delete('/delete/:id', verificarToken, tasksController.deleteTask);
taskRouter.patch('/mark-complete/:id', verificarToken, tasksController.markTaskComplete);

export default taskRouter;