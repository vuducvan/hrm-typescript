import { Table, Column, Model } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

@Table
export class Rolepermission extends Model {
  @Column({ primaryKey: true })
  id: string = uuid();

  @Column
  roleId: string;

  @Column
  moduleId: string;

  @Column
  canRead: number;

  @Column
  canWrite: number;

  @Column
  canUpdate: number;

  @Column
  canDelete: number;

  @Column
  canApprove: number;

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
