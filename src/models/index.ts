import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';
import Task from './task';

const env = process.env.NODE_ENV || 'development';
const dbConfig = (config as any)[env];

const sequelize = new Sequelize({
  ...dbConfig,
  dialect: dbConfig.dialect as any,
  models: [Task],
  logging: (sql, timing) => {
    console.log(`[SQL] ${sql}`);
    if (timing) console.log(`[Execution time] ${timing}ms`);
  },
  define: {
    underscored: false, // Desactiva snake_case
    freezeTableName: true, // Evita pluralización
    timestamps: true // Asegúrate que esté activado
  }
});

export { sequelize, Task };