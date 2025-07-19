import {Table, Column, Model, DataType, ForeignKey} from 'sequelize-typescript';
import Task from './task';

@Table({
  tableName: 'users',
  timestamps: true,
})

class User extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  username!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  password!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  email?: string;
  tasks!: Task[];
}

export default User;