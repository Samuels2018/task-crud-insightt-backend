import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';
import User from './User';
import Task from './task';

const sequelize = new Sequelize({
  database: config.database.name,
  username: config.database.user,
  password: config.database.password,
  host: config.database.host,
  port: config.database.port,
  dialect: 'postgres',
  models: [User, Task],
  logging: false,
});

export { sequelize, User, Task };