import { Table, Column, Model } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';

@Table
export class User extends Model {
  @Column({ primaryKey: true })
  id: string = uuid();

  @Column
  employeeId: string;

  @Column
  managerId: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  address: string;

  @Column
  avatar: string;

  @Column
  department: string;

  @Column
  identificationNumber: string;

  @Column
  insuranceNumber: string;

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
