import {Table, Column, Model, BelongsTo, ForeignKey} from 'sequelize-typescript';
import User  from './User';

@Table({
  tableName: 'Tasks',
  timestamps: true,
})

class Task extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;
  @Column({
    allowNull: false,
  })
  title!: string;
  @Column({
    allowNull: true,
  })
  description!: string;
  @Column({
    allowNull: false,
  })
  status!: boolean;
  @ForeignKey(() => User)
  @Column({
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}

export default Task;