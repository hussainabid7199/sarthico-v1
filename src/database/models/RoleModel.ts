"use-strict";
import { DataTypes } from "sequelize";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  BelongsToMany,
  Sequelize,
} from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "roles",
})
export class RoleModel extends Model {
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
  roleId!: number;

  @Column({
    type: DataTypes.STRING(36),
    allowNull: false,
    field: "roleName",
  })
  roleName!: string;
  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: "createdOn",
  })
  createdOn!: Date;
}
