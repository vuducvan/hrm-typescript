import { Table, Column, Model } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

@Table
export class Userrole extends Model {
  @Column({ primaryKey: true })
  id: string = uuid();

  @Column
  userId: string;

  @Column
  roleId: string;

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
