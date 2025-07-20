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