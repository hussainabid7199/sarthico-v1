"use strict";
import { DataTypes } from "sequelize";
import {
  Table,
  Model,
  Column,
} from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "users",
})
export class UserModel extends Model {
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  })
  uniqueId!: string;

  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2,
  })
  roleId!: number;

  @Column({
    type: DataTypes.STRING(50),
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataTypes.STRING(50),
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataTypes.STRING(250),
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataTypes.STRING(20),
    allowNull: false,
  })
  phone!: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  createdOn!: Date;

  @Column({
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  })
  updatedOn?: Date;

  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive!: boolean;

  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  isDeleted!: boolean;
}
