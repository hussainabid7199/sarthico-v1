"use-strict";
import { DataTypes } from "sequelize";
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { UserModel } from "./UserModel";

@Table({
  timestamps: false,
  tableName: "users_otp",
})
export default class UserOTPModel extends Model {
  @Column({
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  })
  uniqueId!: string;

  @Column({
    type: DataTypes.STRING(50),
    allowNull: false,
  })
  otp!: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  })
  createdOn!: Date;
}
