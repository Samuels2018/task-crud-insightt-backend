import {Table, Column, Model, DataType} from 'sequelize-typescript';

@Table({
  tableName: 'tasks',
  timestamps: true,
})

class Task extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER
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
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  completed!: number;
  @Column({
    allowNull: false,
    type: 'VARCHAR(255)',
  })
  userId!: string;
}

export default Task;