import {Router} from 'express';
import { tasksController } from '../controllers/taskController';
import {createTaskValidator} from '../validators/tasksValidatos';

const taskRouter = Router();

taskRouter.get('/', tasksController.getTasks);
taskRouter.post('/create', createTaskValidator, tasksController.createTask);
taskRouter.put('/update/:id', createTaskValidator, tasksController.updateTask);
taskRouter.delete('/delete/:id', tasksController.deleteTask);
taskRouter.post('/mark-complete/:id', tasksController.markTaskComplete);

export default taskRouter;