import 'jest'
import Task from '../../models/task';
import {tasksService} from '../tasksService';

// Mock completo del modelo Task
jest.mock('../../models/task', () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn()
}));

describe('Tasks Service', () => {
  const userId = 'user123';
  const taskId = 'task456';
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTasks', () => {
    it('debe retornar todas las tareas del usuario', async () => {
      // Mock de datos
      const mockTasks = [
        { id: '1', title: 'Task 1', userId },
        { id: '2', title: 'Task 2', userId }
      ];
      
      // Configurar el mock
      (Task.findAll as jest.Mock).mockResolvedValue(mockTasks);

      // Ejecutar
      const result = await tasksService.getTasks(userId);

      // Verificar
      expect(Task.findAll).toHaveBeenCalledWith({ where: { userId } });
      expect(result).toEqual(mockTasks);
    });

    it('debe retornar array vacío si no hay tareas', async () => {
      (Task.findAll as jest.Mock).mockResolvedValue([]);
      const result = await tasksService.getTasks(userId);
      expect(result).toEqual([]);
    });
  });

  describe('createNewTask', () => {
    it('debe crear una nueva tarea exitosamente', async () => {
      const taskData = {
        title: 'New Task',
        description: 'Description',
        completed: 0
      };
      
      const createdTask = { id: taskId, ...taskData, userId };
      (Task.create as jest.Mock).mockResolvedValue(createdTask);

      const result = await tasksService.createNewTask(
        taskData.title,
        taskData.description,
        taskData.completed,
        userId
      );

      expect(Task.create).toHaveBeenCalledWith({
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed,
        userId
      });
      expect(result).toEqual(createdTask);
    });

    it('debe manejar error en creación', async () => {
      (Task.create as jest.Mock).mockRejectedValue(new Error('DB error'));
      
      await expect(tasksService.createNewTask(
        'Fail Task',
        '',
        0,
        userId
      )).rejects.toThrow('DB error');
    });
  });

  describe('updateTask', () => {
    const updateData = { title: 'Updated Title', completed: 1 };

    it('debe actualizar una tarea existente', async () => {
      const existingTask: any = {
        id: taskId,
        userId,
        save: jest.fn()
      };
      (existingTask.save as jest.Mock).mockResolvedValue({ ...existingTask, ...updateData });
      
      (Task.findOne as jest.Mock).mockResolvedValue(existingTask);

      const result = await tasksService.updateTask(taskId, updateData, userId);

      expect(Task.findOne).toHaveBeenCalledWith({
        where: { id: taskId, userId }
      });
      expect(existingTask.save).toHaveBeenCalled();
      expect(result).toEqual({ ...existingTask, ...updateData });
    });

    it('debe retornar null si la tarea no existe', async () => {
      (Task.findOne as jest.Mock).mockResolvedValue(null);
      
      const result = await tasksService.updateTask(taskId, updateData, userId);
      
      expect(result).toBeNull();
    });
  });

  describe('deleteTask', () => {
    it('debe eliminar una tarea existente', async () => {
      (Task.destroy as jest.Mock).mockResolvedValue(1);
      
      const result = await tasksService.deleteTask(taskId);
      
      expect(Task.destroy).toHaveBeenCalledWith({ where: { id: taskId } });
      expect(result).toBe(1);
    });

    it('debe retornar 0 si la tarea no existe', async () => {
      (Task.destroy as jest.Mock).mockResolvedValue(0);
      
      const result = await tasksService.deleteTask('invalid-id');
      
      expect(result).toBe(0);
    });
  });

  describe('markTaskComplete', () => {
    it('debe marcar una tarea como completada', async () => {
      const updateResult = [1]; // [affectedCount]
      (Task.update as jest.Mock).mockResolvedValue(updateResult);
      
      const result = await tasksService.markTaskComplete(taskId);
      
      expect(Task.update).toHaveBeenCalledWith(
        { completed: 1 },
        { where: { id: taskId } }
      );
      expect(result).toEqual(updateResult);
    });

    it('debe retornar [0] si la tarea no existe', async () => {
      (Task.update as jest.Mock).mockResolvedValue([0]);
      
      const result = await tasksService.markTaskComplete('invalid-id');
      
      expect(result).toEqual([0]);
    });
  });
});