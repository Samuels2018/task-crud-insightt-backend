import {Request, Response, NextFunction} from 'express';
import { GeneralTask } from '../types/taskTypes';
import { tasksService } from '../services/tasksService';



const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Fetching all tasks');

  try {
    const userId = (req as any).auth?.sub;
    const tasks = await tasksService.getTasks(userId);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    next(error);
  }
}

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Creating a new task');

  try {
    const {title, description, completed, userId} = req.body;
    console.log('Task details:', {title, description, completed, userId});

    const newTask = await tasksService.createNewTask(title, description, completed, userId);

    if (newTask === undefined || newTask === null) {
      res.status(400).json({message: 'Error creating task'});
    }

    res.status(201).json({
      message: 'Task created successfully',
      task: newTask
    });
  } catch (error) {
    console.error('Error creating task:', error);
    next(error);
  }

}

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.id;
  console.log(`Updating task with ID: ${taskId}`);

  try {
    const {title, description, completed} = req.body;
    console.log('Updated task details:', {title, description, completed});

    const updateTasks = await tasksService.updateTask(taskId, {title, description, completed}, (req as any).auth?.sub);

    if (updateTasks == null) {
      return res.status(404).json({message: 'Task not found'});
    }

    res.status(200).json({
      message: 'Task updated successfully',
      task: updateTasks
    });

  } catch (error) {
    console.error(`Error updating task with ID ${taskId}:`, error);
    next(error);
  }
}

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.id;
  console.log(`Deleting task with ID: ${taskId}`);

  try {
    const deleteTasks = await tasksService.deleteTask(taskId);

    if (deleteTasks == undefined || deleteTasks == null) {
      res.status(404).json({message: 'Task not found'});
    }


    res.status(200).json({
      message: 'Task deleted successfully',
      task: deleteTasks
    });

  } catch (error) {
    console.error(`Error deleting task with ID ${taskId}:`, error);
    next(error);
  }
}

const markTaskComplete = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  console.log(`Marking task with ID: ${taskId} as complete`);

  try {

    const markComplete = await tasksService.markTaskComplete(taskId);

    if (markComplete == undefined || markComplete == null) {
      res.status(404).json({message: 'Task not found'});
    }

    res.status(200).json({
      message: 'Task marked as complete',
      task: markComplete
    });

  }catch (error) {
    console.error(`Error marking task with ID ${taskId} as complete:`, error);
    res.status(500).json({message: 'Internal server error'});
  }
}

export const tasksController = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  markTaskComplete
}

