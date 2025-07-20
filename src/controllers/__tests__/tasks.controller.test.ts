import { Request, Response } from 'express';
import 'jest';
import {tasksService} from '../../services/tasksService';
import {
  tasksController
} from '../taskController';

jest.mock('../../services/tasksService');

// Interfaz extendida para Request con auth
interface AuthRequest extends Request {
  auth?: { sub: string };
}

describe('Tasks Controller', () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configuración básica de objetos simulados
    mockRequest = {
      auth: { sub: 'user123' },
      params: {},
      body: {}
    };
    
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    mockNext = jest.fn();
  });

  describe('getTasks', () => {
    it('debe obtener todas las tareas del usuario autenticado', async () => {
      const mockTasks = [{ id: 1, title: 'Test Task' }];
      (tasksService.getTasks as jest.Mock).mockResolvedValue(mockTasks);

      await tasksController.getTasks(mockRequest as Request, mockResponse as Response, mockNext);

      expect(tasksService.getTasks).toHaveBeenCalledWith('user123');
      expect(mockResponse.json).toHaveBeenCalledWith(mockTasks);
    });

    it('debe manejar errores correctamente', async () => {
      // Forzar error
      (tasksService.getTasks as jest.Mock).mockRejectedValue(new Error('DB Error'));
      
      // Ejecutar
      await tasksController.getTasks(mockRequest as Request, mockResponse as Response, mockNext);

      // Verificar
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('createTask', () => {
    it('debe crear una nueva tarea exitosamente', async () => {
      mockRequest.body = {
        title: 'New Task',
        description: 'Description',
        completed: false
      };
      
      // Mock del servicio
      const createdTask = { id: 2, ...mockRequest.body, userId: 'user123' };
      (tasksService.createNewTask as jest.Mock).mockResolvedValue(createdTask);

      await tasksController.createTask(mockRequest as Request, mockResponse as Response, mockNext);

      expect(tasksService.createNewTask).toHaveBeenCalledWith(
        'New Task',
        'Description',
        false,
        'user123'
      );
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Task created successfully',
        task: createdTask
      });
    });

    it('debe retornar error 400 cuando falla la creación', async () => {
      mockRequest.body = { title: 'Fail Task' };
      (tasksService.createNewTask as jest.Mock).mockResolvedValue(null);

      await tasksController.createTask(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Error creating task'
      });
    });
  });

  describe('updateTask', () => {
    it('debe actualizar una tarea existente', async () => {
      mockRequest.params = { id: '1' };
      mockRequest.body = { title: 'Updated Task' };
      
      const updatedTask = { id: 1, title: 'Updated Task' };
      (tasksService.updateTask as jest.Mock).mockResolvedValue(updatedTask);

      await tasksController.updateTask(mockRequest as Request, mockResponse as Response, mockNext);

      expect(tasksService.updateTask).toHaveBeenCalledWith(
        '1',
        { title: 'Updated Task' },
        'user123'
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Task updated successfully',
        task: updatedTask
      });
    });

    it('debe retornar 404 si la tarea no existe', async () => {
      mockRequest.params = { id: '999' };
      mockRequest.body = { title: 'Non-existent' };
      (tasksService.updateTask as jest.Mock).mockResolvedValue(null);

      await tasksController.updateTask(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Task not found'
      });
    });
  });

  describe('deleteTask', () => {
    it('debe eliminar una tarea existente', async () => {
      mockRequest.params = { id: '1' };
      const deletedTask = { id: 1 };
      (tasksService.deleteTask as jest.Mock).mockResolvedValue(deletedTask);

      await tasksController.deleteTask(mockRequest as Request, mockResponse as Response, mockNext);

      expect(tasksService.deleteTask).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Task deleted successfully',
        task: deletedTask
      });
    });

    it('debe retornar 404 si la tarea a eliminar no existe', async () => {
      mockRequest.params = { id: '999' };
      (tasksService.deleteTask as jest.Mock).mockResolvedValue(null);

      await tasksController.deleteTask(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Task not found'
      });
    });
  });

  describe('markTaskComplete', () => {
    it('debe marcar una tarea como completada', async () => {
      mockRequest.params = { id: '1' };
      const completedTask = { id: 1, completed: true };
      (tasksService.markTaskComplete as jest.Mock).mockResolvedValue(completedTask);

      await tasksController.markTaskComplete(mockRequest as Request, mockResponse as Response,);

      expect(tasksService.markTaskComplete).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Task marked as complete',
        task: completedTask
      });
    });

    it('debe retornar 404 si la tarea no existe', async () => {
      mockRequest.params = { id: '999' };
      (tasksService.markTaskComplete as jest.Mock).mockResolvedValue(null);

      await tasksController.markTaskComplete(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Task not found'
      });
    });
  });
});