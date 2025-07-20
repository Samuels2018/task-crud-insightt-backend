import {Request, Response} from 'express';
import { GeneralTask } from '../types/taskTypes';
import { tasksService } from '../services/tasksService';



const getTasks = async (req: Request, res: Response) => {
  console.log('Fetching all tasks');

  const userId = (req as any).auth?.sub;
  const tasks = await tasksService.getTasks(userId);
  res.json(tasks);
}

const createTask = async (req: Request<{}, {}, GeneralTask>, res: Response) => {
  console.log('Creating a new task');

  const {title, description, completed} = req.body;
  const userId = '1'; //(req as any).auth?.sub;
  console.log('Task details:', {title, description, completed});

  const newTask = await tasksService.createNewTask(title, description, completed, userId);

  if (newTask === undefined || newTask === null) {
    return res.status(400).json({message: 'Error creating task'});
  }

  res.status(201).json({
    message: 'Task created successfully',
    task: newTask
  })

}

const updateTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  console.log(`Updating task with ID: ${taskId}`);

  const {title, description, completed} = req.body;
  const userId = '1'//(req as any).auth?.sub;
  console.log('Updated task details:', {title, description, completed});

  const updateTasks = await tasksService.updateTask(taskId, {title, description, completed}, userId);

  if (updateTasks == undefined || updateTasks == null) {
    res.status(404).json({message: 'Task not found'});
  }

  res.status(200).json({
    message: 'Task updated successfully',
    task: updateTasks
  });
}

const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  console.log(`Deleting task with ID: ${taskId}`);

  const deleteTasks = await tasksService.deleteTask(taskId);

  if (deleteTasks == undefined || deleteTasks == null) {
    res.status(404).json({message: 'Task not found'});
  }


  res.status(200).json({
    message: 'Task deleted successfully',
    task: deleteTasks
  });
}

const markTaskComplete = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  console.log(`Marking task with ID: ${taskId} as complete`);

  const userId = '1'//(req as any).auth?.sub;

  const markComplete = await tasksService.markTaskComplete(taskId);

  if (markComplete == undefined || markComplete == null) {
    res.status(404).json({message: 'Task not found'});
  }

  res.status(200).json({
    message: 'Task marked as complete',
    task: markComplete
  });
}

export const tasksController = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markTaskComplete
}

