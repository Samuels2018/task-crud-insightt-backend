import { GeneralTask } from "../types/taskTypes";
import Task from "../models/task";
import User from '../models/User';

const getTasks = async (userId: string) => {
  console.log('Fetching all tasks for user:', userId);
  return await Task.findAll({where: {userId}});
}

const createNewTask = async (user: User, title: string, description: string, status: boolean) => {
  console.log('Creating a new task with title:', title);
  const newTask = await Task.create({title, description, user});
  return newTask;
}

const updateTask = async (userId: string, taskId: string, taskData: Partial<GeneralTask>) => {
  console.log(`Updating task with ID: ${taskId}`);

  const task = await Task.findOne({where: {id: taskId, user: { id: userId }}});

  if (!task) {
    return null;
  }

  Object.assign(task, taskData);
  return await task.save();
}

const deleteTask = async (userId: string, taskId: string) => {
  console.log(`Deleting task with ID: ${taskId}`);

  const deletedCount = await Task.destroy({ where: { id: taskId, userId } });
  return deletedCount;
}

const markTaskComplete = async (userId: string, taskId: string) => {
  console.log(`Marking task with ID: ${taskId} as complete`);
  return await Task.update(userId, taskId);
}
export const tasksService = {
  getTasks,
  createNewTask,
  updateTask,
  deleteTask,
  markTaskComplete
};