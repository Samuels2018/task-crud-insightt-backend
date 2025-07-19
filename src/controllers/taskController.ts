import {Request, Response} from 'express';
import { GeneralTask } from '../types/taskTypes';
import { tasksService } from '../services/tasksService';

const getTasks = async (req: Request, res: Response) => {
  console.log('Fetching all tasks');

  const userId = '1'
  const tasks = await tasksService.getTasks(userId);
  res.json(tasks);
}

const createTask = async (req: Request<{}, {}, GeneralTask>, res: Response) => {
  console.log('Creating a new task');

  const {title, description, status} = req.body;

  const newTask = await tasksService.createNewTask(title, description, status);

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

  const {title, description, status} = req.body;

  const updateTasks = await tasksService.updateTask(taskId, {title, description, status});

  if (updateTasks == undefined || updateTasks == null) {
    res.status(404).json({message: 'Task not found'});
  }

  res.json({
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

  res.json({
    message: 'Task deleted successfully',
    task: deleteTasks
  });
}

const markTaskComplete = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  console.log(`Marking task with ID: ${taskId} as complete`);

  const markComplete = await tasksService.markTaskComplete(taskId);

  if (markComplete == undefined || markComplete == null) {
    res.status(404).json({message: 'Task not found'});
  }

  res.json({
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

