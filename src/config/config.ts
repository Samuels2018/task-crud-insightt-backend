import dotenv from 'dotenv';

dotenv.config();

/*const config: Config = {
  port: process.env.PORT || 3000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    name: process.env.DB_NAME || 'task_crud_insightt',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || '4c6e8b1d9f3a2b5c7d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};

export default config;*/

export default {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'task_crud_insightt',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  dialect: 'mysql', // ¡Asegúrate de incluir esto explícitamente!
  // Opcional: para evitar warnings de consola
  define: {
    timestamps: true,
    underscored: true,
  },
};