import { Table, Column, Model } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

@Table
export class Account extends Model {
  @Column({ primaryKey: true })
  id: string = uuid();

  @Column
  userId: string;

  @Column
  username: string;

  @Column
  password: string;

  @Column('datetime')
  createdAt: Date;

  @Column('datetime')
  updatedAt: Date;

  @Column
  isDelete: number;

  @Column
  createBy: string;

  @Column
  updateBy: string;
}
