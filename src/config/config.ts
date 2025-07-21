import dotenv from 'dotenv';

dotenv.config();

export default {
  development:{
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'task_crud_insightt',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    dialect: 'mysql',
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  production: {
    username: process.env.cloud_db_user,
    password: process.env.cloud_db_pass,
    database: process.env.cloud_db_name,
    host: process.env.cloud_db_host,
    port: parseInt(process.env.cloud_db_port || '3306', 10),
    dialect: 'mysql',
    define: {
      timestamps: true,
      underscored: true,
    },
  }
};