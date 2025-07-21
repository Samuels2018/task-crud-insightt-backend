import { GeneralTask } from "../types/taskTypes";
import Task from "../models/task";

const getTasks = async (userId: string) => {
  console.log('Fetching all tasks for user:', userId);
  return await Task.findAll();
}

const createNewTask = async (title: string, description: string, completed: number, userId?: string) => {
  console.log('Creating a new task with title:', title);
  const newTask = await Task.create({title, description, completed, userId});
  return newTask;
}

const updateTask = async (taskId: string, updateData: Partial<GeneralTask>, userId?: string) => {
  console.log(`Updating task with ID: ${taskId}`);

  const task = await Task.findOne({where: {id: taskId}});

  if (!task) {
    return null;
  }


  Object.assign(task, updateData);
  return await task.save();
}

const deleteTask = async ( taskId: string) => {
  console.log(`Deleting task with ID: ${taskId}`);

  const deletedCount = await Task.destroy({ where: { id: taskId } });
  return deletedCount;
}

const markTaskComplete = async (taskId: string) => {
  console.log(`Marking task with ID: ${taskId} as complete`);
  return await Task.update({ completed: 1 },
    { where: { id: taskId } });
}


export const tasksService = {
  getTasks,
  createNewTask,
  updateTask,
  deleteTask,
  markTaskComplete
};