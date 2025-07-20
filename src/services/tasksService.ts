import { GeneralTask } from "../types/taskTypes";
import Task from "../models/task";
import User from '../models/User';

const getTasks = async (userId: string) => {
  console.log('Fetching all tasks for user:', userId);
  return await Task.findAll({where: {userId}});
}

//user: User, 
const createNewTask = async (title: string, description: string, status: boolean) => {
  console.log('Creating a new task with title:', title);
  //user
  const newTask = await Task.create({title, description,});
  return newTask;
}

//userId: string,
const updateTask = async (taskId: string, taskData: Partial<GeneralTask>) => {
  console.log(`Updating task with ID: ${taskId}`);

  //user: { id: userId }
  const task = await Task.findOne({where: {id: taskId,}});

  if (!task) {
    return null;
  }

  Object.assign(task, taskData);
  return await task.save();
}

// userId: string,
const deleteTask = async ( taskId: string) => {
  console.log(`Deleting task with ID: ${taskId}`);

  //userId
  const deletedCount = await Task.destroy({ where: { id: taskId } });
  return deletedCount;
}

//userId: string,
const markTaskComplete = async (taskId: string) => {
  console.log(`Marking task with ID: ${taskId} as complete`);
  //userId: string,
  return await Task.update({ status: true },
    { where: { id: taskId } });
}
export const tasksService = {
  getTasks,
  createNewTask,
  updateTask,
  deleteTask,
  markTaskComplete
};