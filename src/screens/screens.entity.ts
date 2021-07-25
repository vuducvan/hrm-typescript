import { Table, Column, Model } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

@Table
export class Screen extends Model {
  @Column({ primaryKey: true })
  id: string = uuid();

  @Column
  moduleName: string;

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
