Visión General

API RESTful para gestión de tareas construida con Node.js y TypeScript. Proporciona operaciones CRUD completas con persistencia en PostgreSQL mediante Sequelize ORM. Cada tarea pertenece a un usuario específico con seguimiento de estado de completitud.

Relevancia:
Implementa arquitectura en capas con clara separación de responsabilidades y tipado estático completo.
Funcionalidades Principales
Operación	Descripción	Método HTTP
Listar Tareas	Obtener todas las tareas de un usuario	GET
Crear Tarea	Agregar nueva tarea	POST
Actualizar Tarea	Modificar propiedades de tarea existente	PUT
Eliminar Tarea	Borrar tarea permanentemente	DELETE
Marcar Completada	Establecer estado de tarea como completada	POST
Arquitectura de Alto Nivel

Sistema organizado en capas con flujo unidireccional:


HTTP Layer (Express)
  │
  ▼
Controller Layer (taskController)
  │
  ▼
Business Logic Layer (tasksService)
  │
  ▼
Data Access Layer (Sequelize ORM)
  │
  ▼
Database Layer (PostgreSQL)


Flujo de petición:

    Middlewares: cors() y express.json() procesan la petición

    Router: Direcciona a controlador específico

    Controller: Valida entrada y maneja respuesta HTTP

    Service: Implementa lógica de negocio

    ORM: Interactúa con PostgreSQL mediante modelos

Componentes Clave
🧩 Capa de Controladores (src/controllers/taskController.ts)

    Valida entradas con express-validator

    Maneja respuestas HTTP y códigos de estado

    Métodos principales:

        getTasks: Obtiene tareas de usuario

        createNewTask: Crea nueva tarea

        updateTask: Actualiza tarea existente

        deleteTask: Elimina tarea

        markTaskComplete: Marca tarea como completada

⚙️ Capa de Servicios (src/services/tasksService.ts)

    Contiene la lógica de negocio central

    Interactúa con modelos Sequelize

    Implementa operaciones CRUD:


// Ejemplo: Crear nueva tarea
async createNewTask(taskData: TaskCreationAttributes): Promise<Task> {
  return Task.create(taskData);
}

 Capa de Modelos (src/models/task.ts)

    Define estructura de datos con Sequelize

    Relación User → Task mediante userId (FK)

    Decoradores TypeScript para definición de modelos:


@Table({ tableName: 'tasks' })
class Task extends Model<TaskAttributes, TaskCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;
  
  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;
}


Características Técnicas Clave
🔐 Gestión de Tareas

    Scoping por Usuario: Cada tarea asociada a userId

    Ciclo de Vida Completo: Operaciones CRUD completas

    Seguimiento de Estado: Campo status booleano

    Contenido Flexible:

        title: Obligatorio

        description: Opcional

🛡️ Características de Implementación

    TypeScript Strict: Tipado estático completo

    ORM Avanzado: Sequelize + sequelize-typescript

    Validación de Entradas: express-validator

    Seguridad CORS: Middleware para cross-origin

    Diseño RESTful: Uso apropiado de métodos HTTP y códigos de estado

Stack Tecnológico
Capa	Tecnología	Propósito
Runtime	Node.js	Entorno de ejecución JavaScript
Lenguaje	TypeScript	Tipado estático
Framework Web	Express.js	Servidor HTTP y enrutamiento
ORM	Sequelize + sequelize-typescript	Mapeo objeto-relacional
Base de Datos	PostgreSQL	Persistencia relacional
Validación	express-validator	Validación de entradas HTTP
Seguridad	cors	Manejo CORS



endpoins

get tasks
method get
http://0.0.0.0:3000/api/task

expected response
[
  {
    "id": 1,
    "title": "Reunión de equipo 111",
    "description": "Preparar presentación para el cliente XYZ",
    "completed": 1,
    "userId": "1",
    "createdAt": "2025-07-20T21:54:18.000Z",
    "updatedAt": "2025-07-20T22:23:04.000Z"
  },
  {
    "id": 2,
    "title": "some",
    "description": "dwdwdwwdwd",
    "completed": 0,
    "userId": "1",
    "createdAt": "2025-07-20T22:25:59.000Z",
    "updatedAt": "2025-07-20T22:25:59.000Z"
  }
]

create task
method post
http://0.0.0.0:3000/api/task/create

example token
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMC4wLjAuMDo4MDAzL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNzQ5Nzc1MzgyLCJleHAiOjE3NDk3Nzg5ODIsIm5iZiI6MTc0OTc3NTM4MiwianRpIjoiQ0E3RlRUVHEyRnpBTFdFSyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.32_JLoQFCUzssZ2eW7yqXHxiUpk19yDfBxm7BwnyS1E

{
  "title": "Reunión de equipo",
  "description": "Preparar presentación para el cliente XYZ",
  "completed": 0,
}

expected response
{
  "message": "Task created successfully"
  "task": {
    "id": 1,
    "title": "Reunión de equipo",
    "description": "Preparar presentación para el cliente XYZ",
    "completed": 1,
    "userId": "1",
    "updatedAt": "2025-07-20T21:54:18.275Z",
    "createdAt": "2025-07-20T21:54:18.275Z"
    }
}


update task
method put
http://0.0.0.0:3000/api/task/update/1


example token
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMC4wLjAuMDo4MDAzL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNzQ5Nzc1MzgyLCJleHAiOjE3NDk3Nzg5ODIsIm5iZiI6MTc0OTc3NTM4MiwianRpIjoiQ0E3RlRUVHEyRnpBTFdFSyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.32_JLoQFCUzssZ2eW7yqXHxiUpk19yDfBxm7BwnyS1E


{
  "title": "Reunión de equipo 2222",
  "description": "Preparar presentación para el cliente XYZ",
  "completed": 1,
}


expected response
{
  "message": "Task updated successfully"
  "task": {
    "id": 1,
    "title": "Reunión de equipo 111",
    "description": "Preparar presentación para el cliente XYZ",
    "completed": 1,
    "userId": "1",
    "createdAt": "2025-07-20T21:54:18.000Z",
    "updatedAt": "2025-07-20T22:23:04.422Z"
  }
}


delete task
method delete
http://0.0.0.0:3000/api/task/delete/1

example token
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMC4wLjAuMDo4MDAzL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNzQ5Nzc1MzgyLCJleHAiOjE3NDk3Nzg5ODIsIm5iZiI6MTc0OTc3NTM4MiwianRpIjoiQ0E3RlRUVHEyRnpBTFdFSyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.32_JLoQFCUzssZ2eW7yqXHxiUpk19yDfBxm7BwnyS1E

expected response
{
  "message": "Task deleted successfully"
}



mark as completed
metho patch
http://0.0.0.0:3000/api/task/mark-complete/1

example token
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMC4wLjAuMDo4MDAzL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNzQ5Nzc1MzgyLCJleHAiOjE3NDk3Nzg5ODIsIm5iZiI6MTc0OTc3NTM4MiwianRpIjoiQ0E3RlRUVHEyRnpBTFdFSyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.32_JLoQFCUzssZ2eW7yqXHxiUpk19yDfBxm7BwnyS1E

expected response 
{
  "message": "Task marked as complete"
}


