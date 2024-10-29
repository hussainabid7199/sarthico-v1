"use strict";
import { DataTypes } from "sequelize";
import { Table, Model, Column } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "users_service",
})
export class UserServiceModel extends Model {
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  userServiceId!: number;

  @Column({
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  })
  uniqueId!: string;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  serviceId!: number;
  
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
