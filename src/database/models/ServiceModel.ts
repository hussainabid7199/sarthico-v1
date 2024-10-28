"use strict";
import { DataTypes } from "sequelize";
import { Table, Model, Column } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "service",
})
export class ServiceModel extends Model {
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  serviceId!: number;

  @Column({
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  })
  uniqueId!: string;

  @Column({
    type: DataTypes.STRING(50),
    allowNull: false,
  })
  serviceName!: string;
  
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
