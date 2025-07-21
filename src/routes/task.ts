import {Router} from 'express';
import { tasksController } from '../controllers/taskController';
import {createTaskValidator} from '../validators/tasksValidatos';
import {verificarToken} from '../middlewares/authMiddleware';

const taskRouter = Router();

// verificarToken

taskRouter.get('/', tasksController.getTasks);
taskRouter.post('/create', createTaskValidator, tasksController.createTask);
taskRouter.put('/update/:id', createTaskValidator, tasksController.updateTask);
taskRouter.delete('/delete/:id', tasksController.deleteTask);
taskRouter.patch('/mark-complete/:id', tasksController.markTaskComplete);

export default taskRouter;