import { GeneralTask } from "../types/taskTypes";
import Task from "../models/task";

const getTasks = async (userId: string) => {
  console.log('Fetching all tasks for user:', userId);
  //{where: {userId}}
  return await Task.findAll();
}

//user: User,
const createNewTask = async (title: string, description: string, completed: number, userId?: string) => {
  console.log('Creating a new task with title:', title);
  //user
  const newTask = await Task.create({title, description, completed, userId});
  return newTask;
}

//userId: string,
const updateTask = async (taskId: string, taskData: Partial<GeneralTask>, userId: string) => {
  console.log(`Updating task with ID: ${taskId}`);

  const task = await Task.findOne({where: {id: taskId, userId}});

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